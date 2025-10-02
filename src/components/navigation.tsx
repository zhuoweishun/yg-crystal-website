'use client';

import Link from 'next/link';

export function Navigation() {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">
              爻光晶舍
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              首页
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              精选作品
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              关于我们
            </Link>
            <Link 
              href="/energy-test" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              能量测试
            </Link>
            <Link 
              href="/crystal-matching" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              水晶匹配
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}