import { formatPrice } from '../utils/format-price.js'

export function pricesInit() {
	document.querySelectorAll('.prices__old, .prices__value').forEach(price => {
		price.textContent = formatPrice(price.textContent);
	})
}