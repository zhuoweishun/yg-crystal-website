// 性能优化工具函数

/**
 * 图片懒加载配置
 */
export const IMAGE_LAZY_CONFIG = {
  loading: 'lazy' as const,
  placeholder: 'blur' as const,
  blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * 内存缓存类
 */
export class MemoryCache<T = any> {
  private cache = new Map<string, { data: T; timestamp: number; ttl: number }>()
  
  set(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }
  
  get(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }
  
  delete(key: string): boolean {
    return this.cache.delete(key)
  }
  
  clear(): void {
    this.cache.clear()
  }
  
  size(): number {
    return this.cache.size
  }
}

// 全局缓存实例
export const memory_cache = new MemoryCache()

/**
 * 本地存储缓存
 */
export const local_storage_cache = {
  set(key: string, data: any, ttl: number = 24 * 60 * 60 * 1000): void {
    if (typeof window === 'undefined') return
    
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
      console.warn('LocalStorage cache set failed:', error)
    }
  },
  
  get<T = any>(key: string): T | null {
    if (typeof window === 'undefined') return null
    
    try {
      const item = localStorage.getItem(key)
      if (!item) return null
      
      const parsed = JSON.parse(item)
      
      if (Date.now() - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(key)
        return null
      }
      
      return parsed.data
    } catch (error) {
      console.warn('LocalStorage cache get failed:', error)
      return null
    }
  },
  
  delete(key: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
  
  clear(): void {
    if (typeof window === 'undefined') return
    localStorage.clear()
  }
}

/**
 * 图片预加载
 */
export function preload_image(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * 批量图片预加载
 */
export async function preload_images(srcs: string[]): Promise<void> {
  const promises = srcs.map(src => preload_image(src))
  await Promise.allSettled(promises)
}

/**
 * 检测网络连接状态
 */
export function get_network_status(): {
  online: boolean
  connection_type?: string
  effective_type?: string
} {
  if (typeof window === 'undefined') {
    return { online: true }
  }
  
  const navigator_connection = (navigator as any).connection || 
                              (navigator as any).mozConnection || 
                              (navigator as any).webkitConnection
  
  return {
    online: navigator.onLine,
    connection_type: navigator_connection?.type,
    effective_type: navigator_connection?.effectiveType
  }
}

/**
 * 延迟执行
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 重试机制
 */
export async function retry_with_backoff<T>(
  fn: () => Promise<T>,
  max_retries: number = 3,
  base_delay: number = 1000
): Promise<T> {
  let last_error: Error
  
  for (let i = 0; i <= max_retries; i++) {
    try {
      return await fn()
    } catch (error) {
      last_error = error as Error
      
      if (i === max_retries) {
        throw last_error
      }
      
      const delay_time = base_delay * Math.pow(2, i)
      await delay(delay_time)
    }
  }
  
  throw last_error!
}

/**
 * 检测设备性能
 */
export function get_device_performance(): {
  memory?: number
  cores?: number
  connection_speed?: string
} {
  if (typeof window === 'undefined') {
    return {}
  }
  
  const performance_info: any = {}
  
  // 内存信息
  if ('memory' in performance) {
    const memory = (performance as any).memory
    performance_info.memory = memory.usedJSHeapSize / memory.jsHeapSizeLimit
  }
  
  // CPU核心数
  if ('hardwareConcurrency' in navigator) {
    performance_info.cores = navigator.hardwareConcurrency
  }
  
  // 网络连接速度
  const connection = (navigator as any).connection
  if (connection) {
    performance_info.connection_speed = connection.effectiveType
  }
  
  return performance_info
}

/**
 * 性能监控
 */
export class PerformanceMonitor {
  private marks = new Map<string, number>()
  
  mark(name: string): void {
    this.marks.set(name, performance.now())
  }
  
  measure(start_mark: string, end_mark?: string): number {
    const start_time = this.marks.get(start_mark)
    if (!start_time) {
      console.warn(`Performance mark "${start_mark}" not found`)
      return 0
    }
    
    const end_time = end_mark ? this.marks.get(end_mark) : performance.now()
    if (end_mark && !end_time) {
      console.warn(`Performance mark "${end_mark}" not found`)
      return 0
    }
    
    return (end_time || performance.now()) - start_time
  }
  
  clear_marks(): void {
    this.marks.clear()
  }
  
  get_all_marks(): Record<string, number> {
    return Object.fromEntries(this.marks)
  }
}

// 全局性能监控实例
export const performance_monitor = new PerformanceMonitor()

/**
 * 资源加载优化
 */
export function optimize_resource_loading(): void {
  if (typeof window === 'undefined') return
  
  // 预连接到重要域名
  const important_domains = [
    'https://trae-api-sg.mchost.guru',
    'https://api.dorblecapital.com'
  ]
  
  important_domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    document.head.appendChild(link)
  })
  
  // 预加载关键资源
  const critical_resources = [
    '/fonts/inter.woff2',
    '/images/logo.svg'
  ]
  
  critical_resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource
    link.as = resource.includes('.woff') ? 'font' : 'image'
    if (resource.includes('.woff')) {
      link.crossOrigin = 'anonymous'
    }
    document.head.appendChild(link)
  })
}
