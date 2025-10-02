const { spawn } = require('child_process');
const path = require('path');

// 设置环境变量
process.env.NODE_ENV = 'production';
process.env.PORT = '3002';

console.log('正在启动YG水晶网站...');
console.log('环境:', process.env.NODE_ENV);
console.log('端口:', process.env.PORT);

// 启动Next.js应用
const nextStart = spawn('npm', ['run', 'start:prod'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: process.env
});

nextStart.on('error', (err) => {
  console.error('启动失败:', err);
  process.exit(1);
});

nextStart.on('close', (code) => {
  console.log(`进程退出，代码: ${code}`);
  process.exit(code);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在关闭...');
  nextStart.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('收到SIGINT信号，正在关闭...');
  nextStart.kill('SIGINT');
});