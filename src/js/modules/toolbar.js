/**
 * 툴바: data-tool 기준 옵션창 열기/닫기, is-active 연동 (범용)
 * - .map-toolbar__btn[data-tool] 클릭 → .map-options[data-tool="동일값"] 토글 + 해당 버튼 is-active
 * - .map-options__close-btn 클릭 → 해당 옵션창 닫기 + data-tool 로 연동된 툴바 버튼 is-active 제거
 */
const TOOLBAR_BTN_SELECTOR = '.map-toolbar__btn[data-tool]';

function getTriggerButton(tool) {
	return document.querySelector(`${TOOLBAR_BTN_SELECTOR}[data-tool="${tool}"]`);
}

export function init() {
	// 툴바 버튼 클릭 → 해당 data-tool 옵션창 토글 + 버튼 is-active
	document.querySelectorAll(TOOLBAR_BTN_SELECTOR).forEach((btn) => {
		btn.addEventListener('click', function () {
			const tool = this.getAttribute('data-tool');
			if (!tool) return;
			
			const panel = document.querySelector(`.map-options[data-tool-type="${tool}"], .map-roadview[data-tool-type="${tool}"], .map-basemap[data-tool-type="${tool}"]`);
			if (!panel) {
				this.classList.toggle('is-active');
				return;
			}
			panel.classList.toggle('is-open');
			panel.setAttribute('aria-hidden', panel.classList.contains('is-open') ? 'false' : 'true');
			this.classList.toggle('is-active', panel.classList.contains('is-open'));
		});
	});

	// 옵션창/로드뷰 닫기 → 해당 패널 닫고 툴바 버튼 is-active 제거
	// (.map-options__close div가 20x20 아이콘으로 클릭을 받기 때문에 div/버튼 둘 다 처리)
	function closePanel(closeEl) {
		const tool = closeEl.getAttribute('data-tool-type');
		let panel = closeEl.closest('.map-options') || closeEl.closest('.map-roadview') || closeEl.closest('.map-basemap');
		if (!panel && tool) {
			panel = document.querySelector(`.map-options[data-tool-type="${tool}"], .map-roadview[data-tool-type="${tool}"], .map-basemap[data-tool-type="${tool}"]`);
		}
		if (!panel) return;
		panel.classList.remove('is-open');
		panel.setAttribute('aria-hidden', 'true');
		const t = tool || panel.getAttribute('data-tool-type');
		const triggerBtn = t ? getTriggerButton(t) : null;
		if (triggerBtn) triggerBtn.classList.remove('is-active');
	}

	function onCloseClick(e) {
		e.preventDefault();
		e.stopPropagation();
		const target = e.currentTarget;
		closePanel(target);
	}

	document.querySelectorAll('.map-options__close-btn, .map-options__close').forEach((el) => {
		el.addEventListener('click', onCloseClick);
	});

	document.addEventListener('click', (e) => {
		const closeEl = e.target.closest('.map-options__close-btn, .map-options__close');
		if (!closeEl) return;
		e.preventDefault();
		closePanel(closeEl);
	});
}
