"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AutoImageRotator = /*#__PURE__*/function () {
  function AutoImageRotator(node) {
    _classCallCheck(this, AutoImageRotator);

    this.carousel = node;
    this.nextBtn = node.querySelector('.wtm-sir-next');
    this.prevBtn = node.querySelector('.wtm-sir-prev');
    this.playpause = node.querySelector('.wtm-sir-rotation.wtm-sir-pause');
    this.carouselItems = node.querySelectorAll('.wtm-sir-carousel-item');
    this.pauseIconClass = 'fa-pause';
    this.playIconClass = 'fa-play';
    this.playLabel = 'Pause automatic slide show';
    this.pauseLabel = 'Play automatic slide show';
    this.active = 'wtm-sir-active';
    this.autoRotateState = null;
    this.isPlaying = true;
    this.rotateSpeed = 2000;
    this.rotateIndex = 0;
  }

  _createClass(AutoImageRotator, [{
    key: "initiateCarousel",
    value: function initiateCarousel() {
      var _this = this;

      // Display first item on page load
      this.carouselItems[0].classList.add(this.active);
      var buttons = this.carousel.querySelectorAll(".wtm-sir-controls button");
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
        });
      }); // Add focus and hover event listener to each carousel item

      for (var i = 0; i < this.carouselItems.length; i++) {
        var anchor = this.carouselItems[i];
        anchor.addEventListener('focusin', function (e) {
          e.preventDefault();
        });
        anchor.addEventListener('focusout', function (e) {
          e.preventDefault();
        });
        anchor.addEventListener('mouseover', function (e) {
          e.preventDefault();

          _this.handleHover('mouseover', e.target);
        });
        anchor.addEventListener('mouseout', function (e) {
          e.preventDefault();
        });
      }
    }
  }, {
    key: "togglePlayPause",
    value: function togglePlayPause(removeClass, addClass, label) {
      // console.log(this.playpause.querySelector('svg'))
      this.playpause.querySelector('svg').classList.remove(removeClass);
      this.playpause.querySelector('svg').classList.add(addClass);
      this.playpause.setAttribute('aria-label', label);
    }
  }, {
    key: "goNext",
    value: function goNext() {
      this.carouselItems[this.rotateIndex].classList.remove(this.active);
      this.rotateIndex = (this.rotateIndex + 1) % this.carouselItems.length;
      this.carouselItems[this.rotateIndex].classList.add(this.active);
    }
  }, {
    key: "goPrev",
    value: function goPrev() {
      this.carouselItems[this.rotateIndex].classList.remove(this.active);
      this.rotateIndex = (this.rotateIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
      this.carouselItems[this.rotateIndex].classList.add(this.active);
    }
  }, {
    key: "playCarousel",
    value: function playCarousel() {
      var _this2 = this;

      this.isPlaying = true;
      this.autoRotateState = setInterval(function () {
        _this2.goNext();
      }, this.rotateSpeed);
    }
  }, {
    key: "pauseCarousel",
    value: function pauseCarousel() {
      this.isPlaying = false;
      clearInterval(this.autoRotateState);
    }
  }, {
    key: "handleHover",
    value: function handleHover(hoverType, elem) {// console.log(elem)
    }
  }]);

  return AutoImageRotator;
}();