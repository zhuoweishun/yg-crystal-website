'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// 精选作品数据 - 基于用户上传的75张图片
const featured_works = [
  "青璃秘符",
  "雾隐灵串", 
  "银璃絮语",
  "金芒捕梦网",
  "金缕矿景",
  "金缕序",
  "金缕巡",
  "金紫轮渡",
  "金璃锁昼",
  "金璃幻方",
  "金珀星芒",
  "金丝筏",
  "金丝漫舞",
  "赤金絮语",
  "虎瞳秘语",
  "薰衣草星轨",
  "蓝珀流萤",
  "芙蓉石的温柔",
  "色空",
  "能量星芒环",
  "翠影",
  "羽光",
  "紫璃秘事",
  "紫璃幻光",
  "紫晶结界",
  "素影蓝心",
  "粉璃梦影",
  "粉珀银辉",
  "竹露",
  "璃光花信",
  "珀叶",
  "灵金缕",
  "灵海",
  "灵丝锁晶舟",
  "火水和鸣",
  "清月婉华",
  "海岩",
  "浅粉绮思",
  "浅海吟",
  "浅梦听澜",
  "橘子海",
  "森系财芒",
  "森珀织星",
  "月光纺车",
  "晶鲤",
  "晶语皇冠",
  "晶木契",
  "星骸",
  "星锚",
  "星砂海",
  "星尘象限",
  "日光锦囊",
  "日光狩",
  "日光漫溯",
  "日光核",
  "彩璃环游",
  "彩珀星途",
  "异色光年",
  "幽金脉",
  "幽灵星云",
  "幻色水晶河",
  "幻空灵雨",
  "冰璃藏金",
  "冰棱串",
  "光蝶邮差",
  "光茧",
  "光的马赛克",
  "光棱",
  "光屿",
  "光尘",
  "五行绘",
  "云絮糖霜",
  "万境",
  "七脉幻彩",
  "七幻晶"
];

// 将文件名转换为产品数据
const crystal_products = featured_works.map((name, index) => ({
  id: index + 1,
  name: name,
  image_url: `/featured-works/${name}.jpg`
}));

// 产品卡片组件
const ProductCard = ({ product, index }: { product: typeof crystal_products[0], index: number }) => {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500">
        {/* 产品图片 - 1:1 比例 */}
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* 悬停时的金色遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* 产品名称 */}
        <div className="p-4 lg:p-6">
          <h3 className="font-serif text-lg lg:text-xl font-light text-gray-800 text-center tracking-wide">
            {product.name}
          </h3>
          
          {/* 金色装饰线 */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Products() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero区域 - 页面标题 */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-thin tracking-wider mb-8 text-gray-800">
              精选作品
            </h1>
            
            {/* 金色分割线 */}
            <div className="w-20 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-yellow-600 to-transparent" />
            
            <motion.p 
              className="font-sans text-xl lg:text-2xl font-light leading-relaxed text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              每一件作品都承载着自然的力量与匠心的温度
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 产品网格区域 */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4">
          {/* 作品统计 */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="font-sans text-lg text-gray-600">
              共 <span className="font-serif text-xl text-yellow-600 font-medium">{crystal_products.length}</span> 件精选作品
            </p>
          </motion.div>

          {/* 产品网格 - 响应式布局：手机2列，平板3列，桌面4列 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {crystal_products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 底部装饰区域 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <p className="font-serif text-2xl lg:text-3xl font-light text-gray-800 mb-6">
              寻找专属于您的水晶伴侣
            </p>
            
            <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-6" />
            
            <p className="font-sans text-lg font-light text-gray-600 leading-relaxed">
              每一块水晶都有其独特的能量与美感<br />
              期待与您分享这份来自大自然的珍贵礼物
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}