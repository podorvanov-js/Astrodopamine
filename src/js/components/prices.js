export function pricesInit() {
	const cards = document.querySelectorAll('.prices__card')

	cards.forEach((card) => {
		card.addEventListener('mouseenter', () => {
			if (!card.classList.contains('active')) {
				card.classList.add('hover')
			}
		})

		card.addEventListener('mouseleave', () => {
			card.classList.remove('hover')
		})

		card.addEventListener('click', () => {
			card.classList.remove('hover')
			card.classList.toggle('active')
		})
	})
}
