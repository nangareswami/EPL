// Enhanced responsive JavaScript for EPL website

document.addEventListener("DOMContentLoaded", () => {
  // Initialize responsive features
  initResponsiveFeatures()

  // Observe elements for animation
  initAnimationObserver()

  // Add touch event listeners for mobile
  initTouchEvents()
})

function initResponsiveFeatures() {
  // Check viewport size and adjust elements accordingly
  const adjustForViewport = () => {
    const width = window.innerWidth

    // Adjust content sections based on viewport
    const contentSections = document.querySelectorAll(".content-section")
    contentSections.forEach((section) => {
      if (width < 768) {
        // Mobile adjustments
        section.classList.add("mobile-view")

        // Ensure images are properly sized on mobile
        const images = section.querySelectorAll("img")
        images.forEach((img) => {
          img.style.marginLeft = "auto"
          img.style.marginRight = "auto"
        })
      } else {
        section.classList.remove("mobile-view")
      }
    })

    // Adjust program cards for better mobile display
    const programCards = document.querySelectorAll(".program-card")
    programCards.forEach((card) => {
      if (width < 768) {
        card.style.height = "auto"
        const paragraph = card.querySelector("p")
        if (paragraph) paragraph.style.height = "auto"
      } else {
        // Reset to original styles on larger screens
        card.style.height = ""
        const paragraph = card.querySelector("p")
        if (paragraph) paragraph.style.height = ""
      }
    })

    // Adjust header text size for very small screens
    const headerTitle = document.querySelector(".header h1")
    if (headerTitle) {
      if (width < 400) {
        headerTitle.style.fontSize = "24px"
      } else if (width < 768) {
        headerTitle.style.fontSize = "32px"
      } else {
        headerTitle.style.fontSize = ""
      }
    }
  }

  // Run on load
  adjustForViewport()

  // Run on resize with debounce
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(adjustForViewport, 250)
  })
}

function initAnimationObserver() {
  // Enhanced Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add random delay for staggered animation effect
        entry.target.style.animationDelay = ${Math.random() * 0.5}s
        entry.target.classList.add("fade-in")

        // Once animation is complete, remove observer to improve performance
        setTimeout(() => {
          observer.unobserve(entry.target)
        }, 1000)
      }
    })
  }, observerOptions)

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((el) => observer.observe(el))
}

function initTouchEvents() {
  // Enhanced touch events for mobile navigation
  let touchStartY = 0
  let touchEndY = 0
  let touchStartX = 0
  let touchEndX = 0

  document.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY
    touchStartX = e.changedTouches[0].screenX
  })

  document.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    const verticalDistance = touchStartY - touchEndY
    const horizontalDistance = touchStartX - touchEndX

    // Detect vertical swipe
    if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
      if (verticalDistance > swipeThreshold) {
        // Swipe up - scroll to next section
        scrollToNextSection()
      } else if (verticalDistance < -swipeThreshold) {
        // Swipe down - scroll to previous section
        scrollToPrevSection()
      }
    }
  }

  function scrollToNextSection() {
    // Find the next section based on current scroll position
    const sections = document.querySelectorAll(".content-section, .programs, .header")
    let nextSection = null

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect()
      if (rect.top > 50) {
        nextSection = sections[i]
        break
      }
    }

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  function scrollToPrevSection() {
    // Find the previous section based on current scroll position
    const sections = document.querySelectorAll(".content-section, .programs, .header")
    let prevSection = null

    for (let i = sections.length - 1; i >= 0; i--) {
      const rect = sections[i].getBoundingClientRect()
      if (rect.bottom < -50) {
        prevSection = sections[i]
        break
      }
    }

    if (prevSection) {
      prevSection.scrollIntoView({ behavior: "smooth" })
    }
  }
}

// Function to animate counters when stats section is visible
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current)
      }
    }, 30)
  })
}

// Add responsive navigation menu for mobile
function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu")
  if (mobileMenu) {
    mobileMenu.classList.toggle("active")
  }
}
document.addEventListener("DOMContentLoaded", () => {
  // Make footer links collapsible on mobile
  const footerHeadings = document.querySelectorAll(".footer-links h3")

  footerHeadings.forEach((heading) => {
    heading.addEventListener("click", function () {
      // Only apply the toggle behavior on mobile screens
      if (window.innerWidth <= 768) {
        // Toggle active class on the heading
        this.classList.toggle("active")

        // Find the next sibling element (the ul with links)
        const linksList = this.nextElementSibling

        // Toggle the show class on the links list
        if (linksList.classList.contains("show")) {
          linksList.classList.remove("show")
        } else {
          // Close any other open lists first
          document.querySelectorAll(".footer-links ul.show").forEach((list) => {
            list.classList.remove("show")
          })

          // Open this list
          linksList.classList.add("show")
        }
      }
    })
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    // If screen size becomes larger than mobile breakpoint,
    // remove all active/show classes to reset the footer
    if (window.innerWidth > 768) {
      document.querySelectorAll(".footer-links h3.active").forEach((heading) => {
        heading.classList.remove("active")
      })

      document.querySelectorAll(".footer-links ul.show").forEach((list) => {
        list.classList.remove("show")
      })
    }
  })

  // Add Font Awesome icons if they're missing
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement("link")
    fontAwesome.rel = "stylesheet"
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    document.head.appendChild(fontAwesome)
  }
})