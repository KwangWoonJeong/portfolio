import { useState, useEffect, useCallback } from 'react'
import useReducedMotion from './useReducedMotion'

interface UseTypingEffectOptions {
  strings: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export default function useTypingEffect({
  strings,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: UseTypingEffectOptions) {
  const reduced = useReducedMotion()
  const [displayText, setDisplayText] = useState(reduced ? strings[0] : '')
  const [stringIndex, setStringIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  // If reduced motion, show full text immediately
  useEffect(() => {
    if (reduced) {
      setDisplayText(strings[stringIndex])
    }
  }, [reduced, stringIndex, strings])

  // cursor blink
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [reduced])

  const currentString = strings[stringIndex]

  const tick = useCallback(() => {
    if (reduced) {
      // In reduced motion, just cycle strings on a timer
      return setTimeout(() => {
        setStringIndex((i) => (i + 1) % strings.length)
      }, pauseDuration)
    }

    if (isTyping) {
      if (displayText.length < currentString.length) {
        return setTimeout(
          () => setDisplayText(currentString.slice(0, displayText.length + 1)),
          typingSpeed,
        )
      }
      return setTimeout(() => setIsTyping(false), pauseDuration)
    }
    if (displayText.length > 0) {
      return setTimeout(
        () => setDisplayText(displayText.slice(0, -1)),
        deletingSpeed,
      )
    }
    setStringIndex((i) => (i + 1) % strings.length)
    setIsTyping(true)
    return undefined
  }, [displayText, isTyping, currentString, typingSpeed, deletingSpeed, pauseDuration, strings, reduced])

  useEffect(() => {
    const id = tick()
    return () => { if (id) clearTimeout(id) }
  }, [tick])

  return { displayText, isTyping, showCursor: reduced ? true : showCursor }
}
