/**
 * 배경지도 2D/3D 탭 전환
 * [data-basemap] 컨테이너 내 .map-basemap__tab 클릭 시 해당 패널만 노출
 * 실제 지도 모드 변경(setMapMode 등)은 라디오 change에서 연동
 */
const CONTAINER = '[data-basemap]';
const TAB_SELECTOR = '.map-basemap__tab';
const PANEL_SELECTOR = '.map-basemap__panel';
const HIDDEN_CLASS = 'map-basemap__panel--hidden';

function initBasemapTabs(root) {
	const tabs = root.querySelectorAll(TAB_SELECTOR);
	const panels = root.querySelectorAll(PANEL_SELECTOR);
	if (!tabs.length || !panels.length) return;

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const mode = tab.getAttribute('data-basemap-tab');
			if (!mode) return;
			tabs.forEach((t) => {
				t.classList.toggle('is-active', t === tab);
				t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
			});
			panels.forEach((panel) => {
				const panelMode = panel.getAttribute('data-basemap-panel');
				const isActive = panelMode === mode;
				panel.classList.toggle(HIDDEN_CLASS, !isActive);
				panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
			});
		});
	});
}

export function init() {
	document.querySelectorAll(CONTAINER).forEach(initBasemapTabs);
}
