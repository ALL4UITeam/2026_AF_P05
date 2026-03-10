/**
 * 좌측 패널 접기/펴기 ( 위치검색 패널용)
 * 
 */
export function init() {
	const sidebarOpen = document.querySelectorAll('.map-search-sidebar__open');
	const sidebarClose = document.querySelectorAll('.map-search-sidebar__close');


	sidebarClose.forEach((close) => {
		close.addEventListener('click', () => {
			const targetSidebar = document.getElementById(close.getAttribute('data-target') || '');
			targetSidebar.classList.add('is-closed');
		});
	});

	sidebarOpen.forEach((open) => {
		open.addEventListener('click', () => {
			const targetSidebar = document.getElementById(open.getAttribute('data-target') || '');
			targetSidebar.classList.remove('is-closed');
		});
	});
}