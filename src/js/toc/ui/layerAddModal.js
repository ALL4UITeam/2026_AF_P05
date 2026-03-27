// src/js/toc/ui/layerAddModal.js
// "레이어 선택 추가" 모달 — 열기/닫기 + 검색 필터 + 추가 클릭

const AVAILABLE_LAYERS = [
	{ id: 'lyr_cctv', name: '방범용 CCTV', type: 'point', source: 'wms' },
	{ id: 'lyr_fire', name: '소화전', type: 'point', source: 'wms' },
	{ id: 'lyr_bus', name: '버스정류장', type: 'point', source: 'wms' },
	{ id: 'lyr_subway', name: '지하철 노선', type: 'line', source: 'wms' },
];

export function initLayerAddModal(ctx) {
	const backdrop = document.getElementById('tocAddLayerModal');
	if (!backdrop) return;

	const openBtns = document.querySelectorAll('[data-toc-open-add-modal]');
	const closeBtns = backdrop.querySelectorAll('[data-toc-close-add-modal]');
	const searchInput = backdrop.querySelector('[data-toc-modal-search]');
	const list = backdrop.querySelector('[data-toc-modal-list]');

	function open() {
		backdrop.classList.add('is-open');
		backdrop.setAttribute('aria-hidden', 'false');
	}

	function close() {
		backdrop.classList.remove('is-open');
		backdrop.setAttribute('aria-hidden', 'true');
	}

	openBtns.forEach((btn) => btn.addEventListener('click', open));
	closeBtns.forEach((btn) => btn.addEventListener('click', close));

	// .toc-modal__close 버튼도 지원
	backdrop.querySelectorAll('.toc-modal__close').forEach((btn) =>
		btn.addEventListener('click', close)
	);

	backdrop.addEventListener('click', (e) => {
		if (e.target === backdrop) close();
	});

	if (searchInput) {
		searchInput.addEventListener('input', () => {
			const query = searchInput.value.trim().toLowerCase();
			const items = list?.querySelectorAll('.toc-add-modal__item') || [];
			items.forEach((item) => {
				const name = item.querySelector('.toc-add-modal__name')?.textContent?.toLowerCase() || '';
				item.classList.toggle('is-hidden', query && !name.includes(query));
			});
		});
	}

	if (list) {
		list.addEventListener('click', (e) => {
			const addBtn = e.target.closest('[data-toc-add-layer]');
			if (!addBtn) return;

			const layerId = addBtn.getAttribute('data-toc-add-layer');
			const def = AVAILABLE_LAYERS.find((l) => l.id === layerId);
			if (!def) return;

			const { selectedGroupId } = ctx.store.getState();
			const targetGroup = selectedGroupId || ctx.groupManager.getOrderedGroups()[0]?.id;

			ctx.layerManager.addLayer({
				id: def.id,
				name: def.name,
				code: def.id,
				type: def.type,
				source: def.source,
				groupId: targetGroup || null,
				visible: true,
				zoomRange: [10, 19],
				style: {
					fill: '#2a61ba',
					stroke: '#1a3d7a',
					strokeWidth: 2,
					strokeStyle: 'solid',
					opacity: 1,
					pointSize: 11,
					pointShape: 'circle',
					label: { field: 'name', fontSize: 12, fontColor: '#333', show: false },
				},
			});

			if (targetGroup) {
				ctx.groupManager.addLayerToGroup(targetGroup, def.id);
			}

			addBtn.closest('.toc-add-modal__item')?.classList.add('is-added');
		});
	}

	return { open, close };
}
