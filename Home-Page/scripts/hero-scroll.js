document.addEventListener("DOMContentLoaded", () => {
  // Hero Slider Functionality
  const heroSlider = document.querySelector(".hero-slider-inner")
  const heroSlides = document.querySelectorAll(".hero-slide")
  const prevSlideBtn = document.querySelector(".prev-slide")
  const nextSlideBtn = document.querySelector(".next-slide")
  const sliderDots = document.querySelectorAll(".hero-slider-dot")

  let currentSlide = 0
  const slideCount = heroSlides.length

  // Initialize slider
  updateSlider()

  // Auto slide functionality
  let autoSlideInterval = setInterval(nextSlide, 5000)

  // Reset interval on manual navigation
  function resetInterval() {
    clearInterval(autoSlideInterval)
    autoSlideInterval = setInterval(nextSlide, 5000)
  }

  // Previous slide button
  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      prevSlide()
      resetInterval()
    })
  }

  // Next slide button
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      nextSlide()
      resetInterval()
    })
  }

  // Dot navigation
  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      updateSlider()
      resetInterval()
    })
  })

  // Touch swipe functionality
  let touchStartX = 0
  let touchEndX = 0

  if (heroSlider) {
    heroSlider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      false,
    )

    heroSlider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      false,
    )
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - next slide
      nextSlide()
      resetInterval()
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right - previous slide
      prevSlide()
      resetInterval()
    }
  }

  // Previous slide function
  function prevSlide() {
    currentSlide--
    if (currentSlide < 0) {
      currentSlide = slideCount - 1
    }
    updateSlider()
  }

  // Next slide function
  function nextSlide() {
    currentSlide++
    if (currentSlide >= slideCount) {
      currentSlide = 0
    }
    updateSlider()
  }

  // Update slider position and active dot
  function updateSlider() {
    // Update slider position
    if (heroSlider) {
      heroSlider.style.transform = `translateX(-${currentSlide * (100 / slideCount)}%)`
    }

    // Update active dot
    sliderDots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  // Course Cards Horizontal Scroll
  const courseCardsContainer = document.querySelector(".course-cards-container")

  if (courseCardsContainer) {
    // Add horizontal mouse wheel scrolling
    courseCardsContainer.addEventListener(
      "wheel",
      function (e) {
        if (e.deltaY !== 0) {
          e.preventDefault()
          this.scrollLeft += e.deltaY
        }
      },
      { passive: false },
    )
  }

  // Animate elements when they come into view
  function startAnimations() {
    const animatedElements = document.querySelectorAll(".fade-in, .slide-up")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 },
    )

    animatedElements.forEach((element) => {
      observer.observe(element)
    })
  }

  // Start animations
  startAnimations()

  // Re-trigger animations on scroll
  window.addEventListener("scroll", () => {
    startAnimations()
  })
})
