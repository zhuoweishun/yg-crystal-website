#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 构建后脚本 - 复制静态资源到 standalone 目录
 * 解决 Next.js standalone 模式静态资源缺失问题
 */

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`源目录不存在: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const projectRoot = process.cwd();
  const standaloneDir = path.join(projectRoot, '.next', 'standalone');
  
  if (!fs.existsSync(standaloneDir)) {
    console.log('Standalone 目录不存在，跳过静态资源复制');
    return;
  }

  console.log('开始复制静态资源到 standalone 目录...');

  // 复制 .next/static 到 .next/standalone/.next/static
  const staticSrc = path.join(projectRoot, '.next', 'static');
  const staticDest = path.join(standaloneDir, '.next', 'static');
  
  if (fs.existsSync(staticSrc)) {
    copyRecursive(staticSrc, staticDest);
    console.log('✓ 已复制 .next/static');
  }

  // 复制 public 到 .next/standalone/public
  const publicSrc = path.join(projectRoot, 'public');
  const publicDest = path.join(standaloneDir, 'public');
  
  if (fs.existsSync(publicSrc)) {
    copyRecursive(publicSrc, publicDest);
    console.log('✓ 已复制 public');
  }

  console.log('静态资源复制完成！');
}

if (require.main === module) {
  main();
}

module.exports = { main