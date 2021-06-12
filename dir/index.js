"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SIRModule = /*#__PURE__*/function () {
  function SIRModule(domNode) {
    _classCallCheck(this, SIRModule);

    this.isPlaying = true;
    this.hasFocus = false;
    this.hasHover = false;
    this.speed = 5000;
    this.currentIndex = 0;
    this.rotationState = null;
    this.playLabel = 'Pause automatic slide show';
    this.pauseLabel = 'Play automatic slide show';
    this.playIcon = 'fa-play';
    this.pauseIcon = 'fa-pause';
    this.domNode = domNode;
    this.pauseBtn = null;
    this.liveRegion = null;
    this.carouselItems = null;
    this.buttons = null;
  }

  _createClass(SIRModule, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.pauseBtn = this.domNode.querySelector('.wcag-rotation');
      this.liveRegion = this.domNode.querySelector('.wcag-carousel-items');
      this.carouselItems = this.domNode.querySelectorAll('.wcag-carousel-item');
      this.buttons = this.domNode.querySelectorAll('.wcag-controls button');
      this.carouselItems[0].classList.add('wcag-active');

      for (var i = 0; i < this.buttons.length; i++) {
        var btn = this.buttons[i];

        if (btn.classList.contains('wcag-rotation')) {
          btn.addEventListener('click', function (e) {
            _this.togglePauseIcon();

            _this.isPlaying = !_this.isPlaying;
            _this.isPlaying ? _this.playCarousel() : _this.pauseCarousel();
          });
        } else {
          if (btn.classList.contains('wcag-next')) {
            btn.addEventListener('click', this.goNext.bind(this));
          } else {
            btn.addEventListener('click', this.goBack.bind(this));
          }

          btn.addEventListener('focus', this.focus.bind(this));
          btn.addEventListener('blur', this.blur.bind(this));
          btn.addEventListener('mouseover', this.mouseover.bind(this));
          btn.addEventListener('mouseout', this.mouseout.bind(this));
        }
      } // Add event listener on each carousel item


      for (var j = 0; j < this.carouselItems.length; j++) {
        var elem = this.carouselItems[j].querySelector('a');
        elem.addEventListener('focus', this.focus.bind(this));
        elem.addEventListener('blur', this.blur.bind(this));
        elem.addEventListener('mouseover', this.mouseover.bind(this));
        elem.addEventListener('mouseout', this.mouseout.bind(this));
      } // Start the carousel


      this.playCarousel();
    }
  }, {
    key: "goNext",
    value: function goNext() {
      this.carouselItems[this.currentIndex].classList.remove('wcag-active');
      this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
      this.carouselItems[this.currentIndex].classList.add('wcag-active');
    }
  }, {
    key: "goBack",
    value: function goBack() {
      this.carouselItems[this.currentIndex].classList.remove('wcag-active');
      this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
      this.carouselItems[this.currentIndex].classList.add('wcag-active');
    }
  }, {
    key: "playCarousel",
    value: function playCarousel() {
      if (!this.hasHover && !this.hasFocus && this.isPlaying) {
        this.liveRegion.setAttribute('aria-live', 'off');
        this.rotationState = setInterval(this.goNext.bind(this), this.speed);
      }
    }
  }, {
    key: "pauseCarousel",
    value: function pauseCarousel() {
      this.liveRegion.setAttribute('aria-live', 'polite');
      clearInterval(this.rotationState);
    }
  }, {
    key: "togglePauseIcon",
    value: function togglePauseIcon() {
      var svg = this.domNode.querySelector('.wcag-rotation .fa-lg');

      if (this.isPlaying) {
        svg.classList.remove(this.pauseIcon);
        svg.classList.add(this.playIcon);
        this.pauseBtn.setAttribute('aria-label', this.pauseLabel);
      } else {
        svg.classList.remove(this.playIcon);
        svg.classList.add(this.pauseIcon);
        this.pauseBtn.setAttribute('aria-label', this.playLabel);
      }
    } // Event Handlers

  }, {
    key: "mouseover",
    value: function mouseover(e) {
      if (!this.pauseBtn.contains(e.target)) {
        this.hasHover = true;

        if (!this.hasFocus) {
          this.pauseCarousel();
        }
      }
    }
  }, {
    key: "mouseout",
    value: function mouseout() {
      this.hasHover = false;

      if (!this.hasFocus) {
        this.playCarousel();
      }
    }
  }, {
    key: "focus",
    value: function focus(e) {
      if (!this.pauseBtn.contains(e.target)) {
        this.hasFocus = true;

        if (!this.hasHover) {
          this.pauseCarousel();
        }
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      this.hasFocus = false;

      if (!this.hasHover) {
        this.playCarousel();
      }
    }
  }]);

  return SIRModule;
}();