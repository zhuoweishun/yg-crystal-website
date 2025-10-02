'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// 图片错误处理组件 - 统一使用占位图片
const CrystalImage = ({ crystal_name, className }: { crystal_name: string; className?: string }) => {
  const [is_loading, set_is_loading] = useState(true)
  
  // 统一使用占位图片，避免404错误
  const image_src = '/crystal-placeholder.svg'
  
  const handle_image_load = () => {
    set_is_loading(false)
  }
  
  return (
    <div className={`relative ${className || ''}`}>
      {is_loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-gray-400 text-sm">加载中...</div>
        </div>
      )}
      <Image
        src={image_src}
        alt={crystal_name}
        width={800}
        height={800}
        className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${is_loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handle_image_load}
        priority={false}
      />
    </div>
  )
}



// 水晶数据结构
interface Crystal {
  id: string
  name: string
  description: string
  benefits: string[]
  suitable_for: string[]
  image_url: string
}

// 功效分类数据
const crystal_categories = [
  {
    id: 'purification',
    name: '净化平衡',
    description: '清理负能量，增强专注力与思维清晰度',
    icon: '✨',
    crystals: [
      {
        id: 'clear_quartz',
        name: '白水晶',
        description: '被称为"水晶之王"，能量纯净，象征净化、专注与平衡',
        benefits: ['清理负能量', '增强记忆力', '提升思维清晰度', '冥想辅助'],
        suitable_for: ['学生', '脑力工作者', '冥想练习者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'moonstone',
        name: '月光石',
        description: '具有深层的情感治疗功能，能提高情商，安抚情绪波动',
        benefits: ['情感治疗', '提高情商', '安抚情绪', '改善睡眠'],
        suitable_for: ['情绪敏感者', '失眠人群', '女性'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'aquamarine',
        name: '海蓝宝',
        description: '象征沉着与勇敢，能加强表达能力、说服力',
        benefits: ['增强表达能力', '提升说服力', '保护旅行安全', '增强勇气'],
        suitable_for: ['演讲者', '销售人员', '经常出差者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_phantom',
        name: '白幽灵',
        description: '提神醒脑，过滤病气入侵，用于祈福许愿效果最佳',
        benefits: ['提神醒脑', '过滤病气', '祈福许愿', '增强视力'],
        suitable_for: ['祈福者', '视力不佳者', '需要防护者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'fluorite',
        name: '萤石',
        description: '被称为"天才之石"，能增强智力和专注力',
        benefits: ['增强智力', '提升专注力', '净化思维', '促进学习'],
        suitable_for: ['学生', '研究人员', '需要专注者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'clear_quartz_premium',
        name: '透明石英',
        description: '高纯度石英，具有强大的净化和放大能量的作用',
        benefits: ['净化环境', '放大能量', '清理杂念', '增强专注'],
        suitable_for: ['能量工作者', '冥想者', '需要净化者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_agate',
        name: '白玛瑙',
        description: '温和的净化石，能够平衡身心，带来内在平静',
        benefits: ['平衡身心', '带来平静', '稳定情绪', '增强耐心'],
        suitable_for: ['情绪波动者', '需要平静者', '急躁者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_turquoise',
        name: '白松石',
        description: '稀有的白色松石，具有强大的净化和保护功能',
        benefits: ['净化负能量', '保护能量场', '增强直觉', '促进沟通'],
        suitable_for: ['需要保护者', '沟通工作者', '直觉工作者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_coral',
        name: '白珊瑚',
        description: '海洋的馈赠，具有净化和平衡的海洋能量',
        benefits: ['净化心灵', '平衡情绪', '增强直觉', '促进冥想'],
        suitable_for: ['冥想者', '情绪敏感者', '需要平衡者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_pearl',
        name: '白珍珠',
        description: '纯洁的象征，能够净化心灵，带来智慧和宁静',
        benefits: ['净化心灵', '带来智慧', '增强宁静', '提升优雅'],
        suitable_for: ['女性', '需要智慧者', '追求优雅者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'calcite',
        name: '方解石',
        description: '强大的净化石，能够清理负能量，增强学习能力',
        benefits: ['清理负能量', '增强学习', '提升记忆', '促进理解'],
        suitable_for: ['学生', '研究者', '需要学习者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'gypsum',
        name: '石膏',
        description: '温和的净化石，能够带来平静和清晰的思维',
        benefits: ['带来平静', '清晰思维', '缓解焦虑', '促进睡眠'],
        suitable_for: ['焦虑者', '失眠者', '思维混乱者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'dolomite',
        name: '白云石',
        description: '平衡石，能够协调身心能量，带来内在和谐',
        benefits: ['协调能量', '带来和谐', '平衡情绪', '增强稳定'],
        suitable_for: ['能量失衡者', '情绪不稳者', '需要和谐者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_garnet',
        name: '白榴石',
        description: '稀有的白色石榴石，具有净化和保护的双重功能',
        benefits: ['净化保护', '增强活力', '提升免疫', '平衡能量'],
        suitable_for: ['体质虚弱者', '需要保护者', '免疫力低者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_tourmaline',
        name: '白碧玺',
        description: '高频振动的净化石，能够清理深层负能量',
        benefits: ['深层净化', '高频振动', '清理阻塞', '提升频率'],
        suitable_for: ['能量工作者', '灵性修行者', '需要净化者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_topaz',
        name: '白托帕石',
        description: '纯净的能量石，能够增强专注力和思维清晰度',
        benefits: ['增强专注', '思维清晰', '提升理解', '促进学习'],
        suitable_for: ['学生', '脑力工作者', '需要专注者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_zircon',
        name: '白锆石',
        description: '高折射率的净化石，能够反射负能量，保持纯净',
        benefits: ['反射负能量', '保持纯净', '增强光明', '提升正能量'],
        suitable_for: ['负面环境者', '需要光明者', '正能量追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_opal',
        name: '白蛋白石',
        description: '变幻的净化石，能够适应不同的能量需求',
        benefits: ['适应能量', '变幻净化', '增强灵活', '促进适应'],
        suitable_for: ['适应困难者', '变化环境者', '需要灵活者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_jade',
        name: '白翡翠',
        description: '东方的净化圣石，能够带来纯洁和智慧',
        benefits: ['带来纯洁', '增强智慧', '促进和谐', '提升品德'],
        suitable_for: ['追求纯洁者', '智慧追求者', '品德修养者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'iceland_spar',
        name: '冰洲石',
        description: '透明的方解石，具有双折射特性，能够看清事物本质',
        benefits: ['看清本质', '增强洞察', '消除幻象', '提升真实'],
        suitable_for: ['需要洞察者', '迷茫者', '追求真实者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'selenite',
        name: '透石膏',
        description: '天使之石，具有最高频的净化能量',
        benefits: ['最高净化', '连接天使', '清理脉轮', '提升频率'],
        suitable_for: ['灵性工作者', '能量治疗师', '冥想修行者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'clear_fluorite',
        name: '无色萤石',
        description: '纯净的萤石，能够清理思维，增强专注力',
        benefits: ['清理思维', '增强专注', '提升智力', '促进学习'],
        suitable_for: ['学生', '研究人员', '脑力工作者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_chalcedony',
        name: '白玉髓',
        description: '温和的净化石，能够平衡情绪，带来内心平静',
        benefits: ['平衡情绪', '带来平静', '缓解压力', '增强耐心'],
        suitable_for: ['压力大者', '情绪波动者', '需要平静者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'howlite',
        name: '白松石',
        description: '镇静之石，能够缓解焦虑，促进深度睡眠',
        benefits: ['缓解焦虑', '促进睡眠', '平静心灵', '减少愤怒'],
        suitable_for: ['焦虑者', '失眠者', '易怒者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'magnesite',
        name: '菱镁矿',
        description: '深度净化石，能够清理深层的情感创伤',
        benefits: ['深层净化', '清理创伤', '情感疗愈', '内心平静'],
        suitable_for: ['情感创伤者', '需要疗愈者', '深度净化者'],
        image_url: '/crystal-placeholder.svg'
      }
    ]
  },
  {
    id: 'wisdom',
    name: '智慧灵性',
    description: '提升智慧与直觉，增强专注力与创造力',
    icon: '🧠',
    crystals: [
      {
        id: 'amethyst',
        name: '紫水晶',
        description: '与顶轮能量关联，主智慧、灵性与直觉',
        benefits: ['增强专注力', '提升创造力', '改善睡眠', '开发智慧'],
        suitable_for: ['学生', '创意工作者', '研究人员'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'ametrine',
        name: '紫黄晶',
        description: '兼具黄晶与紫晶的功能，象征智慧与财富',
        benefits: ['平衡智慧与财富', '增强决策力', '提升直觉', '调和情感'],
        suitable_for: ['企业家', '投资者', '管理者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'topaz',
        name: '托帕石',
        description: '古希腊人称为"有强大神奇力量的宝石"',
        benefits: ['调节淋巴功能', '增强表达能力', '提升说服力', '改善呼吸'],
        suitable_for: ['公众演讲者', '教师', '咨询师'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'lapis_lazuli',
        name: '青金石',
        description: '冥想之石，能带来冷静与理性，增强智慧',
        benefits: ['增强智慧', '带来冷静', '提升理性', '促进冥想'],
        suitable_for: ['冥想者', '需要冷静者', '智慧追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'super_seven',
        name: '超七',
        description: '含有七种矿物的超级水晶，具有强大的灵性能量',
        benefits: ['提升灵性', '增强直觉', '平衡脉轮', '净化能量'],
        suitable_for: ['灵性修行者', '能量工作者', '冥想练习者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'labradorite',
        name: '拉长石',
        description: '爱情之石，帮助找到灵魂伴侣，增强直觉',
        benefits: ['增强直觉', '寻找真爱', '提升灵性', '保护能量场'],
        suitable_for: ['寻找爱情者', '灵性工作者', '需要保护者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'purple_fluorite',
        name: '紫萤石',
        description: '高频智慧石，能够开启第三眼，增强灵性洞察力',
        benefits: ['开启第三眼', '增强洞察力', '提升智慧', '促进冥想'],
        suitable_for: ['灵性修行者', '冥想者', '智慧追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'purple_agate',
        name: '紫玛瑙',
        description: '温和的智慧石，能够平衡理性与感性，增强判断力',
        benefits: ['平衡理性感性', '增强判断力', '提升智慧', '稳定情绪'],
        suitable_for: ['决策者', '需要平衡者', '情绪波动者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'spodumene',
        name: '紫锂辉石',
        description: '高振动的灵性石，能够连接高维能量，提升意识层次',
        benefits: ['连接高维', '提升意识', '增强灵性', '净化心灵'],
        suitable_for: ['灵性工作者', '能量治疗师', '意识探索者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'charoite',
        name: '紫龙晶',
        description: '稀有的紫色石，能够转化负面思维，提升精神境界',
        benefits: ['转化负面思维', '提升精神境界', '增强智慧', '促进觉醒'],
        suitable_for: ['精神探索者', '负面思维者', '觉醒追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'lepidolite',
        name: '紫云母',
        description: '含锂的平静石，能够缓解焦虑，带来内心平静和智慧',
        benefits: ['缓解焦虑', '带来平静', '增强智慧', '稳定情绪'],
        suitable_for: ['焦虑者', '情绪不稳者', '需要平静者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'sapphire',
        name: '蓝宝石',
        description: '智慧与真理之石，能够增强洞察力和精神力量',
        benefits: ['增强洞察力', '提升精神力量', '寻求真理', '增强智慧'],
        suitable_for: ['智慧追求者', '真理探索者', '精神修行者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'azurite',
        name: '蓝铜矿',
        description: '第三眼脉轮石，能够开启直觉，增强精神感知',
        benefits: ['开启直觉', '增强感知', '提升洞察', '促进冥想'],
        suitable_for: ['直觉工作者', '冥想者', '精神感知者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'celestite',
        name: '天青石',
        description: '天使沟通石，能够连接天使能量，提升灵性觉知',
        benefits: ['连接天使', '提升觉知', '增强灵性', '带来平静'],
        suitable_for: ['天使工作者', '灵性修行者', '觉知追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'kyanite',
        name: '蓝晶石',
        description: '高频振动石，能够对齐脉轮，增强精神沟通',
        benefits: ['对齐脉轮', '增强沟通', '提升频率', '促进冥想'],
        suitable_for: ['能量工作者', '沟通者', '冥想修行者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'iolite',
        name: '堇青石',
        description: '第三眼激活石，能够增强直觉和精神视野',
        benefits: ['激活第三眼', '增强直觉', '扩展视野', '提升洞察'],
        suitable_for: ['直觉工作者', '视野拓展者', '洞察追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'blue_chalcedony',
        name: '蓝玉髓',
        description: '沟通与表达石，能够增强表达能力和精神沟通',
        benefits: ['增强表达', '促进沟通', '提升智慧', '平静心灵'],
        suitable_for: ['沟通工作者', '表达困难者', '需要平静者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'blue_tourmaline',
        name: '蓝碧玺',
        description: '高频智慧石，能够增强精神力量和洞察能力',
        benefits: ['增强精神力量', '提升洞察', '促进智慧', '净化思维'],
        suitable_for: ['精神工作者', '洞察追求者', '智慧修行者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'blue_zircon',
        name: '蓝锆石',
        description: '高折射智慧石，能够反射智慧光芒，增强理解力',
        benefits: ['增强理解力', '反射智慧', '提升学习', '促进思考'],
        suitable_for: ['学习者', '思考者', '理解困难者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'blue_jade',
        name: '蓝翡翠',
        description: '稀有的蓝色翡翠，能够带来宁静智慧和精神平衡',
        benefits: ['带来宁静', '增强智慧', '精神平衡', '促进和谐'],
        suitable_for: ['智慧追求者', '需要平衡者', '和谐寻求者'],
        image_url: '/crystal-placeholder.svg'
      }
    ]
  },
  {
    id: 'emotion',
    name: '情感疗愈',
    description: '促进情感和谐，增强人际关系与同理心',
    icon: '💖',
    crystals: [
      {
        id: 'rose_quartz',
        name: '粉水晶',
        description: '对应心轮，主情感疗愈与人际和谐',
        benefits: ['增强桃花运', '促进感情升温', '缓解焦虑', '增强同理心'],
        suitable_for: ['单身者', '情侣', '社交工作者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'rose_quartz_premium',
        name: '蔷薇石英',
        description: '能量更细腻，常用于修复情感创伤或增强同理心',
        benefits: ['修复情感创伤', '增强同理心', '提升自我价值', '促进宽恕'],
        suitable_for: ['情感受伤者', '心理咨询师', '医护人员'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'rhodonite',
        name: '红纹石',
        description: '疗愈情感创伤，促进亲密关系中的坦诚与包容',
        benefits: ['疗愈情感创伤', '促进坦诚沟通', '增强包容心', '修复关系'],
        suitable_for: ['夫妻', '家庭成员', '团队合作者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'strawberry_quartz',
        name: '草莓晶',
        description: '专注于增强爱情与姻缘的运势，带来甜蜜爱情',
        benefits: ['增强爱情运', '招桃花', '促进姻缘', '增加魅力'],
        suitable_for: ['单身者', '寻找真爱者', '新婚夫妇'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'golden_strawberry',
        name: '金草莓晶',
        description: '拥有强大正面能量，助爱情人缘，也是辟邪化太岁的水晶',
        benefits: ['强化正能量', '助爱情人缘', '辟邪化煞', '化太岁'],
        suitable_for: ['犯太岁者', '需要正能量者', '寻找爱情者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'morganite',
        name: '摩根石',
        description: '温柔的爱情石，能够疗愈心灵创伤，带来内心平静',
        benefits: ['疗愈心灵', '带来平静', '增强爱的能量', '缓解压力'],
        suitable_for: ['心灵受伤者', '压力大者', '寻求平静者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'pink_agate',
        name: '粉玛瑙',
        description: '温和的爱情石，能够增强女性魅力，促进情感和谐',
        benefits: ['增强女性魅力', '促进情感和谐', '稳定情绪', '增强自信'],
        suitable_for: ['女性', '情感不稳者', '缺乏自信者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'pink_tourmaline',
        name: '粉碧玺',
        description: '高频爱情石，能够吸引真爱，疗愈情感创伤',
        benefits: ['吸引真爱', '疗愈创伤', '增强爱的能量', '促进宽恕'],
        suitable_for: ['寻找真爱者', '情感受伤者', '需要宽恕者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'pink_jade',
        name: '粉翡翠',
        description: '稀有的粉色翡翠，能够带来温柔的爱情能量',
        benefits: ['带来温柔', '增强爱情', '促进和谐', '提升优雅'],
        suitable_for: ['追求优雅者', '爱情寻求者', '需要温柔者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'pink_coral',
        name: '粉珊瑚',
        description: '海洋的爱情馈赠，能够带来纯真的爱情能量',
        benefits: ['带来纯真', '增强爱情', '促进情感', '平衡心轮'],
        suitable_for: ['纯真追求者', '爱情寻求者', '心轮失衡者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'pink_pearl',
        name: '粉珍珠',
        description: '温柔的爱情珍珠，能够增强女性的柔美气质',
        benefits: ['增强柔美', '提升气质', '促进爱情', '带来温柔'],
        suitable_for: ['女性', '气质提升者', '爱情追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'ruby',
        name: '红宝石',
        description: '激情与爱情之王，能够点燃内心的激情和勇气',
        benefits: ['点燃激情', '增强勇气', '促进爱情', '提升活力'],
        suitable_for: ['缺乏激情者', '需要勇气者', '爱情追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_agate',
        name: '红玛瑙',
        description: '激情的爱情石，能够增强生命力和情感表达',
        benefits: ['增强生命力', '促进表达', '激发激情', '稳定情绪'],
        suitable_for: ['表达困难者', '缺乏激情者', '情绪不稳者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_tourmaline',
        name: '红碧玺',
        description: '心轮激活石，能够开启心轮，增强爱的能力',
        benefits: ['开启心轮', '增强爱的能力', '促进情感', '疗愈创伤'],
        suitable_for: ['心轮阻塞者', '爱的能力不足者', '情感创伤者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_jade',
        name: '红翡翠',
        description: '稀有的红色翡翠，能够带来强烈的爱情能量',
        benefits: ['强烈爱情能量', '增强魅力', '促进激情', '提升自信'],
        suitable_for: ['爱情追求者', '魅力提升者', '自信不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_coral',
        name: '红珊瑚',
        description: '海洋的激情馈赠，能够激发内在的生命力',
        benefits: ['激发生命力', '增强激情', '促进活力', '稳定情绪'],
        suitable_for: ['生命力不足者', '缺乏激情者', '情绪波动者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_garnet',
        name: '红石榴石',
        description: '忠诚与爱情之石，能够增强忠诚度和情感深度',
        benefits: ['增强忠诚', '深化情感', '促进承诺', '稳定关系'],
        suitable_for: ['情侣', '夫妻', '需要承诺者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_zircon',
        name: '红锆石',
        description: '高折射的爱情石，能够反射爱的光芒，增强魅力',
        benefits: ['反射爱的光芒', '增强魅力', '促进吸引', '提升自信'],
        suitable_for: ['魅力提升者', '吸引力不足者', '自信缺乏者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_chalcedony',
        name: '红玉髓',
        description: '温和的爱情石，能够平衡情感，带来内心和谐',
        benefits: ['平衡情感', '带来和谐', '稳定心情', '增强耐心'],
        suitable_for: ['情感失衡者', '急躁者', '需要和谐者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_mica',
        name: '红云母',
        description: '层次丰富的情感石，能够处理复杂的情感问题',
        benefits: ['处理复杂情感', '层次疗愈', '增强理解', '促进沟通'],
        suitable_for: ['情感复杂者', '沟通困难者', '理解不足者'],
        image_url: '/crystal-placeholder.svg'
      }
    ]
  },
  {
    id: 'wealth',
    name: '财富事业',
    description: '增强财运与事业运势，提升行动力与决策力',
    icon: '💰',
    crystals: [
      {
        id: 'citrine',
        name: '黄水晶',
        description: '能量与太阳神经丛相连，象征财富、自信与行动力',
        benefits: ['增强财运', '提升自信', '增强行动力', '激发潜能'],
        suitable_for: ['商人', '创业者', '销售人员'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_phantom',
        name: '绿幽灵',
        description: '又名异象水晶，有助提高思维，具有招财和高度凝聚财富的力量',
        benefits: ['招正财', '提升思维', '凝聚财富', '事业发展'],
        suitable_for: ['职场人士', '投资者', '企业主'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'rutilated_quartz',
        name: '金发晶',
        description: '能有效加强全身气场，建立勇气与信心，招财效果显著',
        benefits: ['加强气场', '建立勇气', '增强信心', '招财效果'],
        suitable_for: ['领导者', '决策者', '需要勇气者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'titanium_quartz',
        name: '钛晶',
        description: '最稀少的发晶品种，具有最强的招财能量',
        benefits: ['超强招财', '增强气场', '提升领导力', '正偏财皆招'],
        suitable_for: ['企业家', '高管', '投资者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'copper_rutilated',
        name: '铜发晶',
        description: '招财聚财的强力水晶，特别适合生意人佩戴',
        benefits: ['招财聚财', '增强生意运', '提升决策力', '稳定财运'],
        suitable_for: ['生意人', '商人', '创业者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_rutilated',
        name: '绿发晶',
        description: '主正财运，增加事业运，令工作事业顺境',
        benefits: ['主正财运', '增加事业运', '工作顺利', '促进健康'],
         suitable_for: ['上班族', '求职者', '事业发展者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'pyrite',
        name: '黄铁矿',
        description: '被称为"愚人金"，实际上是强力的招财石',
        benefits: ['招财进宝', '增强自信', '提升行动力', '激发创意'],
        suitable_for: ['创业者', '艺术家', '需要自信者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'yellow_agate',
        name: '黄玛瑙',
        description: '温和的财富石，能够稳定财运，增强商业智慧',
        benefits: ['稳定财运', '增强商业智慧', '提升判断力', '促进合作'],
        suitable_for: ['商人', '合作者', '需要判断力者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'yellow_tourmaline',
        name: '黄碧玺',
        description: '高频财富石，能够快速吸引财富和机会',
        benefits: ['快速招财', '吸引机会', '增强魅力', '提升自信'],
        suitable_for: ['销售人员', '机会寻求者', '自信不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'yellow_jade',
        name: '黄翡翠',
        description: '东方财富圣石，能够带来持久的财富和地位',
        benefits: ['持久财富', '提升地位', '增强威望', '促进成功'],
        suitable_for: ['企业家', '政治家', '追求地位者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'yellow_sapphire',
        name: '黄宝石',
        description: '皇室财富石，能够带来权力和财富的双重加持',
        benefits: ['权力财富', '双重加持', '增强权威', '提升地位'],
        suitable_for: ['领导者', '权力追求者', '高管'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'yellow_zircon',
        name: '黄锆石',
        description: '高折射财富石，能够反射财富光芒，增强财运',
        benefits: ['反射财富', '增强财运', '提升光芒', '吸引注意'],
        suitable_for: ['表演者', '公众人物', '需要关注者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'yellow_chalcedony',
        name: '黄玉髓',
        description: '温和的财富石，能够平衡财富欲望，带来理性投资',
        benefits: ['平衡财富欲', '理性投资', '稳定心态', '长期规划'],
        suitable_for: ['投资者', '理财者', '长期规划者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'silver_rutilated',
        name: '银发晶',
        description: '银色财富石，能够带来稳定的财富增长',
        benefits: ['稳定增长', '银色财富', '持续收入', '稳健投资'],
        suitable_for: ['稳健投资者', '长期储蓄者', '保守理财者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'white_rutilated',
        name: '白发晶',
        description: '纯净的财富石，能够净化财富来源，带来正财',
        benefits: ['净化财源', '带来正财', '清理阻碍', '纯净能量'],
        suitable_for: ['正当经营者', '清白生意人', '道德追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_rutilated',
        name: '红发晶',
        description: '激情财富石，能够激发创业激情，带来事业成功',
        benefits: ['激发激情', '创业成功', '事业发展', '增强动力'],
        suitable_for: ['创业者', '事业发展者', '需要动力者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'blue_rutilated',
        name: '蓝发晶',
        description: '智慧财富石，能够通过智慧获得财富，适合知识工作者',
        benefits: ['智慧财富', '知识变现', '增强智力', '理性决策'],
        suitable_for: ['知识工作者', '咨询师', '智力工作者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'rainbow_rutilated',
        name: '彩发晶',
        description: '多元财富石，能够从多个渠道带来财富机会',
        benefits: ['多元财富', '多渠道机会', '综合发展', '全面提升'],
        suitable_for: ['多元发展者', '综合经营者', '全面发展者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_phantom',
        name: '红幽灵',
        description: '激情事业石，能够激发事业激情，带来突破性发展',
        benefits: ['激发事业激情', '突破发展', '增强动力', '克服困难'],
        suitable_for: ['事业瓶颈者', '需要突破者', '激情不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'yellow_phantom',
        name: '黄幽灵',
        description: '智慧财富石，能够通过智慧和策略获得财富',
        benefits: ['智慧财富', '策略成功', '理性投资', '长远规划'],
        suitable_for: ['策略家', '规划者', '智慧投资者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'flower_phantom',
        name: '花幽灵',
        description: '美丽财富石，能够通过美丽和艺术获得财富',
        benefits: ['美丽财富', '艺术成功', '创意变现', '美学价值'],
        suitable_for: ['艺术家', '设计师', '美容行业者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'chrysoberyl',
        name: '金绿宝石',
        description: '稀有的财富石，能够带来意外的财富和机遇',
        benefits: ['意外财富', '稀有机遇', '增强运气', '突破限制'],
        suitable_for: ['运气追求者', '机遇寻找者', '突破者'],
        image_url: '/crystal-placeholder.svg'
      }
    ]
  },
  {
    id: 'protection',
    name: '防护排负',
    description: '清理负能量，提供心理防护与稳定',
    icon: '🛡️',
    crystals: [
      {
        id: 'obsidian',
        name: '黑曜石',
        description: '最常见的防护类水晶，通过吸附负能量起到"精神盾牌"作用',
         benefits: ['吸附负能量', '精神防护', '增强安全感', '稳定情绪'],
        suitable_for: ['敏感体质者', '负面环境工作者', '需要防护者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_tourmaline',
        name: '黑碧玺',
        description: '更侧重能量转化，可将负面情绪转化为行动力',
        benefits: ['转化负能量', '增强行动力', '缓解压力', '提升韧性'],
        suitable_for: ['高压职场人群', '情绪管理者', '压力大者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'tigers_eye',
        name: '虎眼石',
        description: '被印度人视为最尊贵的圣石，能激起信心、勇气与贯彻执行能力',
        benefits: ['激发信心', '增强勇气', '提升执行力', '辟邪护身'],
        suitable_for: ['胆小者', '缺乏自信者', '需要勇气者'],
        image_url: '/crystal-placeholder.svg'
       },
       {
        id: 'black_rutilated',
        name: '黑发晶',
        description: '领袖石，增加领袖魅力，排除负能量，防止不良磁场干扰',
        benefits: ['增强领袖魅力', '排除负能量', '防止干扰', '增强向心力'],
        suitable_for: ['领导者', '管理者', '需要权威者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'hematite',
        name: '赤铁矿',
        description: '强力的接地石，能够稳定情绪，增强意志力',
        benefits: ['稳定情绪', '增强意志力', '接地能量', '提升专注'],
        suitable_for: ['情绪不稳者', '需要专注者', '意志薄弱者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'apache_tear',
        name: '阿帕契之泪',
        description: '特殊的黑曜石，能够疗愈悲伤，带来希望',
        benefits: ['疗愈悲伤', '带来希望', '释放痛苦', '情感保护'],
        suitable_for: ['失恋者', '丧亲者', '情感受伤者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_agate',
        name: '黑玛瑙',
        description: '强力的防护石，能够吸收负能量，提供稳定的保护',
        benefits: ['吸收负能量', '稳定保护', '增强安全感', '平衡情绪'],
        suitable_for: ['负面环境者', '需要稳定者', '情绪波动者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_quartz',
        name: '黑水晶',
        description: '深层防护石，能够清理深层负能量，提供强力保护',
        benefits: ['深层防护', '清理负能量', '强力保护', '稳定能量场'],
        suitable_for: ['深度负面者', '能量工作者', '需要强力保护者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_jade',
        name: '黑翡翠',
        description: '东方防护圣石，能够辟邪护身，带来平安',
        benefits: ['辟邪护身', '带来平安', '稳定心神', '增强正气'],
        suitable_for: ['需要辟邪者', '平安追求者', '正气不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_coral',
        name: '黑珊瑚',
        description: '海洋的防护馈赠，能够抵御负面能量，保护心灵',
        benefits: ['抵御负能量', '保护心灵', '稳定情绪', '增强韧性'],
        suitable_for: ['心灵脆弱者', '情绪敏感者', '需要韧性者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_pearl',
        name: '黑珍珠',
        description: '神秘的防护珠宝，能够保护免受负面影响',
        benefits: ['神秘防护', '免受负面影响', '增强神秘感', '提升魅力'],
        suitable_for: ['神秘追求者', '魅力提升者', '防护需求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'magnetite',
        name: '磁铁矿',
        description: '天然磁石，能够吸引正能量，排斥负能量',
        benefits: ['吸引正能量', '排斥负能量', '平衡磁场', '增强活力'],
        suitable_for: ['磁场敏感者', '能量失衡者', '活力不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_mica',
        name: '黑云母',
        description: '层次防护石，能够层层过滤负能量，提供全面保护',
        benefits: ['层次防护', '过滤负能量', '全面保护', '稳定能量'],
        suitable_for: ['多层防护需求者', '复杂环境者', '全面保护者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_garnet',
        name: '黑榴石',
        description: '稀有的黑色石榴石，具有强大的防护和净化功能',
        benefits: ['强大防护', '深度净化', '增强意志', '稳定情绪'],
        suitable_for: ['意志薄弱者', '需要净化者', '情绪不稳者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_zircon',
        name: '黑锆石',
        description: '高折射防护石，能够反射负能量，保持纯净',
        benefits: ['反射负能量', '保持纯净', '增强防护', '稳定心神'],
        suitable_for: ['负面环境者', '纯净追求者', '心神不稳者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_spinel',
        name: '黑尖晶石',
        description: '强力的防护宝石，能够抵御强烈的负面攻击',
        benefits: ['抵御负面攻击', '强力防护', '增强勇气', '稳定意志'],
        suitable_for: ['面临攻击者', '需要勇气者', '意志不坚者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_diamond',
        name: '黑钻石',
        description: '最强的防护宝石，具有无与伦比的防护能力',
        benefits: ['最强防护', '无敌能力', '增强权威', '稳定地位'],
        suitable_for: ['高风险者', '权威人士', '地位不稳者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'jet',
        name: '煤玉',
        description: '古老的防护石，能够吸收负能量，带来平静',
        benefits: ['吸收负能量', '带来平静', '古老智慧', '稳定情绪'],
        suitable_for: ['古老智慧追求者', '平静需求者', '情绪波动者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_turquoise',
        name: '黑松石',
        description: '稀有的黑色松石，具有强大的防护和沟通功能',
        benefits: ['强大防护', '促进沟通', '增强直觉', '稳定关系'],
        suitable_for: ['沟通困难者', '关系不稳者', '直觉不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'black_chalcedony',
        name: '黑玉髓',
        description: '温和的防护石，能够平衡负面情绪，带来内心平静',
        benefits: ['平衡负面情绪', '带来平静', '温和防护', '稳定心态'],
        suitable_for: ['负面情绪者', '心态不稳者', '需要平静者'],
        image_url: '/crystal-placeholder.svg'
      }
    ]
  },
  {
    id: 'health',
    name: '健康活力',
    description: '改善体质，增强活力与免疫力',
    icon: '🌿',
    crystals: [
      {
        id: 'smoky_quartz',
        name: '茶水晶',
        description: '稳定情绪，增强耐性，适合压力大或缺乏安全感者',
        benefits: ['稳定情绪', '增强耐性', '缓解压力', '提升安全感'],
        suitable_for: ['压力大者', '焦虑者', '缺乏安全感者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'garnet',
        name: '石榴石',
        description: '对血液循环与荷尔蒙分泌都有一定的刺激作用',
         benefits: ['促进血液循环', '调节荷尔蒙', '增强生殖健康', '提升活力'],
         suitable_for: ['女性', '体质虚弱者', '血液循环不良者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'prehnite',
        name: '葡萄石',
        description: '能够促进血液循环，美容养颜，非常适合女性佩戴',
         benefits: ['促进血液循环', '美容养颜', '增强免疫力', '心肺功能'],
         suitable_for: ['女性', '注重美容者', '免疫力低下者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'red_jasper',
        name: '红碧玺',
        description: '调节血液循环，增强活力，特别适合女性',
         benefits: ['调节血液循环', '增强活力', '改善体质', '提升免疫'],
        suitable_for: ['女性', '体弱者', '需要活力者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'peridot',
        name: '橄榄石',
        description: '招正财，提升工作和事业运，同时有益健康',
        benefits: ['招正财', '提升事业运', '改善健康', '增强活力'],
        suitable_for: ['职场人士', '健康关注者', '事业发展者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'aventurine',
        name: '东陵玉',
        description: '绿色的幸运石，能够带来好运和健康',
        benefits: ['带来好运', '促进健康', '平衡情绪', '增强信心'],
        suitable_for: ['需要好运者', '健康关注者', '情绪不稳者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'carnelian',
        name: '红玛瑙',
        description: '增强活力和勇气，改善血液循环',
        benefits: ['增强活力', '提升勇气', '改善循环', '激发创意'],
        suitable_for: ['缺乏活力者', '创意工作者', '需要勇气者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'smoky_crystal',
        name: '烟晶',
        description: '深层的茶水晶，能够深度缓解压力，增强身体耐力',
        benefits: ['深度缓解压力', '增强耐力', '稳定能量', '改善睡眠'],
        suitable_for: ['高压工作者', '运动员', '失眠者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'tea_crystal',
        name: '茶晶',
        description: '温和的健康石，能够平衡身心，增强体质',
        benefits: ['平衡身心', '增强体质', '稳定情绪', '促进康复'],
        suitable_for: ['体质虚弱者', '康复期患者', '情绪不稳者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_quartz',
        name: '绿水晶',
        description: '心脏脉轮的治疗石，能够促进心脏健康，增强生命力',
        benefits: ['促进心脏健康', '增强生命力', '平衡情绪', '促进愈合'],
        suitable_for: ['心脏问题者', '生命力不足者', '需要愈合者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_agate',
        name: '绿玛瑙',
        description: '自然的健康石，能够增强免疫力，促进身体平衡',
        benefits: ['增强免疫力', '促进平衡', '稳定健康', '增强活力'],
        suitable_for: ['免疫力低者', '健康关注者', '活力不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_tourmaline',
        name: '绿碧玺',
        description: '心脏的治疗师，能够修复心脏能量，促进血液循环',
        benefits: ['修复心脏能量', '促进血液循环', '增强活力', '情感治疗'],
        suitable_for: ['心脏疾病者', '血液循环不良者', '情感创伤者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_jade',
        name: '绿翡翠',
        description: '东方的健康圣石，能够带来长寿和健康',
        benefits: ['带来长寿', '促进健康', '平衡能量', '增强智慧'],
        suitable_for: ['长寿追求者', '健康关注者', '智慧追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'emerald',
        name: '绿宝石',
        description: '宝石之王，具有强大的治疗能量，促进整体健康',
        benefits: ['强大治疗能量', '促进整体健康', '增强智慧', '带来繁荣'],
        suitable_for: ['重病患者', '健康追求者', '智慧追求者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'turquoise',
        name: '绿松石',
        description: '古老的治疗石，能够净化身体，增强免疫系统',
        benefits: ['净化身体', '增强免疫', '促进沟通', '保护健康'],
        suitable_for: ['免疫力低者', '沟通工作者', '健康关注者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_chalcedony',
        name: '绿玉髓',
        description: '温和的治疗石，能够平衡身心，促进内在和谐',
        benefits: ['平衡身心', '促进和谐', '缓解压力', '增强耐心'],
        suitable_for: ['压力大者', '需要和谐者', '急躁者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_mica',
        name: '绿云母',
        description: '层次治疗石，能够层层修复身体能量，促进康复',
        benefits: ['层层修复', '促进康复', '稳定能量', '增强耐力'],
        suitable_for: ['康复期患者', '能量失衡者', '耐力不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_garnet',
        name: '绿榴石',
        description: '稀有的绿色石榴石，具有强大的再生和治疗功能',
        benefits: ['强大再生', '治疗功能', '增强活力', '促进成长'],
        suitable_for: ['需要再生者', '成长期青少年', '活力不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_zircon',
        name: '绿锆石',
        description: '高频治疗石，能够快速修复身体能量，促进愈合',
        benefits: ['快速修复', '促进愈合', '高频治疗', '增强活力'],
        suitable_for: ['急需愈合者', '手术恢复者', '活力不足者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'green_spinel',
        name: '绿尖晶石',
        description: '强力的健康宝石，能够增强体质，提升免疫力',
        benefits: ['增强体质', '提升免疫', '强化身体', '增强耐力'],
        suitable_for: ['体质虚弱者', '免疫力低者', '运动员'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'malachite',
        name: '孔雀石',
        description: '强力的解毒石，能够清除体内毒素，促进肝脏健康',
        benefits: ['清除毒素', '促进肝脏健康', '解毒功能', '净化血液'],
        suitable_for: ['肝脏问题者', '需要解毒者', '血液净化者'],
        image_url: '/crystal-placeholder.svg'
      },
      {
        id: 'beryl',
        name: '绿柱石',
        description: '眼部治疗师，能够改善视力，缓解眼部疲劳',
        benefits: ['改善视力', '缓解眼疲劳', '保护眼部', '增强专注'],
        suitable_for: ['视力问题者', '电脑工作者', '学生'],
        image_url: '/crystal-placeholder.svg'
      }
    ]
  }
]

// 推荐选项数据
const recommendation_options = [
  { id: 'study_work', label: '学习工作', description: '提升专注力和思维清晰度' },
  { id: 'emotional_relationship', label: '情感关系', description: '改善人际关系和情感和谐' },
  { id: 'wealth_career', label: '财富事业', description: '增强财运和事业运势' },
  { id: 'health_wellness', label: '健康养生', description: '改善体质和增强活力' },
  { id: 'mental_protection', label: '心理防护', description: '清理负能量和心理防护' },
  { id: 'spiritual_growth', label: '灵性成长', description: '提升智慧和灵性觉知' }
]

export default function CrystalMatchingPage() {
  const [selected_category, set_selected_category] = useState<string>('purification')
  const [selected_crystal, set_selected_crystal] = useState<Crystal | null>(null)
  const [selected_recommendations, set_selected_recommendations] = useState<string[]>([])
  const [show_recommendations, set_show_recommendations] = useState(false)



  const handle_recommendation_toggle = (option_id: string) => {
    set_selected_recommendations(prev => 
      prev.includes(option_id) 
        ? prev.filter(id => id !== option_id)
        : [...prev, option_id]
    )
  }

  const get_recommended_crystals = () => {
    const mapping: { [key: string]: string[] } = {
      'study_work': ['clear_quartz', 'amethyst', 'fluorite', 'lapis_lazuli', 'white_phantom', 'clear_quartz_premium'],
      'emotional_relationship': ['rose_quartz', 'strawberry_quartz', 'rhodonite', 'rose_quartz_premium', 'pink_tourmaline', 'pink_opal'],
      'wealth_career': ['citrine', 'green_phantom', 'titanium_quartz', 'copper_rutilated', 'green_rutilated', 'pyrite'],
      'health_wellness': ['smoky_quartz', 'garnet', 'prehnite', 'red_jasper', 'peridot', 'aventurine'],
      'mental_protection': ['obsidian', 'black_tourmaline', 'tiger_eye', 'black_rutilated', 'smoky_quartz', 'black_obsidian'],
      'spiritual_growth': ['amethyst', 'super_seven', 'labradorite', 'lapis_lazuli', 'purple_fluorite', 'ametrine']
    }

    const recommended_ids = selected_recommendations.flatMap(option => mapping[option] || [])
    const unique_ids = [...new Set(recommended_ids)]
    
    return crystal_categories.flatMap(category => category.crystals)
      .filter(crystal => unique_ids.includes(crystal.id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 页面标题区域 */}
      <div className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 to-amber-900/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
               水晶能量匹配
             </h1>
             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
               探索天然水晶的神奇能量，精选100多种水晶品类，
               根据您的需求找到最适合的水晶伴侣
             </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 智能推荐区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">
              智能水晶推荐
            </h2>
            <p className="text-gray-600 text-center mb-8">
              选择您的需求，我们将为您推荐最适合的水晶
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {recommendation_options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handle_recommendation_toggle(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selected_recommendations.includes(option.id)
                      ? 'border-amber-400 bg-amber-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="font-medium text-gray-900 mb-2">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </motion.button>
              ))}
            </div>

            {selected_recommendations.length > 0 && (
              <motion.button
                onClick={() => set_show_recommendations(!show_recommendations)}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-3 px-6 rounded-xl font-medium hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {show_recommendations ? '隐藏推荐结果' : '查看推荐水晶'}
              </motion.button>
            )}

            {/* 推荐结果 */}
            {show_recommendations && selected_recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-6">为您推荐的水晶</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {get_recommended_crystals().map((crystal) => (
                    <motion.div
                      key={crystal.id}
                      onClick={() => set_selected_crystal(crystal)}
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative h-48">
                        <CrystalImage
                          crystal_name={crystal.name}
                          className="object-cover"
                        />

                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{crystal.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{crystal.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* 分类浏览区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            按功效分类浏览
          </h2>
          
          {/* 分类标签 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {crystal_categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => set_selected_category(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selected_category === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* 选中分类的水晶展示 */}
          {crystal_categories.map((category) => (
            category.id === selected_category && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-gray-900 mb-4">
                    <span className="mr-3">{category.icon}</span>
                    {category.name}
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.crystals.map((crystal) => (
                    <motion.div
                      key={crystal.id}
                      onClick={() => set_selected_crystal(crystal)}
                      className="bg-gray-50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="relative h-64">
                        <CrystalImage
                          crystal_name={crystal.name}
                          className="w-full h-full object-cover"
                        />

                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-medium text-gray-900 mb-3">{crystal.name}</h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">{crystal.description}</p>
                        
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">主要功效</h5>
                          <div className="flex flex-wrap gap-2">
                            {crystal.benefits.slice(0, 3).map((benefit, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">适合人群</h5>
                          <p className="text-sm text-gray-600">
                            {crystal.suitable_for.join('、')}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </motion.div>
      </div>

      {/* 水晶详情弹窗 */}
      {selected_crystal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => set_selected_crystal(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80">
              <CrystalImage
                crystal_name={selected_crystal.name}
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <button
                onClick={() => set_selected_crystal(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-600 hover:bg-opacity-100 transition-all duration-300"
              >
                ✕
              </button>

            </div>
            
            <div className="p-8">
              <h3 className="text-3xl font-light text-gray-900 mb-4">{selected_crystal.name}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{selected_crystal.description}</p>
              
              <div className="mb-6">
                <h4 className="text-xl font-medium text-gray-900 mb-3">主要功效</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selected_crystal.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">适合人群</h4>
                <div className="flex flex-wrap gap-2">
                  {selected_crystal.suitable_for.map((group, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}