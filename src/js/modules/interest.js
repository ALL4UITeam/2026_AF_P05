/**
 * 관심지역 패널: 탭 전환(나의 관심지역 / 공유받은 관심지역), 그리기 버튼 활성화
 */
export function init() {
  const panel = document.querySelector('.interest-panel');
  if (!panel) return;

  const tabs = panel.querySelectorAll('[data-interest-tab]');
  const contents = panel.querySelectorAll('[data-interest-content]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-interest-tab');
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      contents.forEach((c) => {
        c.hidden = c.getAttribute('data-interest-content') !== key;
      });
    });
  });

  // 그리기 버튼 (전체화면/박스/폴리곤)
  const drawBtns = panel.querySelectorAll('[data-draw-type]');
  drawBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      drawBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  // 라디오 선택 시 같은 탭 내 카드에만 is-selected 토글
  panel.addEventListener('change', (e) => {
    if (!(e.target instanceof HTMLInputElement) || e.target.type !== 'radio') return;
    const name = e.target.name;
    const content = e.target.closest('[data-interest-content]');
    if (!content) return;
    content.querySelectorAll('.interest-card').forEach((card) => {
      const radio = card.querySelector(`input[name="${name}"]`);
      if (!radio) return;
      card.classList.toggle('is-selected', radio.checked);
    });
  });
}
