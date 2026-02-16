export function countdownInit() {
	const days = document.querySelector('[data-timer-days]');
	const hours = document.querySelector('[data-timer-hours]');
	const minutes = document.querySelector('[data-timer-minutes]');
	const seconds = document.querySelector('[data-timer-seconds]');

	if (!days || !hours || !minutes || !seconds) return;

	function getNextSundayMidnight() {
		const now = new Date();
		const dayOfWeek = now.getDay(); // 0 = Sunday
		const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

		const target = new Date(now);
		target.setDate(target.getDate() + daysUntilSunday);
		target.setHours(23, 59, 59, 0);

		if (now >= target) {
			target.setDate(target.getDate() + 7);
		}

		return target;
	}

	function update() {
		const now = new Date();
		const target = getNextSundayMidnight();
		const diff = target - now;

		if (diff <= 0) {
			days.textContent = '0';
			hours.textContent = '00';
			minutes.textContent = '00';
			seconds.textContent = '00';
			return;
		}

		const d = Math.floor(diff / (1000 * 60 * 60 * 24));
		const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const m = Math.floor((diff / (1000 * 60)) % 60);
		const s = Math.floor((diff / 1000) % 60);

		days.textContent = d;
		hours.textContent = String(h).padStart(2, '0');
		minutes.textContent = String(m).padStart(2, '0');
		seconds.textContent = String(s).padStart(2, '0');
	}

	update();
	setInterval(update, 1000);
}