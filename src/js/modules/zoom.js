/**
 * 줌 컨트롤 (map-search 페이지 등 #mapSearchZoom 있는 경우)
 * - +/- 버튼, 트랙 클릭, 핸들 드래그 모두 실시간 반영
 * - onChange(zoomLevel) 콜백으로 개발자가 지도 줌 등 연동 가능
 *
 * @param {Object} [options]
 * @param {(level: number) => void} [options.onChange] - 줌 레벨(0~100) 변경 시 호출
 *
 * @example
 * initZoom({ onChange(level) { map.setZoom(level / 100 * maxZoom); } });
 */
export function init(options = {}) {
	const zoomPlus = document.getElementById('zoomPlus');
	const zoomMinus = document.getElementById('zoomMinus');
	const zoomHandle = document.getElementById('zoomHandle');
	const zoomFill = document.getElementById('zoomFill');
	const zoomTrack = document.getElementById('zoomTrack') || document.querySelector('.map-search-zoom__track');
	if (!zoomTrack || !zoomHandle) return;

	const { onChange } = options;
	let zoomLevel = 50;
	let isDragging = false;

	function setZoomLevel(value) {
		zoomLevel = Math.max(0, Math.min(100, value));
		updateUI();
		if (typeof onChange === 'function') onChange(zoomLevel);
	}

	function updateUI() {
		const h = zoomTrack.offsetHeight;
		const handleH = 3;
		const fillPct = zoomLevel / 100;
		const handleTop = ((100 - zoomLevel) / 100) * (h - handleH);
		if (zoomFill) zoomFill.style.height = `${Math.round(fillPct * 100)}%`;
		zoomHandle.style.top = `${Math.max(0, handleTop)}px`;
		zoomHandle.setAttribute('aria-valuenow', String(Math.round(zoomLevel)));
	}

	function getLevelFromY(clientY) {
		const rect = zoomTrack.getBoundingClientRect();
		const h = rect.height - 3;
		const y = clientY - rect.top;
		return 100 - (y / h) * 100;
	}

	function onMouseMove(e) {
		if (!isDragging) return;
		setZoomLevel(getLevelFromY(e.clientY));
	}

	function onMouseUp() {
		if (!isDragging) return;
		isDragging = false;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
		document.body.style.userSelect = '';
		document.body.style.cursor = '';
	}

	// +/- 버튼
	if (zoomPlus) {
		zoomPlus.addEventListener('click', () => setZoomLevel(zoomLevel + 10));
	}
	if (zoomMinus) {
		zoomMinus.addEventListener('click', () => setZoomLevel(zoomLevel - 10));
	}

	// 트랙 클릭 (핸들 클릭 시에는 제외)
	zoomTrack.addEventListener('click', (e) => {
		if (e.target.closest('.map-search-zoom__handle')) return;
		setZoomLevel(getLevelFromY(e.clientY));
	});

	// 핸들 드래그 — 실시간 반영 + 콜백
	zoomHandle.addEventListener('mousedown', (e) => {
		e.preventDefault();
		isDragging = true;
		document.body.style.userSelect = 'none';
		document.body.style.cursor = 'grabbing';
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
		setZoomLevel(getLevelFromY(e.clientY));
	});

	updateUI();
	if (typeof onChange === 'function') onChange(zoomLevel);
}
