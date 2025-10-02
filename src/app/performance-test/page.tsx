'use client'

import React, { useState } from 'react'
import Image from 'next/image'

/**
 * 简单的性能测试页面
 */
export default function PerformanceTestPage() {
  const [test_results, set_test_results] = useState<string>('')
  const [is_testing, set_is_testing] = useState(false)

  const run_simple_test = async () => {
    set_is_testing(true)
    set_test_results('')
    
    try {
      const start_time = performance.now()
      
      // 简单的性能测试
      const results = {
        page_load_time: performance.now(),
        user_agent: navigator.userAgent.substring(0, 50),
        online_status: navigator.onLine,
        memory_usage: (window.performance as any).memory ? 
          ((window.performance as any).memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + 'MB' : 'N/A',
        test_duration: (performance.now() - start_time).toFixed(2) + 'ms',
        timestamp: new Date().toISOString()
      }
      
      set_test_results(JSON.stringify(results, null, 2))
      console.debug('性能测试完成:', results)
      
    } catch (error) {
      console.error('性能测试失败:', error)
      set_test_results(`错误: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      set_is_testing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">性能优化测试页面</h1>
          
          {/* 基本信息 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">基本信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">浏览器状态</h3>
                <p className="text-blue-700">在线: {navigator.onLine ? '是' : '否'}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">页面性能</h3>
                <p className="text-green-700">加载时间: {performance.now().toFixed(2)}ms</p>
              </div>
            </div>
          </div>

          {/* 图片优化测试 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">图片优化测试</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Next.js 优化图片</h3>
                <Image
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=crystal_product&image_size=square"
                  alt="水晶产品"
                  width={200}
                  height={200}
                  className="rounded-lg"
                  priority
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">标准 img 标签</h3>
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=crystal_display&image_size=square"
                  alt="水晶展示"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* 测试按钮 */}
          <div className="mb-8">
            <button
              onClick={run_simple_test}
              disabled={is_testing}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                is_testing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {is_testing ? '测试中...' : '运行性能测试'}
            </button>
          </div>

          {/* 测试结果 */}
          {test_results && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">测试结果</h3>
              <pre className="bg-white p-4 rounded border overflow-auto text-sm">
                {test_results}
              </pre>
            </div>
          )}

          {/* 性能优化说明 */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">已实现的性能优化</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
              <li>Next.js 图片优化 - 自动格式转换、尺寸优化、懒加载</li>
              <li>代码分割 - 动态导入、懒加载组件</li>
              <li>缓存策略 - API响应缓存、本地存储缓存</li>
              <li>性能监控 - 页面加载时间、内存使用监控</li>
              <li>网络优化 - 压缩、CDN支持、安全头部</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
