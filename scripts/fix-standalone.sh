#!/bin/bash

echo "=== 开始修复 Next.js Standalone 静态资源问题 ==="

# 检查当前目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录执行此脚本"
    exit 1
fi

echo "📁 当前目录：$(pwd)"

# 重新构建项目
echo "🔨 重新构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建完成"

# 检查 standalone 目录是否存在
if [ ! -d ".next/standalone" ]; then
    echo "❌ 错误：standalone 目录不存在，请检查 next.config.ts 配置"
    exit 1
fi

# 复制静态资源
echo "📂 复制静态资源到 standalone 目录..."

# 创建必要的目录
mkdir -p .next/standalone/.next
mkdir -p .next/standalone/public

# 复制 .next/static 到 standalone
if [ -d ".next/static" ]; then
    cp -r .next/static .next/standalone/.next/
    echo "✅ 静态资源复制完成"
else
    echo "⚠️  警告：.next/static 目录不存在"
fi

# 复制 public 目录到 standalone
if [ -d "public" ]; then
    cp -r public/* .next/standalone/public/
    echo "✅ 公共资源复制完成"
else
    echo "⚠️  警告：public 目录不存在"
fi

# 复制环境配置文件
if [ -f ".env.production" ]; then
    cp .env.production .next/standalone/
    echo "✅ 环境配置文件复制完成"
else
    echo "⚠️  警告：.env.production 文件不存在"
fi

# 验证复制结果
echo "🔍 验证复制结果..."

if [ -d ".next/standalone/.next/static" ]; then
    static_count=$(find .next/standalone/.next/static -type f | wc -l)
    echo "✅ 静态文件数量：$static_count"
fi

if [ -d ".next/standalone/public/crystals" ]; then
    crystal_count=$(find .next/standalone/public/crystals -type f | wc -l)
    echo "✅ 水晶图片数量：$crystal_count"
fi

# 设置文件权限
echo "🔐 设置文件权限..."
chmod -R 755 .next/standalone/

echo "🎉 修复完成！"
echo ""
echo "📋 接下来请执行以下操作："
echo "1. 重启 Node.js 项目（在宝塔面板中）"
echo "2. 检查防火墙设置（确保3002端口开放）"
echo "3. 访问网站测试：http://139.224.189.1:3002"
echo ""