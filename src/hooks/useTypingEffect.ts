import { useState, useEffect, useCallback } from 'react'

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
  const [displayText, setDisplayText] = useState('')
  const [stringIndex, setStringIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  const currentString = strings[stringIndex]

  const tick = useCallback(() => {
    if (isTyping) {
      if (displayText.length < currentString.length) {
        return setTimeout(
          () => setDisplayText(currentString.slice(0, displayText.length + 1)),
          typingSpeed,
        )
      }
      // finished typing — pause then start deleting
      return setTimeout(() => setIsTyping(false), pauseDuration)
    }
    // deleting
    if (displayText.length > 0) {
      return setTimeout(
        () => setDisplayText(displayText.slice(0, -1)),
        deletingSpeed,
      )
    }
    // finished deleting — move to next string
    setStringIndex((i) => (i + 1) % strings.length)
    setIsTyping(true)
    return undefined
  }, [displayText, isTyping, currentString, typingSpeed, deletingSpeed, pauseDuration, strings.length])

  useEffect(() => {
    const id = tick()
    return () => { if (id) clearTimeout(id) }
  }, [tick])

  return { displayText, isTyping, showCursor }
}
