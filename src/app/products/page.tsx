'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// 水晶手串产品数据 - 等待上传真实图片
const crystal_products = [
  {
    id: 1,
    name: "紫水晶手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 2,
    name: "白水晶手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 3,
    name: "粉水晶手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 4,
    name: "黑曜石手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 5,
    name: "青金石手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 6,
    name: "月光石手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 7,
    name: "虎眼石手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 8,
    name: "玛瑙手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 9,
    name: "碧玺手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 10,
    name: "海蓝宝手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 11,
    name: "石榴石手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 12,
    name: "拉长石手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 13,
    name: "绿幽灵手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 14,
    name: "黄水晶手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 15,
    name: "茶水晶手串",
    image_url: "/crystal-placeholder.svg"
  },
  {
    id: 16,
    name: "红玛瑙手串",
    image_url: "/crystal-placeholder.svg"
  }
];

// 产品卡片组件
const ProductCard = ({ product, index }: { product: typeof crystal_products[0], index: number }) => {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500">
        {/* 产品图片 */}
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
        <div className="p-6">
          <h3 className="font-serif text-xl lg:text-2xl font-light text-gray-800 text-center tracking-wide">
            {product.name}
          </h3>
          
          {/* 金色装饰线 */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          {/* 产品网格 - 响应式布局 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
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