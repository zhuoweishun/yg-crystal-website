#!/usr/bin/env node

/**
 * 环境切换工具
 * 帮助在不同环境之间切换配置
 */

const fs = require('fs')
const path = require('path')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// 环境配置模板
const environment_templates = {
  development: {
    NODE_ENV: 'development',
    API_BASE_URL: 'http://localhost:3001',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    DEBUG: 'true',
    LOG_LEVEL: 'debug',
    NEXT_TELEMETRY_DISABLED: '1',
    TURBOPACK: '1',
    FAST_REFRESH: 'true',
    WEBPACK_CACHE: 'true',
    CACHE_ENABLED: 'false',
    MOCK_DATA: 'true',
    ENABLE_DEVTOOLS: 'true',
    SOURCE_MAPS: 'true'
  },
  production: {
    NODE_ENV: 'production',
    API_BASE_URL: 'https://api.yg-crystal.com',
    NEXT_PUBLIC_SITE_URL: 'https://yg-crystal.com',
    DEBUG: 'false',
    LOG_LEVEL: 'info',
    NEXT_TELEMETRY_DISABLED: '1',
    CACHE_ENABLED: 'true',
    MOCK_DATA: 'false',
    ENABLE_DEVTOOLS: 'false',
    SOURCE_MAPS: 'false'
  },
  staging: {
    NODE_ENV: 'production',
    API_BASE_URL: 'https://staging-api.yg-crystal.com',
    NEXT_PUBLIC_SITE_URL: 'https://staging.yg-crystal.com',
    DEBUG: 'true',
    LOG_LEVEL: 'debug',
    NEXT_TELEMETRY_DISABLED: '1',
    CACHE_ENABLED: 'false',
    MOCK_DATA: 'false',
    ENABLE_DEVTOOLS: 'true',
    SOURCE_MAPS: 'true'
  }
}

// 读取现有环境文件
function read_env_file(file_path) {
  if (!fs.existsSync(file_path)) {
    return {}
  }
  
  const content = fs.readFileSync(file_path, 'utf8')
  const env_vars = {}
  
  content.split('\n').forEach(line => {
    line = line.trim()
    if (line && !line.startsWith('#')) {
      const [key, ...value_parts] = line.split('=')
      if (key && value_parts.length > 0) {
        env_vars[key.trim()] = value_parts.join('=').trim()
      }
    }
  })
  
  return env_vars
}

// 写入环境文件
function write_env_file(file_path, env_vars) {
  const lines = []
  
  // 添加文件头注释
  const env_name = path.basename(file_path, '.env').replace('.', '') || 'local'
  lines.push(`# ${env_name.toUpperCase()} 环境配置文件`)
  lines.push(`# 生成时间: ${new Date().toISOString()}`)
  lines.push('')
  
  // 添加环境变量
  Object.entries(env_vars).forEach(([key, value]) => {
    lines.push(`${key}=${value}`)
  })
  
  fs.writeFileSync(file_path, lines.join('\n') + '\n')
}

// 备份当前环境文件
function backup_env_file(file_path) {
  if (fs.existsSync(file_path)) {
    const backup_path = `${file_path}.backup.${Date.now()}`
    fs.copyFileSync(file_path, backup_path)
    log(`✓ 已备份 ${file_path} 到 ${backup_path}`, 'green')
    return backup_path
  }
  return null
}

// 切换到指定环境
function switch_to_environment(target_env) {
  log(`\n🔄 切换到 ${target_env} 环境`, 'cyan')
  
  if (!environment_templates[target_env]) {
    log(`❌ 不支持的环境: ${target_env}`, 'red')
    log(`支持的环境: ${Object.keys(environment_templates).join(', ')}`, 'yellow')
    return false
  }
  
  const env_file_path = path.join(process.cwd(), '.env.local')
  
  // 备份现有文件
  backup_env_file(env_file_path)
  
  // 读取现有配置
  const existing_env = read_env_file(env_file_path)
  
  // 合并配置（保留敏感信息）
  const sensitive_keys = ['DOUBAO_API_KEY', 'JWT_SECRET', 'DATABASE_URL', 'ENCRYPTION_KEY']
  const new_env = { ...environment_templates[target_env] }
  
  sensitive_keys.forEach(key => {
    if (existing_env[key]) {
      new_env[key] = existing_env[key]
      log(`✓ 保留现有的 ${key}`, 'green')
    }
  })
  
  // 写入新配置
  write_env_file(env_file_path, new_env)
  
  log(`✅ 已切换到 ${target_env} 环境`, 'green')
  log(`📁 配置文件: ${env_file_path}`, 'blue')
  
  return true
}

// 显示当前环境状态
function show_current_environment() {
  log('\n📊 当前环境状态', 'cyan')
  
  const env_file_path = path.join(process.cwd(), '.env.local')
  const env_vars = read_env_file(env_file_path)
  
  const node_env = env_vars.NODE_ENV || process.env.NODE_ENV || 'development'
  const api_url = env_vars.API_BASE_URL || process.env.API_BASE_URL || '未设置'
  const site_url = env_vars.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '未设置'
  
  log(`环境: ${node_env}`, node_env === 'production' ? 'red' : 'green')
  log(`API地址: ${api_url}`, 'blue')
  log(`网站地址: ${site_url}`, 'blue')
  
  // 检测环境类型
  let detected_env = 'unknown'
  if (api_url.includes('localhost')) {
    detected_env = 'development'
  } else if (api_url.includes('staging')) {
    detected_env = 'staging'
  } else if (api_url.includes('yg-crystal.com')) {
    detected_env = 'production'
  }
  
  log(`检测到的环境: ${detected_env}`, 'yellow')
}

// 列出所有可用环境
function list_environments() {
  log('\n📋 可用环境列表', 'cyan')
  
  Object.entries(environment_templates).forEach(([env_name, config]) => {
    log(`\n${env_name.toUpperCase()}:`, 'yellow')
    log(`  API地址: ${config.API_BASE_URL}`, 'blue')
    log(`  网站地址: ${config.NEXT_PUBLIC_SITE_URL}`, 'blue')
    log(`  调试模式: ${config.DEBUG}`, 'blue')
  })
}

// 主函数
function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const target_env = args[1]
  
  log('🔧 环境切换工具', 'magenta')
  log('===============', 'magenta')
  
  switch (command) {
    case 'switch':
    case 's':
      if (!target_env) {
        log('❌ 请指定目标环境', 'red')
        log('用法: npm run env:switch <environment>', 'yellow')
        list_environments()
        process.exit(1)
      }
      switch_to_environment(target_env)
      break
      
    case 'status':
    case 'current':
      show_current_environment()
      break
      
    case 'list':
    case 'ls':
      list_environments()
      break
      
    default:
      log('用法:', 'yellow')
      log('  npm run env:switch <environment>  # 切换环境', 'blue')
      log('  npm run env:status               # 显示当前环境', 'blue')
      log('  npm run env:list                 # 列出所有环境', 'blue')
      list_environments()
  }
}

// 运行工具
if (require.main === module) {
  main()
}

module.exports = {
  switch_to_environment,
  show_current_environment,
  list_environments,
  environment_templates
}