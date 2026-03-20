/**
 * 위치 검색 페이지 전용: 시군/읍면동/리 연동, 검색 버튼 → 브레드크럼 + 검색결과 리스트
 */
const emdBySigungu = {
	andong: [{ value: '', label: '전체' }, { value: 'pungsan', label: '풍산읍' }, { value: 'waryong', label: '와룡면' }],
	yeongyang: [{ value: '', label: '전체' }, { value: 'yeongyang', label: '영양읍' }, { value: 'chilgok', label: '칠곡면' }],
	yeongju: [{ value: '', label: '전체' }, { value: 'heungdeok', label: '흥덕동' }, { value: 'gaeryong', label: '개령동' }],
	gyeongsan: [{ value: '', label: '전체' }, { value: 'jillyang', label: '진량읍' }, { value: 'sindang', label: '신당동' }],
};
const riByEmd = {
	pungsan: [{ value: '', label: '전체' }, { value: 'r1', label: '원천리' }, { value: 'r2', label: '수리' }],
	waryong: [{ value: '', label: '전체' }, { value: 'r3', label: '서지리' }],
	yeongyang: [], chilgok: [], heungdeok: [], gaeryong: [], jillyang: [], sindang: [],
};

function setSelectOptions(select, items) {
	if (!select) return;
	select.innerHTML = (items || [{ value: '', label: '전체' }]).map((o) => `<option value="${o.value}">${o.label}</option>`).join('');
}

export function init() {
	const page = document.querySelector('.map-search-page');
	if (!page) return;

	const searchSigungu = document.getElementById('searchSigungu');
	const searchEmd = document.getElementById('searchEmd');
	const searchRi = document.getElementById('searchRi');
	const locationSearchInput = document.getElementById('locationSearchInput');
	const locationSearchBtn = document.getElementById('locationSearchBtn');
	const mapSearchBreadcrumb = document.getElementById('mapSearchBreadcrumb');
	const searchResultList = document.getElementById('searchResultList');

	if (searchSigungu && searchEmd && searchRi) {
		searchSigungu.addEventListener('change', () => {
			const list = searchSigungu.value ? (emdBySigungu[searchSigungu.value] || [{ value: '', label: '전체' }]) : [{ value: '', label: '전체' }];
			setSelectOptions(searchEmd, list);
			searchRi.innerHTML = '<option value="">전체</option>';
		});
		searchEmd.addEventListener('change', () => {
			const list = searchEmd.value ? (riByEmd[searchEmd.value] || [{ value: '', label: '전체' }]) : [{ value: '', label: '전체' }];
			setSelectOptions(searchRi, list);
		});
	}

	if (locationSearchBtn && locationSearchInput && mapSearchBreadcrumb) {
		locationSearchBtn.addEventListener('click', () => {
			const q = locationSearchInput.value.trim();
			if (q) {
				mapSearchBreadcrumb.textContent = `검색: ${q}`;
				if (searchResultList) {
					searchResultList.innerHTML = [`${q} (1)`, `${q} 관련 장소 1`, `${q} 관련 장소 2`]
						.map((text) => `<li class="sidebar__result-item">${text}</li>`).join('');
				}
			}
		});
	}
	if (locationSearchInput && locationSearchBtn) {
		locationSearchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') locationSearchBtn.click(); });
	}

	const landFloatStack = document.getElementById('landSearchFloatStack');
	const landPanelSearchBtn = document.querySelector('#landSearchPanel .sidebar__footer-btn--primary');
	if (landFloatStack && landPanelSearchBtn) {
		landPanelSearchBtn.addEventListener('click', () => {
			landFloatStack.classList.add('is-open');
			landFloatStack.setAttribute('aria-hidden', 'false');
		});
	}

	page.querySelectorAll('.lnd-rslt__fold').forEach((foldBtn) => {
		foldBtn.addEventListener('click', () => {
			const panel = foldBtn.closest('.lnd-rslt');
			if (!panel) return;
			const collapsed = panel.classList.toggle('is-collapsed');
			foldBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
		});
	});
}
