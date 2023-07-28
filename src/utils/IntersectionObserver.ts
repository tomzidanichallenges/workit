let defaults = {
  root: null,
  threshold: 0,
  ratio: null,
  once: true,
  isReponsive: false,
}

class CustomIntersectionObserver {
  elements: Element[]

  constructor(elements: Element[], options = {}) {
    this.elements = elements

    Object.assign(this, defaults, options, {})

    this.init()

    return this
  }

  init() {
    this.observe()
  }

  observe() {
    if (!window.IntersectionObserver) throw new Error("Your browser does not support IntersectionObserver!")
    if (!this.elements.length) return

    const intersectionObserver = new IntersectionObserver(this.onIntersection.bind(this), {
      root: null,
      threshold: 1,
    })

    this.elements.forEach((element) => {
      intersectionObserver.observe(element)
    })
  }

  /**
   * IntersectionObserver callback
   * @param  {Array<IntersectionObserverEntry>} entries
   * @param  {IntersectionObserver} observer
   */
  onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    const event = new Event("enterview")

    let stagger = 0

    entries.forEach((entry) => {
      const { intersectionRatio, isIntersecting, target } = entry
      const delay = stagger

      if (intersectionRatio >= 1 && isIntersecting) {
        observer.unobserve(target)

        setTimeout(() => {
          entry.target.dispatchEvent(event)
        }, delay)

        stagger += 150
      }
    })
  }
}

export default CustomIntersectionObserver
