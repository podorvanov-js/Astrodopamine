document.addEventListener('DOMContentLoaded', function () {
	// --- Burger Menu Logic ---
	const burger = document.getElementById('burger-btn')
	const nav = document.getElementById('nav-menu')
	const overlay = document.getElementById('nav-overlay')
	const closeX = document.getElementById('close-x')

	// Check if all menu elements exist before adding listeners
	if (burger && nav && overlay && closeX) {
		function openMenu() {
			nav.classList.add('open')
			burger.classList.add('open')
			overlay.classList.add('open')
			closeX.style.display = 'flex'
			document.body.style.overflow = 'hidden'
		}

		function closeMenu() {
			nav.classList.remove('open')
			burger.classList.remove('open')
			overlay.classList.remove('open')
			closeX.style.display = 'none'
			document.body.style.overflow = ''
		}

		burger.addEventListener('click', function (e) {
			e.stopPropagation()
			if (nav.classList.contains('open')) {
				closeMenu()
			} else {
				openMenu()
			}
		})

		closeX.addEventListener('click', function (e) {
			e.stopPropagation()
			closeMenu()
		})

		overlay.addEventListener('click', closeMenu)

		nav.addEventListener('click', function (e) {
			// Prevent closing menu when clicking inside the nav panel
			e.stopPropagation()
		})

		// Close menu on link click on mobile
		document.querySelectorAll('.site-link').forEach((link) => {
			link.addEventListener('click', () => {
				if (window.innerWidth <= 750) {
					closeMenu()
				}
			})
		})

		// Adjust menu on resize
		window.addEventListener('resize', () => {
			if (window.innerWidth > 750) {
				// If menu is open and we resize to desktop, close it
				if (nav.classList.contains('open')) {
					closeMenu()
				}
			}
		})
	}
	// --- Footer Year Logic ---
	const yearSpan = document.getElementById('year')
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear()
	}
})
