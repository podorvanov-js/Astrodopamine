import { burgerInit } from './components/burger.js'
import { footerInit } from './components/footer.js'
import { faqInit } from './components/faq.js'
// import { pricesInit } from './components/prices.js'
import { videoBgInit } from './components/video-bg.js'
import { reviewsInit } from './components/reviews.js'
import { scrollSpyInit } from './components/scroll-spy.js'

document.addEventListener('DOMContentLoaded', function () {
	burgerInit();
	footerInit();
	faqInit();
	// pricesInit();
	videoBgInit();
	reviewsInit();
	scrollSpyInit();
})
