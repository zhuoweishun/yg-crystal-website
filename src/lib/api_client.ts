'use client'

import { local_storage_cache, memory_cache, MemoryCache } from '@/lib/performance_utils'

/**
 * 缓存配置接口
 */
interface CacheConfig {
  ttl?: number // 缓存时间（毫秒）
  max_size?: number // 最大缓存条目数
  storage_type?: 'memory' | 'localStorage' | 'sessionStorage'
  key_prefix?: string // 缓存键前缀
}

/**
 * API响应缓存类
 */
class ApiCache {
  private memory_cache: MemoryCache<any>
  private config: Required<CacheConfig>

  constructor(config: CacheConfig = {}) {
    this.config = {
      ttl: config.ttl || 5 * 60 * 1000, // 默认5分钟
      max_size: config.max_size || 100,
      storage_type: config.storage_type || 'memory',
      key_prefix: config.key_prefix || 'api_cache_'
    }

    this.memory_cache = new MemoryCache()
  }

  /**
   * 生成缓存键
   */
  private generate_cache_key(url: string, params?: Record<string, any>): string {
    const params_string = params ? JSON.stringify(params) : ''
    return `${this.config.key_prefix}${url}_${params_string}`
  }

  /**
   * 获取缓存数据
   */
  async get<T>(url: string, params?: Record<string, any>): Promise<T | null> {
    const cache_key = this.generate_cache_key(url, params)

    try {
      switch (this.config.storage_type) {
        case 'memory':
          return this.memory_cache.get(cache_key) || null

        case 'localStorage':
          return local_storage_cache.get(cache_key) || null

        case 'sessionStorage':
          const session_data = sessionStorage.getItem(cache_key)
          if (session_data) {
            const parsed = JSON.parse(session_data)
            if (Date.now() < parsed.expires_at) {
              return parsed.data
            } else {
              sessionStorage.removeItem(cache_key)
            }
          }
          return null

        default:
          return null
      }
    } catch (error) {
      console.warn('Cache get error:', error)
      return null
    }
  }

  /**
   * 设置缓存数据
   */
  async set<T>(url: string, data: T, params?: Record<string, any>): Promise<void> {
    const cache_key = this.generate_cache_key(url, params)

    try {
      switch (this.config.storage_type) {
        case 'memory':
          this.memory_cache.set(cache_key, data, this.config.ttl)
          break

        case 'localStorage':
          local_storage_cache.set(cache_key, data, this.config.ttl)
          break

        case 'sessionStorage':
          const cache_data = {
            data,
            expires_at: Date.now() + this.config.ttl
          }
          sessionStorage.setItem(cache_key, JSON.stringify(cache_data))
          break
      }
    } catch (error) {
      console.warn('Cache set error:', error)
    }
  }

  /**
   * 删除缓存
   */
  async delete(url: string, params?: Record<string, any>): Promise<void> {
    const cache_key = this.generate_cache_key(url, params)

    try {
      switch (this.config.storage_type) {
        case 'memory':
          this.memory_cache.delete(cache_key)
          break

        case 'localStorage':
          localStorage.removeItem(cache_key)
          break

        case 'sessionStorage':
          sessionStorage.removeItem(cache_key)
          break
      }
    } catch (error) {
      console.warn('Cache delete error:', error)
    }
  }

  /**
   * 清空所有缓存
   */
  async clear(): Promise<void> {
    try {
      switch (this.config.storage_type) {
        case 'memory':
          this.memory_cache.clear()
          break

        case 'localStorage':
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.config.key_prefix)) {
              localStorage.removeItem(key)
            }
          })
          break

        case 'sessionStorage':
          Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith(this.config.key_prefix)) {
              sessionStorage.removeItem(key)
            }
          })
          break
      }
    } catch (error) {
      console.warn('Cache clear error:', error)
    }
  }

  /**
   * 获取缓存统计信息
   */
  get_stats() {
    if (this.config.storage_type === 'memory') {
      return { size: this.memory_cache.size(), hit_rate: 0 }
    }
    return { size: 0, hit_rate: 0 }
  }
}

/**
 * HTTP请求方法类型
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * 请求配置接口
 */
interface RequestConfig {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  cache?: boolean
  cache_ttl?: number
  timeout?: number
  retry_count?: number
  retry_delay?: number
}

/**
 * 带缓存的API客户端
 */
class CachedApiClient {
  private base_url: string
  private default_headers: Record<string, string>
  private cache: ApiCache
  private request_cache: ApiCache // 用于缓存GET请求
  private mutation_cache: ApiCache // 用于缓存POST/PUT等请求的结果

  constructor(
    base_url: string = '',
    cache_config: CacheConfig = {},
    default_headers: Record<string, string> = {}
  ) {
    this.base_url = base_url
    this.default_headers = {
      'Content-Type': 'application/json',
      ...default_headers
    }

    // 为不同类型的请求创建不同的缓存实例
    this.request_cache = new ApiCache({
      ...cache_config,
      key_prefix: 'api_request_',
      ttl: cache_config.ttl || 5 * 60 * 1000 // GET请求缓存5分钟
    })

    this.mutation_cache = new ApiCache({
      ...cache_config,
      key_prefix: 'api_mutation_',
      ttl: cache_config.ttl || 30 * 1000, // 变更请求缓存30秒
      storage_type: 'memory' // 变更请求只使用内存缓存
    })

    this.cache = this.request_cache
  }

  /**
   * 构建完整URL
   */
  private build_url(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint
    }
    return `${this.base_url}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`
  }

  /**
   * 发送HTTP请求
   */
  private async fetch_with_timeout(
    url: string,
    config: RequestInit,
    timeout: number = 30000 // 增加到30秒
  ): Promise<Response> {
    const controller = new AbortController()
    const timeout_id = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      })
      clearTimeout(timeout_id)
      return response
    } catch (error) {
      clearTimeout(timeout_id)
      
      // 改进错误处理，避免在生产环境中记录过多错误
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`请求超时: ${url} (${timeout}ms)`)
        } else if (error.message.includes('ETIMEDOUT') || error.message.includes('TimeoutError')) {
          throw new Error(`网络超时: ${url}`)
        } else if (error.message.includes('fetch failed')) {
          throw new Error(`网络连接失败: ${url}`)
        }
      }
      
      throw error
    }
  }

  /**
   * 重试机制
   */
  private async retry_request<T>(
    request_fn: () => Promise<T>,
    retry_count: number = 3,
    retry_delay: number = 1000
  ): Promise<T> {
    let last_error: Error

    for (let i = 0; i <= retry_count; i++) {
      try {
        return await request_fn()
      } catch (error) {
        last_error = error as Error
        
        if (i < retry_count) {
          await new Promise(resolve => setTimeout(resolve, retry_delay * Math.pow(2, i)))
        }
      }
    }

    throw last_error!
  }

  /**
   * 通用请求方法
   */
  async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      cache = method === 'GET',
      cache_ttl,
      timeout = 10000,
      retry_count = 3,
      retry_delay = 1000
    } = config

    const url = this.build_url(endpoint)
    const request_headers = { ...this.default_headers, ...headers }

    // 对于GET请求，尝试从缓存获取
    if (method === 'GET' && cache) {
      const cached_data = await this.request_cache.get<T>(url)
      if (cached_data) {
        return cached_data
      }
    }

    // 构建请求配置
    const fetch_config: RequestInit = {
      method,
      headers: request_headers,
      body: body ? JSON.stringify(body) : undefined
    }

    // 执行请求（带重试）
    const response = await this.retry_request(
      () => this.fetch_with_timeout(url, fetch_config, timeout),
      retry_count,
      retry_delay
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    // 缓存GET请求的结果
    if (method === 'GET' && cache) {
      if (cache_ttl) {
        // 创建临时缓存实例用于自定义TTL
        const temp_cache = new ApiCache({
          ...this.request_cache['config'],
          ttl: cache_ttl
        })
        await temp_cache.set(url, data)
      } else {
        await this.request_cache.set(url, data)
      }
    }

    // 对于变更请求，清除相关缓存
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      await this.invalidate_related_cache(endpoint)
    }

    return data
  }

  /**
   * GET请求
   */
  async get<T>(endpoint: string, params?: Record<string, any>, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    let url = endpoint
    if (params) {
      const search_params = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          search_params.append(key, String(value))
        }
      })
      url += `?${search_params.toString()}`
    }

    return this.request<T>(url, { ...config, method: 'GET' })
  }

  /**
   * POST请求
   */
  async post<T>(endpoint: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body: data })
  }

  /**
   * PUT请求
   */
  async put<T>(endpoint: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body: data })
  }

  /**
   * DELETE请求
   */
  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  /**
   * PATCH请求
   */
  async patch<T>(endpoint: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body: data })
  }

  /**
   * 使相关缓存失效
   */
  private async invalidate_related_cache(endpoint: string): Promise<void> {
    // 简单的缓存失效策略：清除包含相同路径前缀的缓存
    const path_segments = endpoint.split('/').filter(Boolean)
    
    if (path_segments.length > 0) {
      const base_path = path_segments[0]
      // 这里可以实现更复杂的缓存失效逻辑
      // 目前简单地清除所有缓存
      await this.request_cache.clear()
    }
  }

  /**
   * 手动清除缓存
   */
  async clear_cache(): Promise<void> {
    await this.request_cache.clear()
    await this.mutation_cache.clear()
  }

  /**
   * 获取缓存统计
   */
  get_cache_stats() {
    return {
      request_cache: this.request_cache.get_stats(),
      mutation_cache: this.mutation_cache.get_stats()
    }
  }
}

/**
 * 默认API客户端实例
 */
export const api_client = new CachedApiClient(
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  {
    ttl: 5 * 60 * 1000, // 5分钟
    max_size: 100,
    storage_type: 'memory'
  }
)

/**
 * 产品API客户端（使用localStorage缓存）
 */
export const product_api_client = new CachedApiClient(
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  {
    ttl: 10 * 60 * 1000, // 10分钟
    max_size: 50,
    storage_type: 'localStorage',
    key_prefix: 'product_api_'
  }
)

/**
 * 导出缓存类供其他模块使用
 */
export { ApiCache, CachedApiClient }

/**
 * 缓存管理工具
 */
export const cache_manager = {
  /**
   * 清除所有API缓存
   */
  async clear_all(): Promise<void> {
    await api_client.clear_cache()
    await product_api_client.clear_cache()
  },

  /**
   * 获取所有缓存统计
   */
  get_all_stats() {
    return {
      api_client: api_client.get_cache_stats(),
      product_api_client: product_api_client.get_cache_stats()
    }
  },

  /**
   * 预热缓存
   */
  async warm_up(): Promise<void> {
    try {
      // 预加载关键数据
      await Promise.allSettled([
        product_api_client.get('/products', { limit: 10 }),
        api_client.get('/categories'),
        api_client.get('/config')
      ])
    } catch (error) {
      console.warn('Cache warm-up failed:', error)
    }
  }
}
