class AutoImageRotator {
    constructor(node){
        this.carousel = node
        this.nextBtn = node.querySelector('.wtm-sir-next')
        this.prevBtn = node.querySelector('.wtm-sir-prev')
        this.playpause = node.querySelector('.wtm-sir-rotation.wtm-sir-pause')
        this.carouselItems = node.querySelectorAll('.wtm-sir-carousel-item')
        this.pauseIconClass = 'fa-pause'
        this.playIconClass = 'fa-play'
        this.playLabel = 'Pause automatic slide show'
        this.pauseLabel = 'Play automatic slide show'
        this.active = 'wtm-sir-active'
        this.autoRotateState = null
        this.isPlaying = true
        this.rotateSpeed = 2000
        this.rotateIndex = 0
    }

    initiateCarousel() {
        // Display first item on page load
        this.carouselItems[0].classList.add(this.active)

        const buttons = this.carousel.querySelectorAll(".wtm-sir-controls button")
        buttons.forEach(btn => {
            btn.addEventListener('click', (e)=>{
                e.preventDefault()
                
            })
        })

        // Add focus and hover event listener to each carousel item
        for (let i = 0; i < this.carouselItems.length; i++) {
            let anchor = this.carouselItems[i]

            anchor.addEventListener('focusin', (e)=>{
                e.preventDefault()
                
            })

            anchor.addEventListener('focusout', (e)=>{
                e.preventDefault()
            })

            anchor.addEventListener('mouseover', (e)=>{
                e.preventDefault()
                this.handleHover('mouseover', e.target)
            })

            anchor.addEventListener('mouseout', (e)=>{
                e.preventDefault()
            })
        }
    }

    togglePlayPause(removeClass, addClass, label) {
        // console.log(this.playpause.querySelector('svg'))
        this.playpause.querySelector('svg').classList.remove(removeClass)
        this.playpause.querySelector('svg').classList.add(addClass)
        this.playpause.setAttribute('aria-label', label)
    }

    goNext() {
        this.carouselItems[this.rotateIndex].classList.remove(this.active)
        this.rotateIndex = (this.rotateIndex + 1) % this.carouselItems.length
        this.carouselItems[this.rotateIndex].classList.add(this.active)
    }

    goPrev() {
        this.carouselItems[this.rotateIndex].classList.remove(this.active)
        this.rotateIndex = (this.rotateIndex - 1 + this.carouselItems.length) % this.carouselItems.length
        this.carouselItems[this.rotateIndex].classList.add(this.active)
    }

    playCarousel() {
        this.isPlaying = true
        this.autoRotateState = setInterval(()=>{
            this.goNext()
        }, this.rotateSpeed);
    }

    pauseCarousel() {
        this.isPlaying = false
        clearInterval(this.autoRotateState)
    }

    handleHover(hoverType, elem) {
        // console.log(elem)
    }
}