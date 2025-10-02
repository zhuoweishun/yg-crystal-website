'use client'

import { useEffect, useState, useCallback } from 'react'
import { 
  memory_cache, 
  local_storage_cache, 
  debounce, 
  throttle,
  get_network_status,
  get_device_performance,
  performance_monitor,
  optimize_resource_loading
} from '@/lib/performance_utils'

/**
 * 性能优化Hook
 */
export function use_performance_optimization() {
  const [network_status, set_network_status] = useState(get_network_status())
  const [device_performance, set_device_performance] = useState(get_device_performance())

  useEffect(() => {
    // 初始化资源加载优化
    optimize_resource_loading()

    // 监听网络状态变化
    const handle_online = () => set_network_status(get_network_status())
    const handle_offline = () => set_network_status(get_network_status())

    window.addEventListener('online', handle_online)
    window.addEventListener('offline', handle_offline)

    // 监听网络连接变化
    const connection = (navigator as any).connection
    if (connection) {
      const handle_connection_change = () => set_network_status(get_network_status())
      connection.addEventListener('change', handle_connection_change)
      
      return () => {
        window.removeEventListener('online', handle_online)
        window.removeEventListener('offline', handle_offline)
        connection.removeEventListener('change', handle_connection_change)
      }
    }

    return () => {
      window.removeEventListener('online', handle_online)
      window.removeEventListener('offline', handle_offline)
    }
  }, [])

  return {
    network_status,
    device_performance,
    memory_cache,
    local_storage_cache,
    debounce,
    throttle,
    performance_monitor
  }
}

/**
 * 图片懒加载Hook
 */
export function use_lazy_loading(threshold: number = 0.1) {
  const [is_visible, set_is_visible] = useState(false)
  const [element_ref, set_element_ref] = useState<Element | null>(null)

  const ref_callback = useCallback((node: Element | null) => {
    set_element_ref(node)
  }, [])

  useEffect(() => {
    if (!element_ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          set_is_visible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(element_ref)

    return () => observer.disconnect()
  }, [element_ref, threshold])

  return [ref_callback, is_visible] as const
}

/**
 * 缓存Hook
 */
export function use_cache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number
    use_local_storage?: boolean
    dependencies?: any[]
  } = {}
) {
  const { ttl = 5 * 60 * 1000, use_local_storage = false, dependencies = [] } = options
  const [data, set_data] = useState<T | null>(null)
  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState<Error | null>(null)

  const cache = use_local_storage ? local_storage_cache : memory_cache

  const fetch_data = useCallback(async () => {
    // 先检查缓存
    const cached_data = cache.get<T>(key)
    if (cached_data) {
      set_data(cached_data)
      return
    }

    set_loading(true)
    set_error(null)

    try {
      const result = await fetcher()
      cache.set(key, result, ttl)
      set_data(result)
    } catch (err) {
      set_error(err as Error)
    } finally {
      set_loading(false)
    }
  }, [key, fetcher, ttl, cache, ...dependencies])

  useEffect(() => {
    fetch_data()
  }, [fetch_data])

  const invalidate = useCallback(() => {
    cache.delete(key)
    fetch_data()
  }, [key, cache, fetch_data])

  return {
    data,
    loading,
    error,
    invalidate,
    refetch: fetch_data
  }
}

/**
 * 防抖Hook
 */
export function use_debounce<T>(value: T, delay: number): T {
  const [debounced_value, set_debounced_value] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      set_debounced_value(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounced_value
}

/**
 * 节流Hook
 */
export function use_throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const throttled_callback = useCallback(
    throttle(callback, delay),
    [callback, delay]
  )

  return throttled_callback as T
}

/**
 * 性能监控Hook
 */
export function use_performance_monitor(component_name: string) {
  useEffect(() => {
    performance_monitor.mark(`${component_name}_mount_start`)
    
    return () => {
      performance_monitor.mark(`${component_name}_unmount`)
      const mount_time = performance_monitor.measure(
        `${component_name}_mount_start`,
        `${component_name}_unmount`
      )
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${component_name} mount time: ${mount_time.toFixed(2)}ms`)
      }
    }
  }, [component_name])

  const measure_operation = useCallback((operation_name: string, fn: () => void) => {
    const mark_name = `${component_name}_${operation_name}`
    performance_monitor.mark(`${mark_name}_start`)
    
    fn()
    
    performance_monitor.mark(`${mark_name}_end`)
    const operation_time = performance_monitor.measure(
      `${mark_name}_start`,
      `${mark_name}_end`
    )
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${component_name} ${operation_name} time: ${operation_time.toFixed(2)}ms`)
    }
    
    return operation_time
  }, [component_name])

  return { measure_operation }
}

/**
 * 网络状态Hook
 */
export function use_network_status() {
  const [status, set_status] = useState(get_network_status())

  useEffect(() => {
    const update_status = () => set_status(get_network_status())

    window.addEventListener('online', update_status)
    window.addEventListener('offline', update_status)

    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', update_status)
      
      return () => {
        window.removeEventListener('online', update_status)
        window.removeEventListener('offline', update_status)
        connection.removeEventListener('change', update_status)
      }
    }

    return () => {
      window.removeEventListener('online', update_status)
      window.removeEventListener('offline', update_status)
    }
  }, [])

  return status
}
