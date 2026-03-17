/**
 * 그리기 옵션창 내 도형 버튼(점/선/면) is-active 토글, 형제 클릭 시 is-active 제거
 * (옵션창 열기/닫기는 toolbar.js에서 처리)
 */
export function init() {
	const drawOptions = document.getElementById('mapDrawOptions') || document.querySelector('.map-options[data-tool-type="draw"]');
	if (!drawOptions) return;

	const buttonsWrap = drawOptions.querySelector('.map-draw-options__buttons');
	if (!buttonsWrap) return;

	const btns = buttonsWrap.querySelectorAll('.map-draw-options__btn');
	btns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			btns.forEach((sibling) => sibling.classList.remove('is-active'));
			btn.classList.toggle('is-active');
		});
	});
}
