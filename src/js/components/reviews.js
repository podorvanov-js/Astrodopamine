import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export function reviewsInit() {
	const el = document.querySelector('.reviews__slider')
	if (!el) return

	new Swiper(el, {
		modules: [Autoplay],
		loop: true,
		speed: 600,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 16,
			},
			769: {
				slidesPerView: 2,
				spaceBetween: 28,
			},
		},
	})
}
