let lockCount = 0

export function lockScroll() {
	lockCount++
	if (lockCount === 1) {
		const paddingOffset = window.innerWidth - document.body.offsetWidth
		document.documentElement.style.overflow = 'hidden'
		document.documentElement.style.paddingRight = paddingOffset + 'px'
	}
}

export function unlockScroll() {
	lockCount = Math.max(0, lockCount - 1)
	if (lockCount === 0) {
		document.documentElement.style.overflow = ''
		document.documentElement.style.paddingRight = ''
	}
}
