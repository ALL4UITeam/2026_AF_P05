/**
 * 주제도 사이드: 탭 전환, list.tree 브랜치/아이템 토글, 모두 열기
 */
export function init() {
	const page = document.querySelector('.map-theme-page');
	if (!page) return;

	// 탭 전환
	const tabsRoot = page.querySelector('[data-theme-tabs]');
	if (tabsRoot) {
		tabsRoot.querySelectorAll('[data-theme-tab]').forEach((btn) => {
			btn.addEventListener('click', () => {
				const key = btn.getAttribute('data-theme-tab');
				tabsRoot.querySelectorAll('[data-theme-tab]').forEach((b) =>
					b.classList.toggle('is-active', b === btn)
				);
				tabsRoot.querySelectorAll('[data-theme-panel]').forEach((panel) => {
					const match = panel.getAttribute('data-theme-panel') === key;
					panel.classList.toggle('map-theme-sidebar__panel--hidden', !match);
				});
			});
		});
	}

	// 브랜치 버튼 (btToggle.text) → 다음 형제 ul.dropbox 토글
	page.querySelectorAll('[data-theme-branch-toggle]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const next = btn.nextElementSibling;
			if (!next) return;
			const isOpen = next.style.display === 'block';
			next.style.display = isOpen ? 'none' : 'block';
			btn.classList.toggle('on', !isOpen);
		});
	});

	// 아이템 버튼 (btToggle, item 내) → .item 내 .dropbox 토글
	page.querySelectorAll('[data-theme-item-toggle]').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			const item = btn.closest('.item');
			const dropbox = item?.querySelector(':scope > .dropbox');
			const isOn = btn.classList.contains('on');
			// 같은 ul 내 다른 열린 아이템 닫기
			const parentUl = item?.closest('ul');
			if (parentUl) {
				parentUl.querySelectorAll('[data-theme-item-toggle].on').forEach((other) => {
					if (other !== btn) {
						other.classList.remove('on');
						const otherDropbox = other.closest('.item')?.querySelector(':scope > .dropbox');
						if (otherDropbox) otherDropbox.style.display = 'none';
					}
				});
			}
			btn.classList.toggle('on', !isOn);
			if (dropbox) dropbox.style.display = isOn ? 'none' : 'block';
		});
	});

	// 모두 열기/닫기
	const expandAll = page.querySelector('[data-theme-expand-all]');
	if (expandAll) {
		expandAll.addEventListener('click', () => {
			const branchBtns = [...page.querySelectorAll('[data-theme-branch-toggle]')];
			if (!branchBtns.length) return;
			const allOpen = branchBtns.every((b) => b.classList.contains('on'));
			branchBtns.forEach((btn) => {
				const next = btn.nextElementSibling;
				if (!next) return;
				const open = !allOpen;
				next.style.display = open ? 'block' : 'none';
				btn.classList.toggle('on', open);
			});
			expandAll.textContent = allOpen ? '모두열기 +' : '모두닫기 −';
		});
	}
}
