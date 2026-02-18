import { burgerInit } from './components/burger.js'
import { pricesInit } from './sections/prices.js'
import { footerInit } from './components/footer.js'
import { faqInit } from './sections/faq.js'
import { reviewsInit } from './sections/reviews.js'
import { scrollSpyInit } from './sections/scroll-spy.js'
import { timer } from './sections/timer.js'
import { modalInit } from './components/modal.js'
import { quizInit } from './sections/quiz.js'
import { stickyInit } from './sections/sticky.js'

document.addEventListener('DOMContentLoaded', function () {
	burgerInit();
	footerInit();
	faqInit();
	reviewsInit();
	scrollSpyInit();
	timer();
	modalInit();
	quizInit();
	stickyInit();
	pricesInit();
})
