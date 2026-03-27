// src/js/toc/ui/layerTree.js
// 레이어 검색 탭의 트리 UI — 체크박스 토글 + 그룹 접기/펴기

export function initLayerTree(container, ctx) {
	if (!container) return;

	container.addEventListener('click', (e) => {
		const groupHeader = e.target.closest('.toc-group__header');
		if (groupHeader && e.target.tagName !== 'INPUT') {
			const groupEl = groupHeader.closest('.toc-group');
			const children = groupEl?.querySelector('.toc-group__children');
			const caret = groupHeader.querySelector('.map-ui-tree__caret');
			if (children) {
				children.classList.toggle('is-hidden');
				caret?.classList.toggle('map-ui-tree__caret--open');
			}
		}

		const folderRow = e.target.closest('.toc-group__folder');
		if (folderRow) {
			const next = folderRow.nextElementSibling;
			const caret = folderRow.querySelector('.map-ui-tree__caret');
			while (next && next.classList.contains('toc-layer-item--nested')) {
				next.classList.toggle('is-hidden');
			}
			caret?.classList.toggle('map-ui-tree__caret--open');
		}
	});

	container.addEventListener('change', (e) => {
		const layerCheck = e.target.closest('[data-layer-check]');
		if (layerCheck) {
			const layerId = layerCheck.getAttribute('data-layer-check');
			ctx.layerManager.toggleVisibility(layerId);
		}

		const groupCheck = e.target.closest('[data-group-check]');
		if (groupCheck) {
			const groupId = groupCheck.getAttribute('data-group-check');
			ctx.groupManager.toggleGroup(groupId);
		}
	});
}
