'use client'

import React, { useState, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import { use_lazy_loading } from '@/hooks/use_performance'
import { IMAGE_LAZY_CONFIG } from '@/lib/performance_utils'

interface OptimizedImageProps extends Omit<ImageProps, 'loading' | 'placeholder'> {
  fallback_src?: string
  lazy?: boolean
  blur_data_url?: string
  on_load_complete?: () => void
  on_error?: () => void
  show_loading?: boolean
  loading_component?: React.ReactNode
}

/**
 * 优化的图片组件
 * 支持懒加载、错误处理、加载状态等
 */
export function OptimizedImage({
  src,
  alt,
  fallback_src = '/images/placeholder.jpg',
  lazy = true,
  blur_data_url = IMAGE_LAZY_CONFIG.blurDataURL,
  on_load_complete,
  on_error,
  show_loading = true,
  loading_component,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [image_src, set_image_src] = useState(src)
  const [is_loading, set_is_loading] = useState(true)
  const [has_error, set_has_error] = useState(false)
  const [lazy_ref, is_visible] = use_lazy_loading(0.1)

  const handle_load = useCallback(() => {
    set_is_loading(false)
    on_load_complete?.()
  }, [on_load_complete])

  const handle_error = useCallback(() => {
    set_has_error(true)
    set_is_loading(false)
    if (fallback_src && image_src !== fallback_src) {
      set_image_src(fallback_src)
      set_has_error(false)
      set_is_loading(true)
    }
    on_error?.()
  }, [fallback_src, image_src, on_error])

  // 如果启用懒加载且图片不可见，显示占位符
  if (lazy && !is_visible) {
    return (
      <div
        ref={lazy_ref}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ 
          width: props.width || '100%', 
          height: props.height || '200px',
          aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined
        }}
      />
    )
  }

  return (
    <div className={`relative ${className}`} ref={lazy ? lazy_ref : undefined}>
      {/* 加载状态 */}
      {is_loading && show_loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          {loading_component || (
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}

      <Image
        src={image_src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        placeholder="blur"
        blurDataURL={blur_data_url}
        onLoad={handle_load}
        onError={handle_error}
        className={`transition-opacity duration-300 ${
          is_loading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />

      {/* 错误状态 */}
      {has_error && image_src === fallback_src && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2"></div>
            <div className="text-sm">图片加载失败</div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 响应式图片组件
 */
interface ResponsiveImageProps extends OptimizedImageProps {
  sizes?: string
  breakpoints?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

export function ResponsiveImage({
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  breakpoints,
  ...props
}: ResponsiveImageProps) {
  // 如果提供了断点配置，生成sizes字符串
  const responsive_sizes = breakpoints
    ? Object.entries(breakpoints)
        .map(([breakpoint, size]) => {
          const breakpoint_map = {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px'
          }
          return `(max-width: ${breakpoint_map[breakpoint as keyof typeof breakpoint_map]}) ${size}`
        })
        .join(', ') + ', 100vw'
    : sizes

  return (
    <OptimizedImage
      sizes={responsive_sizes}
      {...props}
    />
  )
}

/**
 * 产品图片组件（专门用于产品展示）
 */
interface ProductImageProps extends Omit<OptimizedImageProps, 'src'> {
  product_id?: string
  image_url?: string
  product_name: string
}

export function ProductImage({
  product_id,
  image_url,
  product_name,
  ...props
}: ProductImageProps) {
  function get_product_image_url(product_id?: string, image_url?: string): string {
    if (image_url && image_url.startsWith('http')) {
      return image_url
    }
    if (product_id) {
      return `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        `natural crystal ${product_name} high quality product photography white background professional lighting`
      )}&image_size=square_hd`
    }
    return '/images/product-placeholder.jpg'
  }

  // 从props中移除alt属性，避免重复
  const { alt: _, ...restProps } = props

  return (
    <OptimizedImage
      src={get_product_image_url(product_id, image_url)}
      alt={product_name}
      fallback_src="/images/product-placeholder.jpg"
      {...restProps}
    />
  )
}

/**
 * 头像组件
 */
interface AvatarImageProps extends Omit<OptimizedImageProps, 'src'> {
  user_name: string
  avatar_url?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AvatarImage({
  user_name,
  avatar_url,
  size = 'md',
  className = '',
  ...props
}: AvatarImageProps) {
  const size_classes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const get_avatar_url = (name: string, url?: string) => {
    if (url) return url
    // 生成默认头像
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=ffffff&size=128`
  }

  // 从props中移除alt属性，避免重复
  const { alt: _, ...restProps } = props

  return (
    <OptimizedImage
      src={get_avatar_url(user_name, avatar_url)}
      alt={`${user_name}的头像`}
      className={`rounded-full ${size_classes[size]} ${className}`}
      fallback_src="/images/default-avatar.jpg"
      {...restProps}
    />
  )
}
