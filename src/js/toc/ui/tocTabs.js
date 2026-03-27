// src/js/toc/ui/tocTabs.js
// 사이드바 탭 전환: 레이어 검색 ↔ TOC 관리
import { ACTION } from '../core/stateStore.js';

export function initTocTabs(container, ctx) {
	const tabs = container?.querySelectorAll('[data-toc-tab]');
	const panels = container?.querySelectorAll('[data-toc-panel]');
	if (!tabs || !panels) return;

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const target = tab.getAttribute('data-toc-tab');

			tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
			panels.forEach((p) =>
				p.classList.toggle('is-active', p.getAttribute('data-toc-panel') === target)
			);

			ctx.store.dispatch({ type: ACTION.SET_UI, key: 'activeTab', value: target });
		});
	});
}
