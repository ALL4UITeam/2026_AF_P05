/**
 * 우측 툴바 버튼 is-active 토글 (그리기 버튼은 drawOptions 모듈에서 처리)
 */
export function init() {
	document.querySelectorAll('.map-toolbar__btn').forEach((btn) => {
		btn.addEventListener('click', function () {
			const toolOptions = btn.getAttribute('data-tool');
			if (toolOptions) {
				document.getElementById(toolOptions).classList.toggle('is-active');
			}
		});
	});
}