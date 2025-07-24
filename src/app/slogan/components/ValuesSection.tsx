'use client';

import { motion } from 'framer-motion';

interface ValueCard {
  id: number;
  title: string;
  description: string;
  color: string;
}

const values: ValueCard[] = [
  {
    id: 1,
    title: "주체성",
    description: "Subjectivity / Autonomy / Proactiveness",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "공동체 의식",
    description: "Community spirit / Sense of community",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "능동성",
    description: "Activeness / Proactiveness",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "책임감",
    description: "Sense of responsibility",
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "전략적 사고",
    description: "Strategic thinking",
    color: "bg-red-500"
  }
];

export default function ValuesSection() {
  return (
    <section className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽 영역 - 비워둠 */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 text-lg">우측 카드 호버에 따라서 내용 변경</p>
            </div>
          </div>

          {/* 오른쪽 카드 영역 */}
          <div className="space-y-8">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-80 ${value.color} rounded-xl p-6 text-white cursor-pointer`}
                >
                  <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                  <p className="text-sm opacity-90">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 