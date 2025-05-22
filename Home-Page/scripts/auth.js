document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loginBtn = document.getElementById("loginBtn")
  const registerBtn = document.getElementById("registerBtn")
  const userProfile = document.getElementById("userProfile")
  const dashboardBtn = document.getElementById("dashboardBtn")
  const userName = document.getElementById("userName")
  const logoutBtn = document.getElementById("logoutBtn")

  // Mobile elements
  const mobileLoginBtn = document.getElementById("mobileLoginBtn")
  const mobileRegisterBtn = document.getElementById("mobileRegisterBtn")
  const mobileDashboardBtn = document.getElementById("mobileDashboardBtn")
  const mobileUserInfo = document.getElementById("mobileUserInfo")
  const mobileUserName = document.getElementById("mobileUserName")
  const mobileLogoutBtn = document.getElementById("mobileLogoutBtn")

  // Hamburger menu
  const hamburger = document.querySelector(".hamburger")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      mobileMenu.classList.toggle("active")
      document.body.classList.toggle("no-scroll")
    })
  }

  // Check if user is logged in (from localStorage)
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userType = localStorage.getItem("userType")
    const name = localStorage.getItem("userName")

    if (isLoggedIn === "true") {
      // Show logged in state - Desktop
      if (loginBtn) loginBtn.style.display = "none"
      if (registerBtn) registerBtn.style.display = "none"
      if (userProfile) userProfile.style.display = "block"

      // Show the appropriate dashboard button based on user type
      const studentDashboardBtn = document.getElementById("dashboardBtn")
      const adminDashboardBtn = document.getElementById("dashboardBtn1")

      if (userType === "student") {
        if (studentDashboardBtn) studentDashboardBtn.style.display = "inline-block"
        if (adminDashboardBtn) adminDashboardBtn.style.display = "none"
      } else if (userType === "admin") {
        if (studentDashboardBtn) studentDashboardBtn.style.display = "none"
        if (adminDashboardBtn) adminDashboardBtn.style.display = "inline-block"
      }

      // Show logged in state - Mobile
      if (mobileLoginBtn) mobileLoginBtn.style.display = "none"
      if (mobileRegisterBtn) mobileRegisterBtn.style.display = "none"

      // Update mobile dashboard button based on user type
      if (mobileDashboardBtn) {
        mobileDashboardBtn.style.display = "block"
        if (userType === "student") {
          mobileDashboardBtn.href = "Student-Dashboard"
          mobileDashboardBtn.textContent = "Student Dashboard"
        } else if (userType === "admin") {
          mobileDashboardBtn.href = "admin-Dashboard"
          mobileDashboardBtn.textContent = "Admin Dashboard"
        }
      }

      if (mobileUserInfo) mobileUserInfo.style.display = "flex"

      // Set user name
      if (name) {
        if (userName) userName.textContent = name
        if (mobileUserName) mobileUserName.textContent = name
      }

      // Add user type class if needed
      if (userType && userProfile) {
        userProfile.className = "user-profile"
        userProfile.classList.add(`user-${userType}`)
      }
    } else {
      // Show logged out state - Desktop
      if (loginBtn) loginBtn.style.display = "inline-block"
      if (registerBtn) registerBtn.style.display = "inline-block"
      if (userProfile) userProfile.style.display = "none"

      // Hide all dashboard buttons
      const studentDashboardBtn = document.getElementById("dashboardBtn")
      const adminDashboardBtn = document.getElementById("dashboardBtn1")
      if (studentDashboardBtn) studentDashboardBtn.style.display = "none"
      if (adminDashboardBtn) adminDashboardBtn.style.display = "none"

      // Show logged out state - Mobile
      if (mobileLoginBtn) mobileLoginBtn.style.display = "block"
      if (mobileRegisterBtn) mobileRegisterBtn.style.display = "block"
      if (mobileDashboardBtn) mobileDashboardBtn.style.display = "none"
      if (mobileUserInfo) mobileUserInfo.style.display = "none"
    }
  }

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      handleLogout()
    })
  }

  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      handleLogout()
    })
  }

  function handleLogout() {
    // Clear login data
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")

    // Update UI
    checkLoginStatus()

    // Remove any user type classes
    if (userProfile) {
      userProfile.className = "user-profile"
    }

    // Close mobile menu if open
    if (hamburger && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("no-scroll")
    }

    // Show message
    alert("Logged out successfully!")
  }

  // Check login status on page load
  checkLoginStatus()

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.classList.remove("no-scroll")
      }
    })
  })
})
