#!/usr/bin/env node

/**
 * 生产环境启动脚本
 * 设置端口为3002并启动standalone服务器
 */

// 设置端口环境变量
process.env.PORT = '3002';
process.env.HOSTNAME = '0.0.0.0';
process.env.NODE_ENV = 'production';

// 切换到standalone目录
const path = require('path');
const standaloneDir = path.join(__dirname, '.next', 'standalone');

console.log('🚀 启动生产服务器...');
console.log(`📍 端口: ${process.env.PORT}`);
console.log(`🌐 主机: ${process.env.HOSTNAME}`);
console.log(`📁 目录: ${standaloneDir}`);

// 切换工作目录
process.chdir(standaloneDir);

// 启动服务器
require(path.join(standaloneDir, 'server.js'));