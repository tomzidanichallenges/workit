import CustomIntersectionObserver from "../utils/IntersectionObserver"

class Benefits {
  el: Element
  cards: NodeListOf<HTMLElement>
  intersectionObserver: CustomIntersectionObserver

  constructor(el: Element) {
    this.el = el
    this.cards = el.querySelectorAll("article.benefit-card")
    this.intersectionObserver = new CustomIntersectionObserver(Array.from(this.cards))

    this.init()
  }

  init() {
    this.bindEvents()
  }

  revealCards(e: Event) {
    const target = e.target as HTMLElement

    target.classList.add("revealed")
  }

  bindEvents() {
    this.revealCards = this.revealCards.bind(this)

    this.cards.forEach((c) => c.addEventListener("enterview", this.revealCards))
  }
}

export default Benefits
