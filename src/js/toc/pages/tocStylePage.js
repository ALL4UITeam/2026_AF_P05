// src/js/toc/pages/tocStylePage.js
import { initTocTabs } from '../ui/tocTabs.js';
import { initLayerTree } from '../ui/layerTree.js';
import { initLayerSearch } from '../ui/layerSearch.js';
import { initStyleEditor, openStyleCard } from '../ui/styleEditor.js';

export function init(ctx) {
	const sidebar = document.getElementById('tocStyleSidebar');
	if (!sidebar) return;

	initTocTabs(sidebar, ctx);

	const searchPanel = sidebar.querySelector('[data-toc-panel="search"]');
	initLayerTree(searchPanel?.querySelector('[data-toc-search-results]'), ctx);
	initLayerSearch(searchPanel, ctx);

	const cardsContainer = document.querySelector('[data-toc-style-cards]');
	initStyleEditor(cardsContainer, ctx);

	// 레이어 항목 클릭 → 스타일 카드 열기 (체크박스 제외 영역)
	const searchResults = sidebar.querySelector('[data-toc-search-results]');
	if (searchResults && cardsContainer) {
		searchResults.addEventListener('click', (e) => {
			if (e.target.tagName === 'INPUT') return;

			const layerItem = e.target.closest('.toc-layer-item');
			if (!layerItem) return;

			// 선택 시각 표시
			searchResults.querySelectorAll('.toc-layer-item').forEach((el) =>
				el.classList.toggle('is-selected', el === layerItem)
			);

			const layerId = layerItem.getAttribute('data-layer-id');
			if (layerId) {
				ctx.layerManager.selectLayer(layerId);
			}

			openStyleCard(cardsContainer, layerItem);
		});
	}
}
