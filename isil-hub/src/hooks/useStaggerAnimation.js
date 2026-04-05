import { useEffect, useRef } from 'react'

/**
 * Returns a ref to attach to a container.
 * When the component mounts, all children with data-anim are staggered in.
 */
export function useStaggerAnimation(selector = '[data-anim]', baseDelay = 60) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    elements.forEach((el, index) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)'

      const delay = index * baseDelay
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, delay)
    })
  }, [selector, baseDelay])

  return containerRef
}
