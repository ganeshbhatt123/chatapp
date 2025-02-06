import { motion } from "framer-motion";
import React from "react";

const SparkleEffect = ({ children }) => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.3,
      ease: [0, 0.71, 0.2, 1.01],
      scale: {
        type: "spring",
        damping: 5,
        stiffness: 100,
        restDelta: 0.001
      }
    }}
    style={{width: "100%", height: "100%"}}
    >
      {children}
    </motion.div>
  );
};

export default SparkleEffect;
