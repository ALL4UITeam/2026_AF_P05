// src/js/toc/pages/tocManagePage.js
import { initTocTabs } from '../ui/tocTabs.js';
import { initLayerTree } from '../ui/layerTree.js';
import { initLayerSearch } from '../ui/layerSearch.js';
import { initEditTree } from '../ui/editTree.js';
import { initLayerAddModal } from '../ui/layerAddModal.js';

export function init(ctx) {
	const sidebar = document.getElementById('tocSidebar');
	if (!sidebar) return;

	initTocTabs(sidebar, ctx);

	const searchPanel = sidebar.querySelector('[data-toc-panel="search"]');
	initLayerTree(searchPanel?.querySelector('[data-toc-search-results]'), ctx);
	initLayerSearch(searchPanel, ctx);

	const managePanel = sidebar.querySelector('[data-toc-panel="manage"]');
	initEditTree(managePanel?.querySelector('[data-toc-manage-tree]'), ctx);

	initLayerAddModal(ctx);

	// 그룹 추가
	const addGroupBtn = sidebar.querySelector('[data-toc-add-group]');
	if (addGroupBtn) {
		addGroupBtn.addEventListener('click', () => {
			const name = prompt('새 그룹 이름을 입력하세요:');
			if (name?.trim()) {
				ctx.groupManager.addGroup(name.trim());
			}
		});
	}

	// 저장
	const saveBtn = sidebar.querySelector('[data-toc-save]');
	const saveNameInput = sidebar.querySelector('[data-toc-save-name]');
	if (saveBtn && saveNameInput) {
		saveBtn.addEventListener('click', () => {
			const name = saveNameInput.value.trim();
			if (!name) {
				saveNameInput.focus();
				return;
			}
			ctx.savedManager.saveCurrentConfig(name);
			saveNameInput.value = '';
			alert(`"${name}" 설정이 저장되었습니다.`);
		});
	}

	// 목록 이동
	const listBtn = sidebar.querySelector('[data-toc-list]');
	if (listBtn) {
		listBtn.addEventListener('click', () => {
			window.location.href = 'toc-saved-list.html';
		});
	}
}
