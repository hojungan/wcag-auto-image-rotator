class SIRModule {
  constructor(domNode) {
    this.isPlaying = true
    this.hasFocus = false
    this.hasHover = false
    this.speed = 2500
    this.currentIndex = 0
    this.rotationState = null

    this.playLabel = 'Pause automatic slide show'
    this.pauseLabel = 'Play automatic slide show'
    this.playIcon = 'fa-play'
    this.pauseIcon = 'fa-pause'

    this.domNode = domNode
    this.pauseBtn = domNode.querySelector('.wtm-sir-rotation')
    this.liveRegion = domNode.querySelector('.wtm-sir-carousel-items')
    this.carouselItems = domNode.querySelectorAll('.wtm-sir-carousel-item')
    this.buttons = domNode.querySelectorAll('.wtm-sir-controls button')
  }


  init() {
    this.carouselItems[0].classList.add('wtm-sir-active')

    for (let i = 0; i < this.buttons.length; i++) {
      let btn = this.buttons[i]

      if (btn.classList.contains('wtm-sir-rotation')) {
        btn.addEventListener('click', (e) => {
          this.togglePauseIcon()
          this.isPlaying = !this.isPlaying
          this.isPlaying ? this.playCarousel() : this.pauseCarousel()
        })

      } else {
        if (btn.classList.contains('wtm-sir-next')) {
          btn.addEventListener('click', this.goNext.bind(this))
        } else {
          btn.addEventListener('click', this.goBack.bind(this))
        }

        btn.addEventListener('focus', this.handleFocus.bind(this))
        btn.addEventListener('blur', this.handleBlur.bind(this))

      }
    }

    for (let j = 0; j < this.carouselItems.length; j++) {
      let elem = this.carouselItems[j]

      // elem.addEventListener('focus', this.handleFocus.bind(this))
      // elem.addEventListener('blur', this.handleBlur.bind(this))
    }

    this.domNode.addEventListener('mouseover', this.handleFocus.bind(this))
    this.domNode.addEventListener('mouseout', this.handleBlur.bind(this))

    setTimeout(this.playCarousel.bind(this),)
  }

  goNext() {
    this.carouselItems[this.currentIndex].classList.remove('wtm-sir-active')
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length
    this.carouselItems[this.currentIndex].classList.add('wtm-sir-active')
  }

  goBack() {
    this.carouselItems[this.currentIndex].classList.remove('wtm-sir-active')
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length
    this.carouselItems[this.currentIndex].classList.add('wtm-sir-active')
  }

  playCarousel() {
    if (!this.hasHover && !this.hasFocus && this.isPlaying) {
      this.liveRegion.setAttribute('aria-live', 'off')
      this.rotationState = setInterval(this.goNext.bind(this), this.speed)
    }
  }

  pauseCarousel() {
    this.liveRegion.setAttribute('aria-live', 'polite')
    clearInterval(this.rotationState)
  }

  togglePauseIcon() {
    let svg = this.domNode.querySelector('.wtm-sir-rotation .fa-lg')
    if (this.isPlaying) {
      svg.classList.remove(this.pauseIcon)
      svg.classList.add(this.playIcon)
      this.pauseBtn.setAttribute('aria-label', this.pauseLabel)
    }
    else {
      svg.classList.remove(this.playIcon)
      svg.classList.add(this.pauseIcon)
      this.pauseBtn.setAttribute('aria-label', this.playLabel)
    }
  }

  // Event Handlers
  handleFocus(e) {
    if (!this.pauseBtn.contains(e.target) && this.rotationState == null) {
      this.hasHover = true
      this.pauseCarousel()
    }
  }

  handleBlur(e) {
    this.hasHover = false
    this.playCarousel()
  }
}
