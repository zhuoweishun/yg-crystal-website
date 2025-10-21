#!/usr/bin/env node

/**
 * 环境配置检查工具
 * 检查当前环境配置是否正确
 */

const fs = require('fs')
const path = require('path')

// 加载环境变量文件
function load_env_files() {
  const env_files = ['.env.local', '.env.production', '.env']
  
  env_files.forEach(file => {
    const file_path = path.join(process.cwd(), file)
    if (fs.existsSync(file_path)) {
      const content = fs.readFileSync(file_path, 'utf8')
      content.split('\n').forEach(line => {
        line = line.trim()
        if (line && !line.startsWith('#')) {
          const [key, ...value_parts] = line.split('=')
          if (key && value_parts.length > 0 && !process.env[key]) {
            process.env[key] = value_parts.join('=').trim()
          }
        }
      })
    }
  })
}

// 在脚本开始时加载环境变量
load_env_files()

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

// 检查环境文件是否存在
function check_env_files() {
  log('\n=== 检查环境文件 ===', 'cyan')
  
  const env_files = [
    '.env.local',
    '.env.production',
    '.env.example'
  ]
  
  const results = {}
  
  env_files.forEach(file => {
    const file_path = path.join(process.cwd(), file)
    const exists = fs.existsSync(file_path)
    results[file] = exists
    
    if (exists) {
      log(`✓ ${file} 存在`, 'green')
    } else {
      log(`✗ ${file} 不存在`, 'red')
    }
  })
  
  return results
}

// 检查环境变量
function check_env_variables() {
  log('\n=== 检查环境变量 ===', 'cyan')
  
  const required_vars = [
    'NODE_ENV',
    'API_BASE_URL',
    'NEXT_PUBLIC_SITE_URL',
    'DOUBAO_API_KEY'
  ]
  
  const optional_vars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'DEBUG',
    'LOG_LEVEL'
  ]
  
  log('必需的环境变量:', 'yellow')
  required_vars.forEach(var_name => {
    const value = process.env[var_name]
    if (value) {
      log(`✓ ${var_name} = ${value.length > 20 ? value.substring(0, 20) + '...' : value}`, 'green')
    } else {
      log(`✗ ${var_name} 未设置`, 'red')
    }
  })
  
  log('\n可选的环境变量:', 'yellow')
  optional_vars.forEach(var_name => {
    const value = process.env[var_name]
    if (value) {
      log(`✓ ${var_name} = ${value.length > 20 ? value.substring(0, 20) + '...' : value}`, 'green')
    } else {
      log(`- ${var_name} 未设置`, 'yellow')
    }
  })
}

// 检查当前环境
function check_current_environment() {
  log('\n=== 当前环境信息 ===', 'cyan')
  
  const node_env = process.env.NODE_ENV || 'development'
  const api_base_url = process.env.API_BASE_URL || '未设置'
  const site_url = process.env.NEXT_PUBLIC_SITE_URL || '未设置'
  
  log(`环境: ${node_env}`, node_env === 'production' ? 'red' : 'green')
  log(`API地址: ${api_base_url}`, 'blue')
  log(`网站地址: ${site_url}`, 'blue')
  
  // 环境一致性检查
  if (node_env === 'development') {
    if (api_base_url.includes('localhost')) {
      log('✓ 开发环境API配置正确', 'green')
    } else {
      log('⚠ 开发环境但API不是localhost', 'yellow')
    }
  } else if (node_env === 'production') {
    if (!api_base_url.includes('localhost')) {
      log('✓ 生产环境API配置正确', 'green')
    } else {
      log('⚠ 生产环境但API是localhost', 'yellow')
    }
  }
}

// 检查配置文件
function check_config_files() {
  log('\n=== 检查配置文件 ===', 'cyan')
  
  const config_files = [
    'next.config.ts',
    'package.json',
    'tsconfig.json'
  ]
  
  config_files.forEach(file => {
    const file_path = path.join(process.cwd(), file)
    if (fs.existsSync(file_path)) {
      log(`✓ ${file} 存在`, 'green')
    } else {
      log(`✗ ${file} 不存在`, 'red')
    }
  })
}

// 主函数
function main() {
  log('🔍 环境配置检查工具', 'magenta')
  log('====================', 'magenta')
  
  check_env_files()
  check_env_variables()
  check_current_environment()
  check_config_files()
  
  log('\n✅ 环境检查完成', 'green')
}

// 运行检查
if (require.main === module) {
  main()
}

module.exports = {
  check_env_files,
  check_env_variables,
  check_current_environment,
  check_config_files
}