// src/js/toc/ui/layerSearch.js
import { ACTION } from '../core/stateStore.js';

export function initLayerSearch(container, ctx) {
	const input = container?.querySelector('[data-toc-search-input]');
	if (!input) return;

	let debounceTimer = null;

	input.addEventListener('input', () => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			const query = input.value.trim().toLowerCase();
			ctx.store.dispatch({ type: ACTION.SET_UI, key: 'searchQuery', value: query });
			filterTree(container, query);
		}, 200);
	});
}

function filterTree(container, query) {
	const items = container.querySelectorAll('.toc-layer-item');
	const groups = container.querySelectorAll('.toc-group');

	if (!query) {
		items.forEach((el) => el.classList.remove('is-hidden'));
		groups.forEach((el) => el.classList.remove('is-hidden'));
		return;
	}

	groups.forEach((group) => {
		const layers = group.querySelectorAll('.toc-layer-item');
		let hasMatch = false;

		layers.forEach((layer) => {
			const name = layer.querySelector('.toc-layer-item__name')?.textContent?.toLowerCase() || '';
			const code = layer.querySelector('.toc-layer-item__code')?.textContent?.toLowerCase() || '';
			const match = name.includes(query) || code.includes(query);
			layer.classList.toggle('is-hidden', !match);
			if (match) hasMatch = true;
		});

		const groupName = group.querySelector('.toc-group__name')?.textContent?.toLowerCase() || '';
		if (groupName.includes(query)) hasMatch = true;

		group.classList.toggle('is-hidden', !hasMatch);
	});
}
