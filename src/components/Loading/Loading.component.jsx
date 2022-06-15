import { motion } from 'framer-motion';

const loadingContainer = {
  width: '2.1rem',
  height: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
};

const loadingCircle = {
  display: 'block',
  width: '0.4rem',
  height: '0.4rem',
  borderRadius: '0.25rem',
  backgroundColor: 'black',
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '50%',
  },
  end: {
    y: '150%',
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};
const waveContainer = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
};

export default function ThreeDotsWave() {
  return (
    <div style={waveContainer}>
      <h2 style={{ marginBottom: '11px', marginRight: '15px', marginTop: '20px', }}>
        let me think
      </h2>
      <motion.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    </div>
  );
}