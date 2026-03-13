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
			// 주제도: 사이드바(themePanel) 열기/닫기
			if (tool === 'theme') {
				const themePanel = document.getElementById('themePanel');
				if (themePanel) {
					themePanel.classList.toggle('is-closed');
					this.classList.toggle('is-active', !themePanel.classList.contains('is-closed'));
				}
				return;
			}
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

	// 옵션창/로드뷰 닫기 버튼 → 해당 패널 닫고, data-tool 로 연동된 툴바 버튼 is-active 제거
	document.addEventListener('click', (e) => {
		const closeBtn = e.target.closest('.map-options__close-btn');
		if (!closeBtn) return;
		const panel = closeBtn.closest('.map-options') || closeBtn.closest('.map-roadview') || closeBtn.closest('.map-basemap');
		if (!panel) return;
		const tool = panel.getAttribute('data-tool-type');
		panel.classList.remove('is-open');
		panel.setAttribute('aria-hidden', 'true');
		const triggerBtn = tool ? getTriggerButton(tool) : null;
		if (triggerBtn) triggerBtn.classList.remove('is-active');
	});
}
