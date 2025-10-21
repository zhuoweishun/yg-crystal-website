'use client'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 备案信息区域 - 法规要求的醒目位置 */}
        <div className="text-center space-y-3">
          {/* ICP备案信息 - 法规要求必须显示 */}
          <div className="text-sm text-gray-200 font-medium">
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 underline"
            >
              苏ICP备2025210868号-1
            </a>
          </div>

          {/* 公安备案信息 - 法规要求必须显示 */}
          <div className="text-sm text-gray-200 font-medium">
            <a 
              href="https://beian.mps.gov.cn/#/query/webSearch?code=32050502012374" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200 underline flex items-center justify-center gap-1"
            >
              <Image 
                src="/beian-icon.png" 
                alt="公安备案" 
                width={14} 
                height={14} 
                className="inline-block"
              />
              苏公网安备32050502012374号
            </a>
          </div>

          {/* 版权信息 */}
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} 爻光晶舍 保留所有权利
          </div>
        </div>
      </div>
    </footer>
  )
}