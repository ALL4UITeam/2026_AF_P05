/**
 * 좌측 패널 접기/펴기 ( 위치검색 패널용)
 */

import { bindMapUiTabs } from './mapUiTabs.js';

const SIDEBAR_SELECTOR = '.map-search-sidebar';
const BREADCRUMB_SELECTOR = '.map-search-breadcrumb';
const STICKY_CLASS = 'left-sticky';

function syncBreadcrumb() {
	const breadcrumb = document.querySelector(BREADCRUMB_SELECTOR);
	if (!breadcrumb) return;
	const hasOpen = [...document.querySelectorAll(SIDEBAR_SELECTOR)].some((el) =>
		el.classList.contains('is-open')
	);
	breadcrumb.classList.toggle(STICKY_CLASS, !hasOpen);
}

export function init() {
	const sidebarClose = document.querySelectorAll('.map-search-sidebar__close');

	sidebarClose.forEach((close) => {
		close.addEventListener('click', () => {
			const targetSidebar = document.getElementById(close.getAttribute('data-target') || '');
			if (!targetSidebar) return;
			targetSidebar.classList.remove('is-open');
			syncBreadcrumb();
		});
	});

	const sidebarOpen = document.querySelectorAll('.map-search-sidebar__open');
	sidebarOpen.forEach((open) => {
		open.addEventListener('click', () => {
			const targetSidebar = document.getElementById(open.getAttribute('data-target') || '');
			if (!targetSidebar) return;
			targetSidebar.classList.add('is-open');
			syncBreadcrumb();
		});
	});

	// MutationObserver: 외부에서 is-open 추가/제거될 때도 반영
	document.querySelectorAll(SIDEBAR_SELECTOR).forEach((sidebar) => {
		new MutationObserver(() => syncBreadcrumb()).observe(sidebar, {
			attributes: true,
			attributeFilter: ['class'],
		});
	});

	syncBreadcrumb();

	const statisticsTabsRoot = document.querySelector('[data-statistics-tabs]');
	if (statisticsTabsRoot) bindMapUiTabs(statisticsTabsRoot);
}