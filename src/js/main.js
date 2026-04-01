import '../scss/main.scss';
import { init as initBasemapTabs } from './modules/basemapTabs.js';
import { init as initBottomSheet } from './modules/bottomSheet.js';
import { init as initDrawOptions } from './modules/drawOptions.js';
import { init as initDrone } from './modules/drone.js';
import { init as initInterest } from './modules/interest.js';
import { init as initMapSearch } from './modules/mapSearch.js';
import { init as initModal } from './modules/modal.js';
import { init as initMydata } from './modules/mydata.js';
import { init as initPanel } from './modules/sidebar.js';
import { init as initThemePanel } from './modules/themePanel.js';
import { init as initToolbar } from './modules/toolbar.js';
import { init as initTree } from './modules/tree.js';
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
	run(initBasemapTabs, 'basemapTabs');
	run(initToolbar, 'toolbar');
	run(initDrone, 'drone');
	run(initDrawOptions, 'drawOptions');
	run(initInterest, 'interest');
	run(initModal, 'modal');
	run(initBottomSheet, 'bottomSheet');
	run(initTree, 'tree');
	run(initThemePanel, 'themePanel');
	run(initZoom, 'zoom');
	run(initMapSearch, 'mapSearch');
	run(initMydata, 'mydata');

	const range = document.querySelector('.map-ui-range');
range.style.setProperty('--val', range.value);
range.addEventListener('input', () => {
  range.style.setProperty('--val', range.value);
});
	
});
