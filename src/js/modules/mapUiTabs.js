/**
 * map-ui 공통 탭: 같은 컨테이너 안의 [data-map-ui-tab] ↔ [data-map-ui-content] 전환
 * (등록 모달, 공유 모달 등에서 동일 패턴 사용)
 *
 * @param {HTMLElement | null} root
 */
export function bindMapUiTabs(root) {
  if (!root) return;
  const tabBtns = root.querySelectorAll('[data-map-ui-tab]');
  const panels = root.querySelectorAll('[data-map-ui-content]');
  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-map-ui-tab');
      if (!key) return;
      tabBtns.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      panels.forEach((p) => {
        p.hidden = p.getAttribute('data-map-ui-content') !== key;
      });
    });
  });
}
