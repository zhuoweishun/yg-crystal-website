'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EnergyTestPage() {
  const test_methods = [
    {
      id: 1,
      title: "平衡力测试",
      subtitle: "单脚平衡站立测试",
      description: "通过单脚平衡站立，让他人轻压一条胳膊，对比佩戴水晶手串前后的平衡力差异。这是最直观的能量体验方法。",
      steps: [
        "测试者单脚站立，保持平衡",
        "助手轻压测试者一条胳膊",
        "记录平衡保持时间",
        "佩戴水晶手串后重复测试",
        "对比前后差异"
      ],
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
      result: "佩戴水晶后，平衡力显著提升，能够保持更长时间的稳定状态"
    },
    {
      id: 2,
      title: "柔韧性测试",
      subtitle: "站立体前屈测试",
      description: "通过站立体前屈动作，测量手指距离地面的距离，佩戴水晶后柔韧性会有明显改善。",
      steps: [
        "测试者直立站好，双脚并拢",
        "缓慢向前弯腰，手臂自然下垂",
        "测量手指距离地面的距离",
        "佩戴水晶手串后重复测试",
        "记录柔韧性改善程度"
      ],
      image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&crop=center",
      result: "佩戴水晶后，柔韧性显著增加，手指能够更接近地面"
    }
  ];

  const other_benefits = [
    {
      title: "耐力提升",
      description: "长期佩戴水晶能够提升身体耐力，在运动和日常活动中表现更佳",
      icon: "🏃‍♂️",
      time_frame: "2-4周可感受到明显改善"
    },
    {
      title: "爆发力增强",
      description: "水晶能量有助于提升肌肉爆发力，在需要瞬间发力的运动中效果显著",
      icon: "💪",
      time_frame: "1-3周开始显现效果"
    },
    {
      title: "专注力改善",
      description: "水晶的能量场能够帮助大脑保持专注，提升工作和学习效率",
      icon: "🧠",
      time_frame: "佩戴当天即可感受到变化"
    },
    {
      title: "情绪平衡",
      description: "水晶能够调节情绪波动，帮助保持内心平静和积极心态",
      icon: "😌",
      time_frame: "持续佩戴1周后效果明显"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-wider"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            能量测试
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            科学验证水晶能量的真实存在
          </motion.p>
          <motion.div 
            className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </div>
      </motion.section>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              看得见的能量效果
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              我们的水晶不是虚无缥缈的概念，而是具有真实、可测试功效的能量载体。
              通过科学的测试方法，您可以亲身体验水晶带来的积极变化。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Test Methods Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            即时测试方法
          </motion.h2>
          
          <div className="space-y-20">
            {test_methods.map((method, index) => (
              <motion.div 
                key={method.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={method.image_url}
                      alt={method.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-2 tracking-wide">
                      {method.title}
                    </h3>
                    <p className="text-xl text-amber-600 mb-4">{method.subtitle}</p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {method.description}
                    </p>
                  </div>

                  {/* Test Steps */}
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-medium text-gray-900 mb-4">测试步骤：</h4>
                    <ol className="space-y-2">
                      {method.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Result */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
                    <h4 className="text-lg font-medium text-amber-800 mb-2">预期效果：</h4>
                    <p className="text-amber-700">{method.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Benefits Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              长期佩戴功效
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              除了即时可测试的效果外，水晶还具有需要长期佩戴才能充分体验的深层功效。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {other_benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-wide">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="text-sm text-amber-600 font-medium">
                  {benefit.time_frame}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              亲身体验水晶能量
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              邀请您到我们的展厅，亲自进行能量测试，感受水晶的真实力量
            </p>
            <motion.button 
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:from-amber-500 hover:to-yellow-600 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              预约体验测试
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Scientific Note */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
              科学性说明
            </h3>
            <p className="text-gray-600 leading-relaxed">
              以上测试方法基于能量场理论和人体生物电磁场的相互作用。
              虽然现代科学尚未完全解释其机理，但大量实践证明了水晶对人体的积极影响。
              我们鼓励您以开放的心态体验，让事实说话。
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}