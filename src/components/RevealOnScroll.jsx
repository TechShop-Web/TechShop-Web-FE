import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
