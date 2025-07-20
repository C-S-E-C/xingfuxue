// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.setTheme(this.theme)
    this.bindEvents()
  }

  setTheme(theme) {
    this.theme = theme
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  toggleTheme() {
    const newTheme = this.theme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  bindEvents() {
    const themeToggle = document.getElementById("theme-toggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.nav = document.getElementById("nav-menu")
    this.toggle = document.getElementById("nav-toggle")
    this.links = document.querySelectorAll(".nav-link")
    this.header = document.getElementById("header")
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.toggle) {
      this.toggle.addEventListener("click", () => this.toggleMobileMenu())
    }

    // Navigation links
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e))
    })

    // Scroll events
    window.addEventListener("scroll", () => this.handleScroll())

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => this.handleOutsideClick(e))
  }

  toggleMobileMenu() {
    this.nav.classList.toggle("active")
    this.toggle.classList.toggle("active")
  }

  handleNavClick(e) {
    const href = e.target.getAttribute("href")

    if (href.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const headerHeight = this.header.offsetHeight
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }

      // Update active link
      this.updateActiveLink(e.target)

      // Close mobile menu
      this.nav.classList.remove("active")
      this.toggle.classList.remove("active")
    }
  }

  updateActiveLink(activeLink) {
    this.links.forEach((link) => link.classList.remove("active"))
    activeLink.classList.add("active")
  }

  handleScroll() {
    const scrollY = window.scrollY

    // Header scroll effect
    if (scrollY > 100) {
      this.header.style.background = "var(--bg-primary)"
      this.header.style.backdropFilter = "blur(10px)"
    } else {
      this.header.style.background = "var(--bg-primary)"
      this.header.style.backdropFilter = "none"
    }

    // Update active navigation based on scroll position
    this.updateActiveNavOnScroll()
  }

  updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]")
    const headerHeight = this.header.offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionBottom = sectionTop + section.offsetHeight
      const scrollPosition = window.scrollY

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`)
        if (correspondingLink) {
          this.links.forEach((link) => link.classList.remove("active"))
          correspondingLink.classList.add("active")
        }
      }
    })
  }

  handleOutsideClick(e) {
    if (!this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
      this.nav.classList.remove("active")
      this.toggle.classList.remove("active")
    }
  }
}

// Scroll Animation Manager
class ScrollAnimationManager {
  constructor() {
    this.elements = document.querySelectorAll(".animate-on-scroll")
    this.init()
  }

  init() {
    this.bindEvents()
    this.checkVisibility()
  }

  bindEvents() {
    window.addEventListener("scroll", () => this.checkVisibility())
    window.addEventListener("resize", () => this.checkVisibility())
  }

  checkVisibility() {
    this.elements.forEach((element) => {
      // Always ensure elements are visible
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"

      if (this.isElementInViewport(element)) {
        element.classList.add("animated")
      }
    })
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    return (
      (rect.top >= 0 && rect.top <= windowHeight * 0.8) ||
      (rect.bottom >= windowHeight * 0.2 && rect.bottom <= windowHeight)
    )
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    this.lazyLoadImages()
    this.preloadCriticalResources()
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]')

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src || img.src
            img.classList.remove("lazy")
            observer.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }
  }

  preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement("link")
    fontLink.rel = "preload"
    fontLink.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap"
    fontLink.as = "style"
    document.head.appendChild(fontLink)
  }
}

// Accessibility Manager
class AccessibilityManager {
  constructor() {
    this.init()
  }

  init() {
    this.handleKeyboardNavigation()
    this.announcePageChanges()
  }

  handleKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation")
      }
    })

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-navigation")
    })
  }

  announcePageChanges() {
    // Create live region for screen readers
    const liveRegion = document.createElement("div")
    liveRegion.setAttribute("aria-live", "polite")
    liveRegion.setAttribute("aria-atomic", "true")
    liveRegion.className = "sr-only"
    document.body.appendChild(liveRegion)

    // Announce section changes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionTitle = entry.target.querySelector("h1, h2, h3")
            if (sectionTitle) {
              liveRegion.textContent = `进入${sectionTitle.textContent}部分`
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section)
    })
  }
}

// Utility Functions
const utils = {
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - document.getElementById("header").offsetHeight - 20
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  },
}

// Initialize Application
class App {
  constructor() {
    this.init()
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initializeComponents())
    } else {
      this.initializeComponents()
    }
  }

  initializeComponents() {
    try {
      // Initialize all managers
      this.themeManager = new ThemeManager()
      this.navigationManager = new NavigationManager()
      this.scrollAnimationManager = new ScrollAnimationManager()
      this.performanceOptimizer = new PerformanceOptimizer()
      this.accessibilityManager = new AccessibilityManager()
      var fuckie = document.createElement("script")
      fuckie.src="https://cdn.rawgit.com/bullgit/fuckIE/master/fuckie.js";
      document.head.appendChild(fuckie)
      // Add scroll animations to elements
      this.addScrollAnimations()

      // Initialize custom interactions
      this.initializeCustomInteractions()

      console.log("🎉 Xingfuxue website initialized successfully!")
    } catch (error) {
      console.error("FUCK!❌ Error initializing website:", error)
    }
  }

  addScrollAnimations() {
    const animatedElements = [
      ".section-header",
      ".about-content",
      ".professor-card",
      ".article-card",
      ".team-member",
      ".book-card",
      ".achievement-card",
      ".gallery-item",
    ]

    animatedElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        // Don't add the animate-on-scroll class that hides content
        // element.classList.add("animate-on-scroll")

        // Instead, ensure content is always visible
        element.style.opacity = "1"
        element.style.visibility = "visible"
      })
    })
  }

  initializeCustomInteractions() {
    // Add hover effects to cards
    document.querySelectorAll(".professor-card, .article-card, .book-card, .team-member").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px) scale(1.02)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })

    // Add click analytics (placeholder)
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", function (e) {
        console.log("Button clicked:", this.textContent.trim())
        // Here you could add analytics tracking
      })
    })
  }
}

// Start the application
const app = new App()

// Add CSS for screen reader only content and keyboard navigation
const additionalCSS = `
.keyboard-navigation *:focus {
    outline: 2px solid var(--primary-color) !important;
    outline-offset: 2px !important;
}
`

const style = document.createElement("style")
style.textContent = additionalCSS
document.head.appendChild(style)
