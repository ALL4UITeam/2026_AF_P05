/**
 * 그리기 버튼 클릭 시 옵션창 토글 (통합지도 툴바)
 */
export function init() {
	const drawBtn = document.getElementById('mapToolbarDrawBtn');
	const drawOptions = document.getElementById('mapDrawOptions');
	if (!drawBtn || !drawOptions) return;
	drawBtn.addEventListener('click', () => {
		drawOptions.classList.toggle('is-open');
		drawOptions.setAttribute('aria-hidden', drawOptions.classList.contains('is-open') ? 'false' : 'true');
		drawBtn.classList.toggle('is-active', drawOptions.classList.contains('is-open'));
	});
}
