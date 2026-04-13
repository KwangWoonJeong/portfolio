import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

interface Props {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const reduced = useReducedMotion()
  const d = reduced ? 0 : undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: d ?? 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
