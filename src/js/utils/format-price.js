export function formatPrice(value) {
	return new Intl.NumberFormat('ru-RU').format(parseInt(value)) + '\u00a0₽';
}