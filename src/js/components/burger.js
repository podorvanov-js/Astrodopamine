export function burgerInit() {
	const burger = document.getElementById('burger-btn')
	const nav = document.getElementById('nav-menu')
	const overlay = document.getElementById('nav-overlay')

	if (!burger || !nav || !overlay) return

	function toggle() {
		const isOpen = nav.classList.toggle('active')
		overlay.classList.toggle('active', isOpen)
		burger.classList.toggle('active', isOpen)
		document.body.style.overflow = isOpen ? 'hidden' : ''
	}

	function shut() {
		nav.classList.remove('active')
		overlay.classList.remove('active')
		burger.classList.remove('active')
		document.body.style.overflow = ''
	}

	burger.addEventListener('click', toggle)
	overlay.addEventListener('click', shut)

	nav.querySelectorAll('.nav__link').forEach((link) => {
		link.addEventListener('click', shut)
	})

	window.addEventListener('resize', () => {
		if (window.innerWidth > 750 && nav.classList.contains('active')) {
			shut()
		}
	})
}
