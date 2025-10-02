'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles, Heart, Eye, Zap, Search, MessageCircle, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { scrollY } = useScroll()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // 视差滚动效果 - 为5个屏幕添加变量
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])
  const y2 = useTransform(scrollY, [1000, 2000], [0, -200])
  const y3 = useTransform(scrollY, [2000, 3000], [0, -200])
  const y4 = useTransform(scrollY, [3000, 4000], [0, -200])
  const y5 = useTransform(scrollY, [4000, 5000], [0, -200])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className="relative">
      {/* 第一屏：品牌展示 */}
      <motion.section 
        className="full_screen_section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* 背景图片 */}
        <motion.img
          src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist_crystal_studio_workspace_with_natural_light_and_elegant_crystals_arranged_on_white_marble_surface&image_size=landscape_16_9"
          alt="爻光晶舍工作室"
          className="hero_background"
          style={{ y: y1 }}
        />
        
        {/* 渐变遮罩 */}
        <div className="hero_overlay" />
        
        {/* 内容 */}
        <motion.div 
          className="hero_content cursor-pointer"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          onClick={() => router.push('/about')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.h1 
            className="hero_title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            爻光晶舍
          </motion.h1>
          
          <motion.p 
            className="hero_subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            设计师水晶品牌
          </motion.p>
          
          <motion.p 
            className="hero_description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            每一块水晶都承载着独特的设计理念<br />
            在光影交错中诠释自然与艺术的完美融合
          </motion.p>
          
          <motion.p 
            className="text-white/60 text-sm mt-8 font-light tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            点击了解品牌故事
          </motion.p>
        </motion.div>
        
        {/* 滚动指示器 */}
        <motion.div 
          className="scroll_indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.section>

      {/* 第二屏：精选作品 */}
      <motion.section 
        className="full_screen_section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        {/* 背景图片 */}
        <motion.img
          src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury_crystal_jewelry_collection_display_on_white_background_with_soft_lighting_and_geometric_arrangement&image_size=landscape_16_9"
          alt="精选水晶作品"
          className="hero_background"
          style={{ y: y2 }}
        />
        
        {/* 渐变遮罩 */}
        <div className="hero_overlay" />
        
        {/* 内容 */}
        <motion.div 
          className="hero_content cursor-pointer"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          onClick={() => router.push('/products')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Sparkles size={48} className="text-white opacity-80" />
          </motion.div>
          
          <motion.h2 
            className="hero_title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
          >
            精选作品
          </motion.h2>
          
          <motion.p 
            className="hero_subtitle"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            viewport={{ once: true }}
          >
            匠心独运的设计美学
          </motion.p>
          
          <motion.p 
            className="hero_description"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
          >
            从原石的选择到最终的呈现<br />
            每一个细节都体现着对美的极致追求
          </motion.p>
          
          <motion.p 
            className="text-white/60 text-sm mt-8 font-light tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            viewport={{ once: true }}
          >
            点击查看精选作品
          </motion.p>
        </motion.div>
        
        {/* 滚动指示器 */}
        <motion.div 
          className="scroll_indicator"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
          viewport={{ once: true }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.section>

      {/* 第三屏：能量测试 */}
      <motion.section 
        className="full_screen_section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        {/* 背景图片 */}
        <motion.img
          src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mystical_crystal_energy_testing_setup_with_glowing_crystals_and_meditation_space_ethereal_lighting&image_size=landscape_16_9"
          alt="能量测试"
          className="hero_background"
          style={{ y: y3 }}
        />
        
        {/* 渐变遮罩 */}
        <div className="hero_overlay" />
        
        {/* 内容 */}
        <motion.div 
          className="hero_content cursor-pointer"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          onClick={() => router.push('/energy-test')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Zap size={48} className="text-white opacity-80" />
          </motion.div>
          
          <motion.h2 
            className="hero_title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
          >
            能量测试
          </motion.h2>
          
          <motion.p 
            className="hero_subtitle"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            viewport={{ once: true }}
          >
            科学验证水晶功效
          </motion.p>
          
          <motion.p 
            className="hero_description"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
          >
            通过平衡力和柔韧性测试<br />
            亲身体验水晶的真实能量<br />
            让功效看得见、摸得着
          </motion.p>
          
          <motion.p 
            className="text-white/60 text-sm mt-8 font-light tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            viewport={{ once: true }}
          >
            点击了解测试方法
          </motion.p>
        </motion.div>
        
        {/* 滚动指示器 */}
        <motion.div 
          className="scroll_indicator"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
          viewport={{ once: true }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.section>

      {/* 第四屏：水晶匹配 */}
      <motion.section 
        className="full_screen_section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        {/* 背景图片 */}
        <motion.img
          src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=crystal_matching_consultation_with_various_crystals_arranged_in_perfect_harmony_soft_natural_lighting&image_size=landscape_16_9"
          alt="水晶匹配"
          className="hero_background"
          style={{ y: y4 }}
        />
        
        {/* 渐变遮罩 */}
        <div className="hero_overlay" />
        
        {/* 内容 */}
        <motion.div 
          className="hero_content cursor-pointer"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          onClick={() => router.push('/crystal-matching')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Search size={48} className="text-white opacity-80" />
          </motion.div>
          
          <motion.h2 
            className="hero_title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
          >
            水晶匹配
          </motion.h2>
          
          <motion.p 
            className="hero_subtitle"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            viewport={{ once: true }}
          >
            专业的个性化推荐
          </motion.p>
          
          <motion.p 
            className="hero_description"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
          >
            基于您的需求和能量特质<br />
            为您精心挑选最合适的水晶<br />
            让每一次选择都充满意义
          </motion.p>
          
          <motion.p 
            className="text-white/60 text-sm mt-8 font-light tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            viewport={{ once: true }}
          >
            点击开始水晶匹配
          </motion.p>
        </motion.div>
        
        {/* 滚动指示器 */}
        <motion.div 
          className="scroll_indicator"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
          viewport={{ once: true }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.section>

      {/* 第五屏：联系水晶定制 */}
      <motion.section 
        className="full_screen_section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        {/* 背景图片 */}
        <motion.img
          src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury_crystal_customization_workshop_with_designer_tools_and_beautiful_custom_crystal_pieces&image_size=landscape_16_9"
          alt="联系水晶定制"
          className="hero_background"
          style={{ y: y5 }}
        />
        
        {/* 渐变遮罩 */}
        <div className="hero_overlay" />
        
        {/* 内容 */}
        <motion.div 
          className="hero_content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center space-x-4 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MessageCircle size={40} className="text-white opacity-80" />
            <Phone size={40} className="text-white opacity-80" />
          </motion.div>
          
          <motion.h2 
            className="hero_title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
          >
            联系水晶定制
          </motion.h2>
          
          <motion.p 
            className="hero_subtitle"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            viewport={{ once: true }}
          >
            专属于您的独特设计
          </motion.p>
          
          <motion.p 
            className="hero_description"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
          >
            与设计师一对一沟通<br />
            打造专属于您的水晶作品<br />
            让每一次作品都承载着您的故事
          </motion.p>
        </motion.div>
        
        {/* 底部导航提示 */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-light tracking-wide">开始您的水晶之旅</p>
        </motion.div>
      </motion.section>
    </div>
  )
}