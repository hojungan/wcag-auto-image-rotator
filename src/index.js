class SIRModule {
  constructor(domNode) {
    this.isPlaying = true
    this.hasFocus = false
    this.hasHover = false
    this.speed = 5000
    this.currentIndex = 0
    this.rotationState = null

    this.playLabel = 'Pause automatic slide show'
    this.pauseLabel = 'Play automatic slide show'
    this.playIcon = 'fa-play'
    this.pauseIcon = 'fa-pause'

    this.domNode = domNode
    this.pauseBtn = null
    this.liveRegion = null
    this.carouselItems = null
    this.buttons = null
  }


  init() {
    this.pauseBtn = this.domNode.querySelector('.wcag-rotation')
    this.liveRegion = this.domNode.querySelector('.wcag-carousel-items')
    this.carouselItems = this.domNode.querySelectorAll('.wcag-carousel-item')
    this.buttons = this.domNode.querySelectorAll('.wcag-controls button')
    
    this.carouselItems[0].classList.add('wcag-active')

    for (let i = 0; i < this.buttons.length; i++) {
      let btn = this.buttons[i]

      if (btn.classList.contains('wcag-rotation')) {
        btn.addEventListener('click', (e) => {
          this.togglePauseIcon()
          this.isPlaying = !this.isPlaying
          this.isPlaying ? this.playCarousel() : this.pauseCarousel()
        })

      } else {
        if (btn.classList.contains('wcag-next')) {
          btn.addEventListener('click', this.goNext.bind(this))
        } else {
          btn.addEventListener('click', this.goBack.bind(this))
        }

        btn.addEventListener('focus', this.focus.bind(this))
        btn.addEventListener('blur', this.blur.bind(this))
        btn.addEventListener('mouseover', this.mouseover.bind(this))
        btn.addEventListener('mouseout', this.mouseout.bind(this))
      }
    }

    // Add event listener on each carousel item
    for (let j = 0; j < this.carouselItems.length; j++) {
      let elem = this.carouselItems[j].querySelector('a')

      elem.addEventListener('focus', this.focus.bind(this))
      elem.addEventListener('blur', this.blur.bind(this))
      elem.addEventListener('mouseover', this.mouseover.bind(this))
      elem.addEventListener('mouseout', this.mouseout.bind(this))
    }


    // Start the carousel
    this.playCarousel()
  }

  goNext() {
    this.carouselItems[this.currentIndex].classList.remove('wcag-active')
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length
    this.carouselItems[this.currentIndex].classList.add('wcag-active')
  }

  goBack() {
    this.carouselItems[this.currentIndex].classList.remove('wcag-active')
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length
    this.carouselItems[this.currentIndex].classList.add('wcag-active')
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
    let svg = this.domNode.querySelector('.wcag-rotation .fa-lg')
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
  mouseover(e) {
    if(!this.pauseBtn.contains(e.target)) {
      this.hasHover = true

      if(!this.hasFocus){  
        this.pauseCarousel()
      }
    }
  }

  mouseout() {
    this.hasHover = false
    if(!this.hasFocus) {
      this.playCarousel()
    }
  }

  focus(e) {
    if(!this.pauseBtn.contains(e.target)){

      this.hasFocus = true

      if(!this.hasHover) {
        this.pauseCarousel()
      }
    }
  }

  blur() {
    this.hasFocus = false
    if(!this.hasHover) {
      this.playCarousel()
    }
  }
}
