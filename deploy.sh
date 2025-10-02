#!/bin/bash

# 云光水晶官网部署脚本
# 用于阿里云服务器部署 www.yg-crystal.com

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
PROJECT_NAME="yg-crystal-website"
PROJECT_PATH="/www/wwwroot/yg-crystal-website"
LOG_PATH="/www/wwwlogs/yg-crystal-website"
BACKUP_PATH="/www/backup/yg-crystal-website"
NODE_VERSION="22"

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
check_root() {
    if [ "$EUID" -ne 0 ]; then
        log_error "请使用root用户运行此脚本"
        exit 1
    fi
}

# 创建必要目录
create_directories() {
    log_info "创建必要目录..."
    mkdir -p $PROJECT_PATH
    mkdir -p $LOG_PATH
    mkdir -p $BACKUP_PATH
    log_success "目录创建完成"
}

# 备份当前版本
backup_current() {
    if [ -d "$PROJECT_PATH/.next" ]; then
        log_info "备份当前版本..."
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
        cp -r $PROJECT_PATH $BACKUP_PATH/$BACKUP_NAME
        log_success "备份完成: $BACKUP_PATH/$BACKUP_NAME"
    fi
}

# 安装依赖
install_dependencies() {
    log_info "安装项目依赖..."
    cd $PROJECT_PATH
    
    # 检查Node.js版本
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js $NODE_VERSION"
        exit 1
    fi
    
    # 清理缓存
    npm cache clean --force
    
    # 安装依赖
    npm install --production=false
    log_success "依赖安装完成"
}

# 构建项目
build_project() {
    log_info "构建生产版本..."
    cd $PROJECT_PATH
    
    # 设置环境变量
    export NODE_ENV=production
    
    # 构建项目
    npm run build
    
    if [ ! -d ".next" ]; then
        log_error "构建失败，.next 目录不存在"
        exit 1
    fi
    
    log_success "项目构建完成"
}

# 停止现有进程
stop_application() {
    log_info "停止现有应用进程..."
    
    if command -v pm2 &> /dev/null; then
        pm2 stop $PROJECT_NAME 2>/dev/null || true
        pm2 delete $PROJECT_NAME 2>/dev/null || true
    fi
    
    # 杀死可能占用端口的进程
    lsof -ti:3002 | xargs kill -9 2>/dev/null || true
    
    log_success "应用进程已停止"
}

# 启动应用
start_application() {
    log_info "启动应用..."
    cd $PROJECT_PATH
    
    # 检查PM2是否安装
    if ! command -v pm2 &> /dev/null; then
        log_info "安装PM2..."
        npm install -g pm2
    fi
    
    # 使用PM2启动应用
    pm2 start ecosystem.config.js --env production
    
    # 保存PM2配置
    pm2 save
    
    # 设置PM2开机自启
    pm2 startup
    
    log_success "应用启动完成"
}

# 健康检查
health_check() {
    log_info "执行健康检查..."
    
    # 等待应用启动
    sleep 10
    
    # 检查端口是否监听
    if lsof -i:3002 &> /dev/null; then
        log_success "应用端口 3002 正常监听"
    else
        log_error "应用端口 3002 未监听，启动可能失败"
        pm2 logs $PROJECT_NAME --lines 20
        exit 1
    fi
    
    # 检查HTTP响应
    if curl -f http://localhost:3002 &> /dev/null; then
        log_success "HTTP健康检查通过"
    else
        log_warning "HTTP健康检查失败，请检查应用状态"
    fi
}

# 清理旧备份
cleanup_old_backups() {
    log_info "清理旧备份文件..."
    find $BACKUP_PATH -name "backup_*" -type d -mtime +7 -exec rm -rf {} + 2>/dev/null || true
    log_success "旧备份清理完成"
}

# 显示部署信息
show_deploy_info() {
    log_success "部署完成！"
    echo ""
    echo "==================================="
    echo "  云光水晶官网部署信息"
    echo "==================================="
    echo "项目名称: $PROJECT_NAME"
    echo "项目路径: $PROJECT_PATH"
    echo "访问地址: https://www.yg-crystal.com"
    echo "本地端口: http://localhost:3002"
    echo "日志路径: $LOG_PATH"
    echo "==================================="
    echo ""
    echo "常用命令:"
    echo "查看状态: pm2 status"
    echo "查看日志: pm2 logs $PROJECT_NAME"
    echo "重启应用: pm2 restart $PROJECT_NAME"
    echo "停止应用: pm2 stop $PROJECT_NAME"
    echo ""
}

# 主函数
main() {
    log_info "开始部署云光水晶官网..."
    
    check_root
    create_directories
    backup_current
    install_dependencies
    build_project
    stop_application
    start_application
    health_check
    cleanup_old_backups
    show_deploy_info
}

# 脚本入口
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "start")
        start_application
        ;;
    "stop")
        stop_application
        ;;
    "restart")
        stop_application
        start_application
        health_check
        ;;
    "status")
        pm2 status
        ;;
    "logs")
        pm2 logs $PROJECT_NAME
        ;;
    "backup")
        backup_current
        ;;
    *)
        echo "用法: $0 {deploy|start|stop|restart|status|logs|backup}"
        echo ""
        echo "命令说明:"
        echo "  deploy  - 完整部署流程"
        echo "  start   - 启动应用"
        echo "  stop    - 停止应用"
        echo "  restart - 重启应用"
        echo "  status  - 查看状态"
        echo "  logs    - 查看日志"
        echo "  backup  - 备份当前版本"
        exit 1
        ;;
esac