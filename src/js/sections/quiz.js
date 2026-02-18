import services from '../../data/services.json'

const SERVICES_MAP = {};
services.forEach(s => { SERVICES_MAP[s.id] = s; });

const TOTAL_STEPS = 4;

export function quizInit() {
	const quiz = document.getElementById('quiz');
	if (!quiz) return;

	const progressBar = quiz.querySelector('[data-quiz-progress]');
	const steps = quiz.querySelectorAll('[data-quiz-step]');
	const resultTitle = quiz.querySelector('[data-quiz-result-title]');
	const resultDesc = quiz.querySelector('[data-quiz-result-desc]');
	const resultOld = quiz.querySelector('[data-quiz-result-old]');
	const resultValue = quiz.querySelector('[data-quiz-result-value]');
	const resultLink = quiz.querySelector('[data-quiz-result-link]');

	let currentStep = 0;
	let scores = {};

	function resetScores() {
		scores = {};
		Object.keys(SERVICES_MAP).forEach(key => { scores[key] = 0; });
	}

	function showStep(index) {
		steps.forEach(step => {
			const val = step.getAttribute('data-quiz-step');
			step.hidden = val !== String(index) && val !== index;
		});

		const progress = index === 'result' ? 100 : ((index) / TOTAL_STEPS) * 100;
		progressBar.style.width = progress + '%';
	}

	function getTopService() {
		let maxScore = -1;
		let topKey = 'dna';
		for (const key in scores) {
			if (scores[key] > maxScore) {
				maxScore = scores[key];
				topKey = key;
			}
		}
		return SERVICES_MAP[topKey];
	}

	function showResult() {
		const service = getTopService();
		resultTitle.textContent = service.title;
		resultDesc.textContent = service.desc;
		resultOld.textContent = service.old;
		resultValue.textContent = service.price;
		resultLink.href = service.link;
		showStep('result');
	}

	function handleOptionClick(btn) {
		const raw = btn.getAttribute('data-scores');
		if (raw) {
			raw.split(',').forEach(pair => {
				const [key, val] = pair.split(':');
				scores[key] = (scores[key] || 0) + Number(val);
			});
		}

		currentStep++;
		if (currentStep >= TOTAL_STEPS) {
			showResult();
		} else {
			showStep(currentStep);
		}
	}

	function reset() {
		resetScores();
		currentStep = 0;
		showStep(0);
	}

	quiz.querySelectorAll('.quiz__option').forEach(btn => {
		btn.addEventListener('click', () => handleOptionClick(btn));
	});

	const restartBtn = quiz.querySelector('[data-quiz-restart]');
	if (restartBtn) {
		restartBtn.addEventListener('click', reset);
	}

	const modalContent = quiz.closest('[data-modal-content]');
	if (modalContent) {
		const observer = new MutationObserver(() => {
			if (!modalContent.hidden) reset();
		});
		observer.observe(modalContent, { attributes: true, attributeFilter: ['hidden'] });
	}
}
