'use client'

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
              ICP备案号：[请填写您的ICP备案号]
            </a>
          </div>

          {/* 公安备案信息（如果有的话） */}
          <div className="text-sm text-gray-200">
            <a 
              href="http://www.beian.gov.cn/portal/registerSystemInfo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 underline flex items-center justify-center gap-1"
            >
              <span>🔒</span>
              <span>公安备案号：[请填写您的公安备案号]</span>
            </a>
          </div>

          {/* 版权信息 */}
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} 保留所有权利.
          </div>
        </div>
      </div>
    </footer>
  )
}