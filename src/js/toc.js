// src/js/toc.js — TOC 페이지 공용 UI (퍼블리싱 전용, 기능 로직 없음)
import '../scss/community.scss';
import '../scss/toc.scss';

document.addEventListener('DOMContentLoaded', () => {
	initTabs();
	initToggle();
	initFloatPanel();
	initStyleSubTabs();
	initZoomTabs();
	initSavedCardSelect();
});

function initTabs() {
	document.querySelectorAll('.toc-sidebar__tab').forEach(tab => {
		tab.addEventListener('click', () => {
			const panelId = tab.dataset.tocTab;
			const sidebar = tab.closest('.toc-sidebar');
			if (!sidebar) return;
			sidebar.querySelectorAll('.toc-sidebar__tab').forEach(t => t.classList.remove('is-active'));
			sidebar.querySelectorAll('.toc-sidebar__panel').forEach(p => p.classList.remove('is-active'));
			tab.classList.add('is-active');
			sidebar.querySelector(`[data-toc-panel="${panelId}"]`)?.classList.add('is-active');
		});
	});
}

function initToggle() {
	document.querySelectorAll('[data-toc-toggle]').forEach(header => {
		header.addEventListener('click', (e) => {
			if (e.target.closest('input, .chkbox, button')) return;
			const arrow = header.querySelector(
				'.toc-manage-page__arrow, .toc-style-setting-page__arrow'
			);
			if (arrow) arrow.classList.toggle('is-open');
			const body = header.nextElementSibling;
			if (body) body.classList.toggle('is-hidden');
		});
	});
}

function initFloatPanel() {
	const panel = document.getElementById('tocAddLayerPanel');
	if (!panel) return;

	document.querySelectorAll('[data-toc-open-add-panel]').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			panel.classList.toggle('is-open');
		});
	});
	document.querySelectorAll('[data-toc-close-panel]').forEach(btn => {
		btn.addEventListener('click', () => {
			panel.classList.remove('is-open');
		});
	});
}

function initStyleSubTabs() {
	document.querySelectorAll('.toc-style-card__sub-tab').forEach(tab => {
		tab.addEventListener('click', () => {
			const card = tab.closest('.toc-style-card');
			if (!card) return;
			card.querySelectorAll('.toc-style-card__sub-tab').forEach(t => t.classList.remove('is-active'));
			tab.classList.add('is-active');
		});
	});
}

function initZoomTabs() {
	document.querySelectorAll('.toc-style-card__zoom-tab').forEach(tab => {
		if (tab.classList.contains('toc-style-card__zoom-tab--add')) return;
		tab.addEventListener('click', () => {
			const wrapper = tab.closest('.toc-style-card__zoom-tabs');
			if (!wrapper) return;
			wrapper.querySelectorAll('.toc-style-card__zoom-tab').forEach(t => t.classList.remove('is-active'));
			tab.classList.add('is-active');
		});
	});
}

function initSavedCardSelect() {
	document.querySelectorAll('.toc-saved-list-page__card').forEach(card => {
		card.addEventListener('click', () => {
			document.querySelectorAll('.toc-saved-list-page__card').forEach(c => c.classList.remove('is-selected'));
			card.classList.add('is-selected');
		});
	});
}
