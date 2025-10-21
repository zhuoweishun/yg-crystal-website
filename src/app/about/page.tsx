'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-white">
      {/* 1. 品牌愿景区 - 简洁Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 
            className="font-serif text-6xl sm:text-7xl lg:text-8xl font-thin tracking-wider mb-8 text-gray-800"
          >
            爻光晶舍
          </h1>
          
          <div 
            className="w-20 h-px mx-auto mb-8 bg-gold-500"
          />
          
          <motion.p 
            className="font-sans text-xl lg:text-2xl font-light leading-relaxed text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            以匠心致敬自然之美，用热爱雕琢永恒艺术
          </motion.p>
        </motion.div>
      </section>

      {/* 2. 主理人介绍区 - 汪成冲的真实故事 */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 
                  className="font-serif text-4xl lg:text-5xl font-thin mb-6 text-gray-800"
                >
                  主理人
                </h2>
                <div 
                  className="w-16 h-px mb-8 bg-gold-500"
                />
              </div>
              
              <div className="space-y-6 font-sans text-lg leading-relaxed font-light text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">汪成冲</span>，爻光晶舍创始人兼设计师。
                </p>
                <p>
                  曾在地产与金融领域担任高管多年，拥有丰富的商业管理经验。然而，内心对美的追求和对水晶艺术的深深热爱，让她毅然选择了一条全新的道路。
                </p>
                <p>
                  从商业精英到水晶工艺师，这不仅是职业的转换，更是对内心声音的回应。她将商业思维的严谨与艺术创作的感性完美融合，为每一件作品注入独特的灵魂。
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/crystal-placeholder.svg"
                  alt="主理人汪成冲"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 金色分割线 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* 3. 设计理念区 - 热爱驱动的工艺 */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 
              className="font-serif text-4xl lg:text-5xl font-thin mb-6 text-gray-800"
            >
              设计理念
            </h2>
            <div 
              className="w-16 h-px mx-auto mb-8 bg-gold-500"
            />
            <p 
              className="font-sans text-xl font-light max-w-3xl mx-auto text-gray-600"
            >
              每一块水晶都有其独特的故事，我的使命是发现并诠释这些故事
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {[
              {
                title: "自然之美",
                content: "水晶是大自然亿万年的馈赠，每一块都承载着时光的印记。我尊重每一块水晶的天然形态，在设计中保留其最原始的美感，让自然的力量成为作品的灵魂。"
              },
              {
                title: "匠心独运",
                content: "从商业管理到艺术创作，我将严谨的思维方式融入到每一个设计细节中。每一刀雕琢都经过深思熟虑，追求的不仅是视觉的美感，更是内在的和谐统一。"
              },
              {
                title: "情感共鸣",
                content: "真正的艺术品应该能够触动人心。我希望每一件作品都能与佩戴者产生情感连接，成为表达个性和品味的载体，陪伴人生重要时刻。"
              },
              {
                title: "永恒价值",
                content: "优质的水晶和精湛的工艺是作品永恒价值的基础。我坚持选用最优质的材料，运用传统与现代相结合的技法，确保每一件作品都能经受时间的考验。"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 
                  className="font-serif text-2xl lg:text-3xl font-light text-gray-800"
                >
                  {item.title}
                </h3>
                <div 
                  className="w-10 h-px bg-gold-500"
                />
                <p 
                  className="font-sans text-base leading-relaxed font-light text-gray-600"
                >
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 工艺流程区 - 亲自挑选到制作 */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 
              className="font-serif text-4xl lg:text-5xl font-thin mb-6 text-gray-800"
            >
              工艺流程
            </h2>
            <div 
              className="w-16 h-px mx-auto mb-8 bg-gold-500"
            />
            <p 
              className="font-sans text-xl font-light max-w-3xl mx-auto text-gray-600"
            >
              从原石挑选到成品诞生，每一个环节都倾注我的心血与专注
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "精选原石",
                desc: "亲自前往产地，用专业眼光和直觉感受，挑选每一块具有独特能量和美感的天然水晶原石。",
                image: "/crystal-placeholder.svg"
              },
              {
                step: "02",
                title: "创意设计",
                desc: "根据每块水晶的天然特性，构思独特的设计方案，让设计与材料完美融合，展现最佳效果。",
                image: "/crystal-placeholder.svg"
              },
              {
                step: "03",
                title: "精工制作",
                desc: "运用传统手工技艺结合现代工具，亲自完成每一道工序，确保作品达到最高品质标准。",
                image: "/crystal-placeholder.svg"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-8">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold-500 text-white rounded-full flex items-center justify-center font-serif text-lg font-light">
                    {item.step}
                  </div>
                </div>
                <h3 
                  className="font-serif text-xl lg:text-2xl font-light mb-4 text-gray-800"
                >
                  {item.title}
                </h3>
                <p 
                  className="font-sans text-base leading-relaxed font-light text-gray-600"
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 金色分割线 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* 5. 联系方式区 */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 
              className="font-serif text-4xl lg:text-5xl font-thin text-gray-800"
            >
              联系我们
            </h2>
            
            <div 
              className="w-16 h-px mx-auto bg-gold-500"
            />
            
            <p 
              className="font-sans text-xl font-light max-w-2xl mx-auto text-gray-600"
            >
              期待与您分享水晶艺术的美好，为您定制专属的艺术珍品
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="space-y-3">
                <h3 
                  className="font-serif text-lg font-light text-gray-800"
                >
                  工作室地址
                </h3>
                <p 
                  className="font-sans font-light text-gray-600"
                >
                  北京市朝阳区<br />
                  爻光晶舍工作室
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 
                  className="font-serif text-lg font-light text-gray-800"
                >
                  联系方式
                </h3>
                <p 
                  className="font-sans font-light text-gray-600"
                >
                  微信：ygcrystal<br />
                  邮箱：contact@ygcrystal.com
                </p>
              </div>
            </div>
            
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p 
                className="font-sans text-sm font-light text-gray-500"
              >
                每一件作品都是独一无二的艺术品，欢迎预约参观工作室
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}