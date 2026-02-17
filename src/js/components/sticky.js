function parseOffset(raw) {
	if (!raw) return []

	const entries = raw.split(',').map((s) => s.trim())
	const result = []

	for (const entry of entries) {
		if (entry.includes(':')) {
			const [bp, val] = entry.split(':')
			result.push({ bp: parseInt(bp, 10), value: parseInt(val, 10) })
		} else {
			result.push({ bp: Infinity, value: parseInt(entry, 10) })
		}
	}

	result.sort((a, b) => a.bp - b.bp)
	return result
}

function getOffset(entries) {
	const w = window.innerWidth
	for (const e of entries) {
		if (w <= e.bp) return e.value
	}
	return entries.length ? entries[entries.length - 1].value : 0
}

export function stickyInit() {
	const wrappers = document.querySelectorAll('[data-sticky]')
	if (!wrappers.length) return

	wrappers.forEach((wrapper) => {
		const head = wrapper.firstElementChild
		const list = wrapper.lastElementChild
		if (!head || !list || head === list) return

		head.style.position = 'sticky'

		const offsets = parseOffset(wrapper.dataset.stickyOffset)
		let rafId = null

		function calc() {
			head.style.paddingBottom = ''
			head.style.marginBottom = ''
			list.style.marginTop = ''
			for (let i = 0; i < list.children.length; i++) {
				list.children[i].style.position = 'sticky'
				list.children[i].style.top = ''
			}

			const offset = getOffset(offsets)
			const headHeight = head.offsetHeight

			if (!list.children.length) return

			if (!headHeight) {
				for (let i = 0; i < list.children.length; i++) {
					list.children[i].style.top = offset + 'px'
				}
				return
			}

			const gap = parseFloat(getComputedStyle(head).marginBottom) || 0

			let cardHeight = 0
			for (let i = 0; i < list.children.length; i++) {
				cardHeight = Math.max(cardHeight, list.children[i].offsetHeight)
			}

			head.style.top = offset + 'px'
			head.style.paddingBottom = (gap + cardHeight) + 'px'
			head.style.marginBottom = '0px'
			list.style.marginTop = -cardHeight + 'px'

			const cardTop = offset + headHeight + gap
			for (let i = 0; i < list.children.length; i++) {
				list.children[i].style.top = cardTop + 'px'
			}
		}

		function scheduleCalc() {
			if (rafId) return
			rafId = requestAnimationFrame(() => {
				rafId = null
				calc()
			})
		}

		calc()

		const ro = new ResizeObserver(scheduleCalc)
		ro.observe(head)
		if (list.children[0]) ro.observe(list.children[0])
	})
}