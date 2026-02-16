export function modalInit() {
	const modal = document.querySelector('.modal');
	if (!modal) return;

	const contents = modal.querySelectorAll('[data-modal-content]');

	function hideAllContent() {
		contents.forEach(el => { el.hidden = true; });
	}

	function open(name) {
		hideAllContent();
		const target = modal.querySelector(`[data-modal-content="${name}"]`);
		if (target) target.hidden = false;
		modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
	}

	function close() {
		modal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
	}

	modal.querySelectorAll('[data-modal-close]').forEach(el => {
		el.addEventListener('click', close);
	});

	document.querySelectorAll('[data-modal-open]').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			open(btn.getAttribute('data-modal-open'));
		});
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
			close();
		}
	});
}
