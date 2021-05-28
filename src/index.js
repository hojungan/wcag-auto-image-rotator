class SIRModule {
    constructor(carouselDOMNode) {
      this.carousel = carouselDOMNode;
      this.nextBtn = carouselDOMNode.querySelector(".wtm-sir-next");
      this.prevBtn = carouselDOMNode.querySelector(".wtm-sir-prev");
      this.playpause = carouselDOMNode.querySelector(".wtm-sir-rotation.wtm-sir-pause");
      this.carouselItems = carouselDOMNode.querySelectorAll(".wtm-sir-carousel-item");
      this.liveRegion = carouselDOMNode.querySelector(".wtm-sir-carousel-items");
      this.pauseIconClass = "fa-pause";
      this.playIconClass = "fa-play";
      this.pauseClass = "wtm-sir-pause";
      this.playClass = "wtm-sir-play";
      this.playLabel = "Pause automatic slide show";
      this.pauseLabel = "Play automatic slide show";
      this.active = "wtm-sir-active";
      this.autoRotateState = null; // Holds reference to SetInterval
      this.rotateSpeed = 4000; // Image roates every n seconds
      this.rotateIndex = 0; // Current index
    }
  
    initiateCarousel() {
      // Display first item on page load
      this.carouselItems[0].classList.add(this.active);
  
      let btn = this.carousel.querySelector(
        ".wtm-sir-carousel-inner .wtm-sir-controls .wtm-sir-rotation"
      );
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.handlePlayPauseButtonClick(this.playpause);
        });
      }
  
      // Add focus and hover event listener to each carousel item
      for (let i = 0; i < this.carouselItems.length; i++) {
        let anchor = this.carouselItems[i].querySelector("a");
  
        // Focus from Tab key
        anchor.addEventListener("focus", (e) => {
          e.preventDefault();
          if(this.liveRegion.getAttribute('aria-live') === 'off' && this.playpause.classList[1].includes('pause')) {
            this.handleLiveRegionAnnouncement('polite')
            this.pauseCarousel()
          }
        });
  
        anchor.addEventListener("blur", (e) => {
          e.preventDefault();
          if(this.liveRegion.getAttribute('aria-live') === 'polite' && this.playpause.classList[1].includes('play')) {
            this.handleLiveRegionAnnouncement('off')
            this.playCarousel()
          }
        });
  
        anchor.addEventListener("mouseover", (e) => {
          e.preventDefault();
          if(this.liveRegion.getAttribute('aria-live') === 'off') {
            this.handleLiveRegionAnnouncement('polite')
            
          }
  
        });
  
        anchor.addEventListener("mouseout", (e) => {
          e.preventDefault();
          this.handleLiveRegionAnnouncement('off')
        });
      }
  
      this.playCarousel();
    }
  
    togglePlayPause(removeClass, addClass, label) {
      this.playpause.childNodes[1].classList.remove(removeClass);
      this.playpause.childNodes[1].classList.add(addClass);
      this.playpause.setAttribute("aria-label", label);
    }
  
    goNext() {
      this.carouselItems[this.rotateIndex].classList.remove(this.active);
      this.rotateIndex = (this.rotateIndex + 1) % this.carouselItems.length;
      this.carouselItems[this.rotateIndex].classList.add(this.active);
    }
  
    goPrev() {
      this.carouselItems[this.rotateIndex].classList.remove(this.active);
      this.rotateIndex =
        (this.rotateIndex - 1 + this.carouselItems.length) %
        this.carouselItems.length;
      this.carouselItems[this.rotateIndex].classList.add(this.active);
    }
  
    playCarousel() {
      this.handleLiveRegionAnnouncement('off')
  
      this.autoRotateState = setInterval(() => {
        this.goNext();
      }, this.rotateSpeed);
    }
  
    pauseCarousel() {
      this.handleLiveRegionAnnouncement('polite')
      clearInterval(this.autoRotateState);
    }
  
  
    handleFocus(focusType, elem) {
      console.log(elem)
    }
  
    handlePlayPauseButtonClick(playBtn) {
      switch (playBtn.classList[1]) {
        case this.pauseClass:
          // Carousel is playing now. Pause it
          this.togglePlayPause(
            this.pauseIconClass,
            this.playIconClass,
            this.pauseLabel
          );
          this.pauseCarousel();
          playBtn.classList.remove(this.pauseClass)
          playBtn.classList.add(this.playClass)
          break;
  
        case this.playClass:
          // Carousel is paused. Play it
          this.togglePlayPause(
            this.playIconClass,
            this.pauseIconClass,
            this.playLabel
          );
          this.playCarousel();
          playBtn.classList.remove(this.playClass)
          playBtn.classList.add(this.pauseClass)
          break;
      }
    }
  
    handleLiveRegionAnnouncement(method) {
      this.liveRegion.setAttribute("aria-live", method);
    }
  }
  