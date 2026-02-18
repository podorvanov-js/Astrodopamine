let lockCount = 0

export function lockScroll() {
	lockCount++
	if (lockCount === 1) {
		const paddingOffset = window.innerWidth - document.body.offsetWidth
		document.documentElement.style.overflow = 'hidden'
		document.body.style.paddingRight = paddingOffset + 'px'
		document.body.style.overflow = 'hidden'
	}
}

export function unlockScroll() {
	lockCount = Math.max(0, lockCount - 1)
	if (lockCount === 0) {
		document.documentElement.style.overflow = ''
		document.body.style.paddingRight = ''
		document.body.style.overflow = ''
	}
}
