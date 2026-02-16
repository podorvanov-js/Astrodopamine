export function scrollSpyInit() {
	const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
	if (!navLinks.length) return;

	const sections = Array.from(navLinks)
		.map(link => document.getElementById(link.getAttribute('href').slice(1)))
		.filter(Boolean);

	if (!sections.length) return;

	let currentActive = null;
	let ticking = false;

	function update() {
		const trigger = window.innerHeight * 0.3;
		let activeId = null;

		for (const section of sections) {
			if (section.getBoundingClientRect().top <= trigger) {
				activeId = section.id;
			}
		}

		if (activeId !== currentActive) {
			navLinks.forEach(link => {
				link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
			});
			currentActive = activeId;
		}

		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			requestAnimationFrame(update);
			ticking = true;
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	update();
}
