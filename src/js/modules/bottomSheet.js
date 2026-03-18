/**
 * 하단 시트 열기/닫기 (bottomSheet + sheetHandle)
 */
export function init() {
	const bottomSheet = document.getElementById('bottomSheet');
	const sheetHandle = document.getElementById('sheetHandle');
	if (!bottomSheet || !sheetHandle) return;
	sheetHandle.addEventListener('click', () => bottomSheet.classList.toggle('is-open'));
}
