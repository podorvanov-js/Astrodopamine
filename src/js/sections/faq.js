export function faqInit() {
	const items = document.querySelectorAll('.faq__item')

	items.forEach((item) => {
		item.querySelector('.faq__question').addEventListener('click', () => {
			const isActive = item.classList.contains('active')

			items.forEach((i) => i.classList.remove('active'))

			if (!isActive) {
				item.classList.add('active')
			}
		})
	})
}
