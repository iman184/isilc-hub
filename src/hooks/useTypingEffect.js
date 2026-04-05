import { useState, useEffect, useRef } from 'react'

/**
 * Cycles through an array of strings with a typing + delete effect.
 * Returns the current display string.
 */
export function useTypingEffect(texts, typingSpeed = 55, deleteSpeed = 30, pauseDuration = 1400) {
  const [displayed, setDisplayed] = useState('')
  const stateRef = useRef({ textIndex: 0, charIndex: 0, isDeleting: false, paused: false })

  useEffect(() => {
    if (!texts || texts.length === 0) return

    let timeout

    const tick = () => {
      const { textIndex, charIndex, isDeleting, paused } = stateRef.current
      const current = texts[textIndex]

      if (paused) {
        stateRef.current.paused = false
        timeout = setTimeout(tick, pauseDuration)
        return
      }

      if (!isDeleting) {
        const next = current.slice(0, charIndex + 1)
        setDisplayed(next)
        stateRef.current.charIndex++

        if (stateRef.current.charIndex >= current.length) {
          stateRef.current.isDeleting = true
          stateRef.current.paused = true
          timeout = setTimeout(tick, deleteSpeed)
          return
        }
        timeout = setTimeout(tick, typingSpeed)
      } else {
        const next = current.slice(0, charIndex - 1)
        setDisplayed(next)
        stateRef.current.charIndex--

        if (stateRef.current.charIndex <= 0) {
          stateRef.current.isDeleting = false
          stateRef.current.textIndex = (textIndex + 1) % texts.length
          timeout = setTimeout(tick, typingSpeed)
          return
        }
        timeout = setTimeout(tick, deleteSpeed)
      }
    }

    timeout = setTimeout(tick, 600)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return displayed
}
