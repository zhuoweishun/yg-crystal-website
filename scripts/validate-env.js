#!/usr/bin/env node

/**
 * 环境变量验证工具
 * 验证环境变量的格式和有效性
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

// 验证规则
const validation_rules = {
  NODE_ENV: {
    required: true,
    valid_values: ['development', 'production', 'test'],
    description: '环境标识'
  },
  API_BASE_URL: {
    required: true,
    pattern: /^https?:\/\/.+/,
    description: 'API基础地址'
  },
  NEXT_PUBLIC_SITE_URL: {
    required: true,
    pattern: /^https?:\/\/.+/,
    description: '网站基础地址'
  },
  DOUBAO_API_KEY: {
    required: true,
    min_length: 10,
    description: '豆包AI API密钥'
  },
  DOUBAO_BASE_URL: {
    required: false,
    pattern: /^https?:\/\/.+/,
    description: '豆包AI API地址'
  },
  DATABASE_URL: {
    required: false,
    pattern: /^mysql:\/\/.+/,
    description: '数据库连接字符串'
  },
  JWT_SECRET: {
    required: false,
    min_length: 16,
    description: 'JWT密钥'
  },
  PORT: {
    required: false,
    pattern: /^\d+$/,
    description: '端口号'
  }
}

// 验证单个环境变量
function validate_env_var(name, value, rule) {
  const errors = []
  
  // 检查是否必需
  if (rule.required && !value) {
    errors.push(`${name} 是必需的但未设置`)
    return errors
  }
  
  if (!value) {
    return errors // 可选变量未设置，跳过其他验证
  }
  
  // 检查有效值
  if (rule.valid_values && !rule.valid_values.includes(value)) {
    errors.push(`${name} 的值 "${value}" 不在有效值列表中: ${rule.valid_values.join(', ')}`)
  }
  
  // 检查正则表达式
  if (rule.pattern && !rule.pattern.test(value)) {
    errors.push(`${name} 的格式不正确: "${value}"`)
  }
  
  // 检查最小长度
  if (rule.min_length && value.length < rule.min_length) {
    errors.push(`${name} 的长度不能少于 ${rule.min_length} 个字符`)
  }
  
  // 检查最大长度
  if (rule.max_length && value.length > rule.max_length) {
    errors.push(`${name} 的长度不能超过 ${rule.max_length} 个字符`)
  }
  
  return errors
}

// 验证环境一致性
function validate_environment_consistency() {
  log('\n=== 环境一致性验证 ===', 'cyan')
  
  const node_env = process.env.NODE_ENV
  const api_base_url = process.env.API_BASE_URL
  const site_url = process.env.NEXT_PUBLIC_SITE_URL
  
  const warnings = []
  
  if (node_env === 'development') {
    if (api_base_url && !api_base_url.includes('localhost')) {
      warnings.push('开发环境建议使用localhost作为API地址')
    }
    if (site_url && !site_url.includes('localhost')) {
      warnings.push('开发环境建议使用localhost作为网站地址')
    }
  } else if (node_env === 'production') {
    if (api_base_url && api_base_url.includes('localhost')) {
      warnings.push('生产环境不应使用localhost作为API地址')
    }
    if (site_url && site_url.includes('localhost')) {
      warnings.push('生产环境不应使用localhost作为网站地址')
    }
    if (api_base_url && !api_base_url.startsWith('https://')) {
      warnings.push('生产环境建议使用HTTPS协议')
    }
  }
  
  if (warnings.length === 0) {
    log('✓ 环境配置一致性检查通过', 'green')
  } else {
    warnings.forEach(warning => {
      log(`⚠ ${warning}`, 'yellow')
    })
  }
  
  return warnings
}

// 验证所有环境变量
function validate_all_env_vars() {
  log('\n=== 环境变量验证 ===', 'cyan')
  
  let total_errors = 0
  let total_warnings = 0
  
  Object.entries(validation_rules).forEach(([name, rule]) => {
    const value = process.env[name]
    const errors = validate_env_var(name, value, rule)
    
    if (errors.length === 0) {
      if (value) {
        log(`✓ ${name}: ${rule.description}`, 'green')
      } else {
        log(`- ${name}: ${rule.description} (可选，未设置)`, 'yellow')
      }
    } else {
      errors.forEach(error => {
        log(`✗ ${error}`, 'red')
        total_errors++
      })
    }
  })
  
  return { total_errors, total_warnings }
}

// 生成环境配置报告
function generate_env_report() {
  log('\n=== 环境配置报告 ===', 'cyan')
  
  const node_env = process.env.NODE_ENV || 'development'
  const timestamp = new Date().toISOString()
  
  const report = {
    timestamp,
    environment: node_env,
    variables: {},
    validation_results: {}
  }
  
  // 收集环境变量
  Object.keys(validation_rules).forEach(name => {
    const value = process.env[name]
    report.variables[name] = value ? '已设置' : '未设置'
  })
  
  // 验证结果
  const { total_errors } = validate_all_env_vars()
  const warnings = validate_environment_consistency()
  
  report.validation_results = {
    errors: total_errors,
    warnings: warnings.length,
    status: total_errors === 0 ? 'PASS' : 'FAIL'
  }
  
  log(`\n📊 验证报告:`, 'blue')
  log(`   环境: ${report.environment}`, 'blue')
  log(`   错误: ${report.validation_results.errors}`, report.validation_results.errors > 0 ? 'red' : 'green')
  log(`   警告: ${report.validation_results.warnings}`, report.validation_results.warnings > 0 ? 'yellow' : 'green')
  log(`   状态: ${report.validation_results.status}`, report.validation_results.status === 'PASS' ? 'green' : 'red')
  
  return report
}

// 主函数
function main() {
  log('🔍 环境变量验证工具', 'magenta')
  log('===================', 'magenta')
  
  const report = generate_env_report()
  
  if (report.validation_results.status === 'PASS') {
    log('\n✅ 所有环境变量验证通过！', 'green')
    process.exit(0)
  } else {
    log('\n❌ 环境变量验证失败，请检查上述错误', 'red')
    process.exit(1)
  }
}

// 运行验证
if (require.main === module) {
  main()
}

module.exports = {
  validate_env_var,
  validate_all_env_vars,
  validate_environment_consistency,
  generate_env_report
}