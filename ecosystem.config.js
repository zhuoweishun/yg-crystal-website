module.exports = {
  apps: [
    {
      // 应用基本信息
      name: 'yg-crystal-website',
      script: 'server.js',
      cwd: '/www/wwwroot/yg-crystal-website',
      
      // 运行环境
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        HOSTNAME: '0.0.0.0'
      },
      
      // 进程管理
      instances: 1, // 可以根据服务器配置调整
      exec_mode: 'cluster',
      
      // 自动重启配置
      autorestart: true,
      watch: false, // 生产环境建议关闭文件监听
      max_memory_restart: '1G',
      
      // 日志配置
      log_file: '/www/wwwlogs/yg-crystal-website/combined.log',
      out_file: '/www/wwwlogs/yg-crystal-website/out.log',
      error_file: '/www/wwwlogs/yg-crystal-website/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // 进程管理
      min_uptime: '10s',
      max_restarts: 10,
      
      // 环境变量
      env_file: '.env.production',
      
      // 启动延迟
      wait_ready: true,
      listen_timeout: 3000,
      kill_timeout: 5000,
      
      // 健康检查
      health_check_grace_period: 3000,
      
      // 其他配置
      merge_logs: true,
      time: true
    }
  ],
  
  // 部署配置（可选）
  deploy: {
    production: {
      user: 'root',
      host: ['139.224.189.1'], // 你的服务器IP
      ref: 'origin/main',
      repo: 'https://github.com/你的用户名/yg-crystal-website.git',
      path: '/www/wwwroot/yg-crystal-website',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install git -y'
    }
  }
}