import holidays from '../../data/holidays.json'

const SALE_WINDOW_DAYS = 14

function getNextHoliday() {
	const now = new Date()
	const currentYear = now.getFullYear()

	let closest = null
	let closestDate = null

	for (const h of holidays) {
		for (const year of [currentYear, currentYear + 1]) {
			const date = new Date(year, h.month - 1, h.day, 23, 59, 59)
			if (date <= now) continue

			const diff = date - now
			const daysUntil = diff / (1000 * 60 * 60 * 24)

			if (daysUntil <= SALE_WINDOW_DAYS && (!closestDate || date < closestDate)) {
				closest = { ...h, date }
				closestDate = date
			}
		}
	}

	return closest
}

function disableSale() {
	const timer = document.querySelector('.prices__timer')
	if (timer) timer.style.display = 'none'

	document.querySelectorAll('.prices__card').forEach((card) => {
		const oldEl = card.querySelector('.prices__old')
		const valueEl = card.querySelector('.prices__value')
		if (oldEl && valueEl) {
			valueEl.textContent = oldEl.textContent
			oldEl.style.display = 'none'
		}
	})
}

function enableSale(holiday) {
	const label = document.querySelector('.timer__label')
	if (label) {
		label.innerHTML = `Скидки в честь праздника <span>«${holiday.name}»</span>`
	}
}

export function timer() {
	const days = document.querySelector('[data-timer-days]')
	const hours = document.querySelector('[data-timer-hours]')
	const minutes = document.querySelector('[data-timer-minutes]')
	const seconds = document.querySelector('[data-timer-seconds]')

	if (!days || !hours || !minutes || !seconds) return

	const holiday = getNextHoliday()

	if (!holiday) {
		disableSale()
		return
	}

	enableSale(holiday)

	let intervalId

	function update() {
		const now = new Date()
		const diff = holiday.date - now

		if (diff <= 0) {
			clearInterval(intervalId)
			disableSale()
			return
		}

		const d = Math.floor(diff / (1000 * 60 * 60 * 24))
		const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
		const m = Math.floor((diff / (1000 * 60)) % 60)
		const s = Math.floor((diff / 1000) % 60)

		days.textContent = d
		hours.textContent = String(h).padStart(2, '0')
		minutes.textContent = String(m).padStart(2, '0')
		seconds.textContent = String(s).padStart(2, '0')
	}

	update()
	intervalId = setInterval(update, 1000)
}