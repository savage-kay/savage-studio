import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/assets/lottie/favicon-Photoroom.json";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loading screen automatically after a visually pleasing duration (2.5s)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
