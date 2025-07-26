import { motion } from "framer-motion";

export default function AnimatedContactText() {
  const letters = "Contact".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -20,
      scale: 1.3,
      rotateX: 15,
      rotateY: 5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const textShadowVariants = {
    hover: {
      textShadow: [
        "0 0 0px rgba(0,0,0,0)",
        "0 0 4px rgba(220, 220, 220, 0.05)",
        "0 0 8px rgba(200, 200, 200, 0.03)",
        "0 0 12px rgba(180, 180, 180, 0.02)",
      ],
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center mr-4 sm:mr-8 md:mr-12 xl:mr-32 relative group"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          className="relative inline-block mx-0.5 sm:mx-1 md:mx-1.5 xl:mx-1"
          variants={letterVariants}
          whileHover="hover"
          custom={index}
        >
          {/* 배경 글로우 효과 */}
          <motion.div
            className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text"
            style={{
              transform: "translateZ(-10px)",
              filter: "blur(8px)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{
              opacity: 0.2,
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            {letter}
          </motion.div>

          {/* 메인 글자 */}
          <motion.div
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-none cursor-pointer relative z-10"
            variants={hoverVariants}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              WebkitTextStroke: "1.5px white",
            }}
          >
            {letter}
          </motion.div>

          {/* 호버 시 텍스트 그림자 효과 */}
          <motion.div
            className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-none"
            style={{
              transform: "translateZ(-5px)",
              filter: "blur(2px)",
              WebkitTextStroke: "1px white",
            }}
            variants={textShadowVariants}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
          >
            {letter}
          </motion.div>

          {/* 호버 시 컬러 오버레이 */}
          <motion.div
            className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
            style={{
              transform: "translateZ(-2px)",
            }}
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 0.9,
              transition: { duration: 0.2 },
            }}
          >
            {letter}
          </motion.div>

          {/* 호버 시 파티클 효과 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 xl:w-2 xl:h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [-10, -30, -50],
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
