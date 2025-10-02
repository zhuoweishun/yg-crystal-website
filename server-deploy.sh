#!/bin/bash

# YG水晶网站服务器端部署脚本
# 适用于阿里云服务器 + 宝塔面板

echo "=== YG水晶网站部署脚本开始执行 ==="

# 设置变量
PROJECT_NAME="yg-crystal-website"
GITHUB_REPO="https://github.com/zhuoweishun/yg-crystal-website.git"
WEB_ROOT="/www/wwwroot"
PROJECT_DIR="$WEB_ROOT/$PROJECT_NAME"
NODE_VERSION="v24.6.0"

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
    echo "请使用root权限运行此脚本"
    exit 1
fi

# 检查Node.js版本
echo "检查Node.js版本..."
if command -v node &> /dev/null; then
    CURRENT_NODE_VERSION=$(node --version)
    echo "当前Node.js版本: $CURRENT_NODE_VERSION"
else
    echo "错误: 未找到Node.js，请先安装Node.js"
    exit 1
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "错误: 未找到npm，请先安装npm"
    exit 1
fi

# 创建web根目录（如果不存在）
if [ ! -d "$WEB_ROOT" ]; then
    echo "创建web根目录: $WEB_ROOT"
    mkdir -p "$WEB_ROOT"
fi

# 进入web根目录
cd "$WEB_ROOT"

# 检查项目目录是否存在
if [ -d "$PROJECT_DIR" ]; then
    echo "项目目录已存在，更新代码..."
    cd "$PROJECT_DIR"
    
    # 检查是否为git仓库
    if [ -d ".git" ]; then
        echo "拉取最新代码..."
        git pull origin main
        if [ $? -ne 0 ]; then
            echo "警告: git pull失败，尝试重新克隆..."
            cd "$WEB_ROOT"
            rm -rf "$PROJECT_NAME"
            git clone "$GITHUB_REPO"
        fi
    else
        echo "目录存在但不是git仓库，重新克隆..."
        cd "$WEB_ROOT"
        rm -rf "$PROJECT_NAME"
        git clone "$GITHUB_REPO"
    fi
else
    echo "克隆项目代码..."
    git clone "$GITHUB_REPO"
    if [ $? -ne 0 ]; then
        echo "错误: 克隆失败，请检查网络连接和GitHub访问权限"
        exit 1
    fi
fi

# 进入项目目录
cd "$PROJECT_DIR"

# 检查package.json是否存在
if [ ! -f "package.json" ]; then
    echo "错误: 未找到package.json文件"
    exit 1
fi

# 清理旧的依赖
echo "清理旧的依赖..."
rm -rf node_modules
rm -f package-lock.json

# 安装依赖
echo "安装项目依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "错误: 依赖安装失败"
    exit 1
fi

# 构建生产版本
echo "构建生产版本..."
npm run build:prod
if [ $? -ne 0 ]; then
    echo "错误: 构建失败"
    exit 1
fi

# 设置文件权限
echo "设置文件权限..."
chown -R www:www "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

# 设置特殊权限
chmod +x "$PROJECT_DIR/deploy.sh"
if [ -f "$PROJECT_DIR/ecosystem.config.js" ]; then
    chmod 644 "$PROJECT_DIR/ecosystem.config.js"
fi

# 检查.env.production文件
if [ -f ".env.production" ]; then
    echo "发现生产环境配置文件"
    chmod 600 ".env.production"
else
    echo "警告: 未找到.env.production文件，请手动创建"
fi

# 显示项目信息
echo ""
echo "=== 部署完成 ==="
echo "项目目录: $PROJECT_DIR"
echo "Node.js版本: $(node --version)"
echo "npm版本: $(npm --version)"
echo ""
echo "下一步操作："
echo "1. 在宝塔面板中配置Node项目"
echo "2. 设置项目目录为: $PROJECT_DIR"
echo "3. 设置启动文件为: ecosystem.config.js"
echo "4. 设置包管理器为: npm"
echo "5. 设置端口为: 3002"
echo ""
echo "手动启动命令:"
echo "cd $PROJECT_DIR && npm run start:prod"
echo ""
echo "PM2管理命令:"
echo "cd $PROJECT_DIR && npm run deploy"
echo "cd $PROJECT_DIR && npm run deploy:restart"
echo "cd $PROJECT_DIR && npm run deploy:status"
echo ""