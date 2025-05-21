document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden")
      // Start animations after preloader is hidden
      startAnimations()
    }, 1000)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") return

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        e.preventDefault()
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      mobileMenu.classList.toggle("active")
      document.body.classList.toggle("no-scroll")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.classList.remove("no-scroll")
      })
    })
  }

  // Testimonial slider
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonialCards.forEach((card) => card.classList.remove("active"))
    testimonialDots.forEach((dot) => dot.classList.remove("active"))

    testimonialCards[index].classList.add("active")
    testimonialDots[index].classList.add("active")
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentTestimonial--
      if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1
      }
      showTestimonial(currentTestimonial)
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentTestimonial++
      if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0
      }
      showTestimonial(currentTestimonial)
    })
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentTestimonial = index
      showTestimonial(currentTestimonial)
    })
  })

  // Auto rotate testimonials
  setInterval(() => {
    if (document.hasFocus()) {
      currentTestimonial++
      if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0
      }
      showTestimonial(currentTestimonial)
    }
  }, 5000)

  // Scroll animations
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
})
