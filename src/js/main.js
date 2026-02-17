import { burgerInit } from './components/burger.js'
import { footerInit } from './components/footer.js'
import { faqInit } from './components/faq.js'
import { reviewsInit } from './components/reviews.js'
import { scrollSpyInit } from './components/scroll-spy.js'
import { timer } from './components/timer.js'
import { modalInit } from './components/modal.js'
import { quizInit } from './components/quiz.js'
import { stickyInit } from './components/sticky.js'

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
})
