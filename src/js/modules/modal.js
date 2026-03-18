/**
 * 모달 닫기: .map-ui-modal__close 클릭 시 해당 백드롭 닫기
 */
export function init() {
	document.querySelectorAll('.map-ui-modal__close').forEach((closeBtn) => {
		const backdrop = closeBtn.closest('.map-ui-modal-backdrop');
		if (!backdrop) return;
		closeBtn.addEventListener('click', () => {
			backdrop.classList.remove('is-open');
			backdrop.setAttribute('aria-hidden', 'true');
		});
	});
}
