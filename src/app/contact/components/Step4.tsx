import { motion } from "framer-motion";

export default function Step4() {
  return (
    <div className="text-center py-6 sm:py-10 md:py-14 xl:py-16">
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-24 xl:h-24 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 xl:mb-8 text-2xl sm:text-3xl md:text-3xl xl:text-3xl font-bold"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.8,
        }}
      >
        ✓
      </motion.div>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-3xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 xl:mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        제출완료 !
      </motion.h2>
      <motion.p
        className="text-lg sm:text-xl md:text-xl xl:text-xl text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        빠르게 검토후에 연락드리겠습니다.
      </motion.p>
    </div>
  );
}
