'use client'

import React, { Suspense, lazy, ComponentType } from 'react'
import { use_network_status } from '@/hooks/use_performance'

/**
 * 加载状态组件
 */
interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Loading({ message = '加载中...', size = 'md' }: LoadingProps) {
  const size_classes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`border-2 border-blue-600 border-t-transparent rounded-full animate-spin ${size_classes[size]} mb-4`} />
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

/**
 * 错误边界组件
 */
interface ErrorBoundaryState {
  has_error: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: React.ComponentType<{ error?: Error }> }>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{ fallback?: React.ComponentType<{ error?: Error }> }>) {
    super(props)
    this.state = { has_error: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { has_error: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo)
  }

  render() {
    if (this.state.has_error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} />
    }

    return this.props.children
  }
}

/**
 * 默认错误回退组件
 */
function DefaultErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-500 text-4xl mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">组件加载失败</h3>
      <p className="text-gray-600 mb-4">
        {error?.message || '发生了未知错误，请刷新页面重试'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        刷新页面
      </button>
    </div>
  )
}

/**
 * 懒加载组件包装器
 */
interface LazyComponentProps {
  children: React.ReactNode
  loading?: React.ComponentType<LoadingProps>
  error_fallback?: React.ComponentType<{ error?: Error }>
  loading_message?: string
}

export function LazyComponent({
  children,
  loading: LoadingComponent = Loading,
  error_fallback,
  loading_message
}: LazyComponentProps) {
  return (
    <ErrorBoundary fallback={error_fallback}>
      <Suspense fallback={<LoadingComponent message={loading_message} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

/**
 * 动态导入组件的工厂函数
 */
export function create_lazy_component<T extends ComponentType<any>>(
  import_fn: () => Promise<{ default: T }>,
  options: {
    loading_message?: string
    error_fallback?: React.ComponentType<{ error?: Error }>
    preload?: boolean
  } = {}
) {
  const LazyComponentInner = lazy(import_fn)

  // 预加载组件
  if (options.preload) {
    import_fn()
  }

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <LazyComponent
        loading_message={options.loading_message}
        error_fallback={options.error_fallback}
      >
        <LazyComponentInner {...(props as any)} />
      </LazyComponent>
    )
  }
}

/**
 * 网络感知的懒加载组件
 */
interface NetworkAwareLazyProps extends LazyComponentProps {
  low_network_fallback?: React.ComponentType
  offline_fallback?: React.ComponentType
}

export function NetworkAwareLazy({
  children,
  low_network_fallback: LowNetworkFallback,
  offline_fallback: OfflineFallback,
  ...props
}: NetworkAwareLazyProps) {
  const network_status = use_network_status()

  // 离线状态
  if (!network_status.online && OfflineFallback) {
    return <OfflineFallback />
  }

  // 低网速状态
  if (
    network_status.effective_type === 'slow-2g' ||
    network_status.effective_type === '2g'
  ) {
    if (LowNetworkFallback) {
      return <LowNetworkFallback />
    }
  }

  return <LazyComponent {...props}>{children}</LazyComponent>
}

/**
 * 预定义的懒加载组件
 */

// 页面级别的懒加载组件
export const LazyPages = {
  Home: create_lazy_component(
    () => import('@/app/page'),
    { loading_message: '正在加载首页...', preload: true }
  ),
  About: create_lazy_component(
    () => import('@/app/about/page'),
    { loading_message: '正在加载关于我们...' }
  ),
  Products: create_lazy_component(
    () => import('@/app/products/page'),
    { loading_message: '正在加载产品页面...' }
  ),
  CrystalMatching: create_lazy_component(
    () => import('@/app/crystal-matching/page'),
    { loading_message: '正在加载水晶匹配...' }
  )
}

/**
 * 条件懒加载Hook
 */
export function useConditionalLazyLoad(
  condition: boolean,
  import_fn: () => Promise<unknown>
) {
  React.useEffect(() => {
    if (condition) {
      import_fn()
    }
  }, [condition, import_fn])
}

/**
 * 预加载关键组件
 */
export function preload_critical_components() {
  // 预加载首页关键组件
  import('@/components/navigation')
  import('@/components/footer')
}
