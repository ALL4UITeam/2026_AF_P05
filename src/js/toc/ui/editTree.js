// src/js/toc/ui/editTree.js
// TOC 관리 탭 — 편집 트리 UI (그룹 선택, 접기/펴기, 도구 버튼)

export function initEditTree(container, ctx) {
	if (!container) return;

	container.addEventListener('click', (e) => {
		// 그룹 헤더 클릭 → 선택 + 접기/펴기
		const header = e.target.closest('.toc-edit-group__header');
		if (header && e.target.tagName !== 'INPUT' && !e.target.closest('.toc-edit-group__toolbar')) {
			const groupEl = header.closest('.toc-edit-group');
			const groupId = groupEl?.getAttribute('data-edit-group');

			// 선택 토글
			container.querySelectorAll('.toc-edit-group').forEach((g) =>
				g.classList.toggle('is-selected', g === groupEl)
			);

			if (groupId) {
				ctx.groupManager.selectGroup(groupId);
			}

			// 접기/펴기
			const children = groupEl?.querySelector('.toc-edit-group__children');
			const caret = header.querySelector('.map-ui-tree__caret');
			if (children) {
				children.classList.toggle('is-hidden');
				caret?.classList.toggle('map-ui-tree__caret--open');
			}
		}

		// 도구 버튼
		const toolBtn = e.target.closest('.toc-edit-group__tool');
		if (toolBtn) {
			const tool = toolBtn.getAttribute('data-tool');
			const groupEl = toolBtn.closest('.toc-edit-group');
			const groupId = groupEl?.getAttribute('data-edit-group');

			switch (tool) {
				case 'move-up':
					if (groupId) ctx.groupManager.moveGroup(groupId, 'up');
					break;
				case 'move-down':
					if (groupId) ctx.groupManager.moveGroup(groupId, 'down');
					break;
				case 'delete':
					if (groupId && confirm('이 그룹을 삭제하시겠습니까?')) {
						ctx.groupManager.removeGroup(groupId);
						groupEl?.remove();
					}
					break;
			}
		}

		// 폴더 접기/펴기
		const subFolder = e.target.closest('.toc-edit-group__sub-folder');
		if (subFolder && e.target.tagName !== 'INPUT') {
			const layers = subFolder.querySelector('.toc-edit-group__layers');
			if (layers) {
				layers.classList.toggle('is-hidden');
			}
		}
	});

	// 체크박스
	container.addEventListener('change', (e) => {
		const checkbox = e.target.closest('input[type="checkbox"]');
		if (!checkbox) return;

		const editLayer = checkbox.closest('.toc-edit-layer');
		if (editLayer) {
			// 개별 레이어 토글 (데이터 연동은 store 기반)
			return;
		}

		const editGroup = checkbox.closest('.toc-edit-group');
		if (editGroup) {
			const groupId = editGroup.getAttribute('data-edit-group');
			if (groupId) ctx.groupManager.toggleGroup(groupId);
		}
	});
}
