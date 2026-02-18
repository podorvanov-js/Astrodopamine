import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'

export function reviewsInit() {
	const el = document.querySelector('.reviews__slider')
	if (!el) return

	const swiper = new Swiper(el, {
		modules: [Autoplay, Pagination],
		loop: true,
		speed: 600,
		autoHeight: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.reviews__pagination',
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			769: {
				slidesPerView: 2,
				spaceBetween: 40,
			},
		},
	})

	document.fonts.ready.then(() => swiper.update())
}
