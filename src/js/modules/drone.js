/**
 * 드론영상 오버레이 UI 동작
 * - 탭 전환 (영상/EO/메타)
 * - 갤러리 ↔ 목록형 전환
 * - 등록/수정 모달 열기·닫기
 * - 카드/행 삭제
 * - 파일 업로드 영역 클릭
 */
export function init() {
  const layer = document.getElementById('droneLayer');
  if (!layer) return;

  // ===== 탭 전환 =====
  const tabs = layer.querySelectorAll('[data-drone-tab]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  });

  // ===== 갤러리 ↔ 목록 전환 (항상 하나만 표시) =====
  const viewBtns = layer.querySelectorAll('[data-drone-view]');
  const grid = layer.querySelector('[data-drone-grid]');
  const list = layer.querySelector('[data-drone-list]');

  function setView(mode) {
    viewBtns.forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-drone-view') === mode));
    if (grid) grid.hidden = mode !== 'grid';
    if (list) list.hidden = mode !== 'list';
  }

  setView('grid'); // 초기: 갤러리만 표시

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-drone-view');
      setView(mode);
    });
  });

  // ===== 등록 모달 =====
  const registerModal = document.getElementById('droneRegisterModal');
  const registerBtn = layer.querySelector('[data-drone-register]');
  if (registerBtn && registerModal) {
    registerBtn.addEventListener('click', () => {
      registerModal.classList.add('is-open');
      registerModal.setAttribute('aria-hidden', 'false');
    });
  }

  // ===== 수정 모달 =====
  const editModal = document.getElementById('droneEditModal');
  document.addEventListener('click', (e) => {
    const editBtn = /** @type {HTMLElement} */ (e.target).closest('[data-drone-edit]');
    if (editBtn && editModal) {
      editModal.classList.add('is-open');
      editModal.setAttribute('aria-hidden', 'false');
    }
  });

  // ===== 상세보기 모달 =====
  const detailModal = document.getElementById('droneDetailModal');
  document.addEventListener('click', (e) => {
    const detailBtn = /** @type {HTMLElement} */ (e.target).closest('[data-drone-detail]');
    if (detailBtn && detailModal) {
      detailModal.classList.add('is-open');
      detailModal.setAttribute('aria-hidden', 'false');
    }
  });

  // ===== 카드/행 삭제 =====
  document.addEventListener('click', (e) => {
    const deleteBtn = /** @type {HTMLElement} */ (e.target).closest('[data-drone-delete]');
    if (!deleteBtn) return;
    const card = deleteBtn.closest('[data-drone-card]');
    if (card) { card.remove(); return; }
    const row = deleteBtn.closest('tr');
    if (row) row.remove();
  });

  // ===== 파일 업로드 영역 클릭 =====
  document.querySelectorAll('[data-drone-upload]').forEach((area) => {
    area.addEventListener('click', () => {
      const input = area.querySelector('[data-drone-file-input]');
      if (input instanceof HTMLInputElement) input.click();
    });
  });
}
