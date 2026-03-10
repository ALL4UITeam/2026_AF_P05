import '../scss/main.scss';
import { init as initBottomSheet } from './modules/bottomSheet.js';
import { init as initDrawOptions } from './modules/drawOptions.js';
import { init as initHashVisibility } from './modules/hashVisibility.js';
import { init as initMapSearch } from './modules/mapSearch.js';
import { init as initModal } from './modules/modal.js';
import { init as initPanel } from './modules/sidebar.js';
import { init as initToolbar } from './modules/toolbar.js';
import { init as initZoom } from './modules/zoom.js';

function run(init, name) {
	try {
		init();
	} catch (err) {
		console.warn(`[map-ui] ${name} init failed:`, err);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	run(initPanel, 'panel');
	run(initToolbar, 'toolbar');
	run(initModal, 'modal');
	run(initBottomSheet, 'bottomSheet');
	run(initDrawOptions, 'drawOptions');
	run(initZoom, 'zoom');
	run(initMapSearch, 'mapSearch');
	// data-hash-key 가진 요소는 #키=1 일치할 때만 보임 (추가 설정 없음)
	run(() => initHashVisibility(), 'hashVisibility');
});
