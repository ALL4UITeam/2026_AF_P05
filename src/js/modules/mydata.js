/**
 * 사용자 데이터 패널 + 등록 모달 + 공유 모달 UI 동작
 */
export function init() {
  // ===== 등록 모달 =====
  const modal = document.querySelector('[data-mydata-modal]');
  if (!modal) return;

  const openBtn = document.querySelector('[data-mydata-open]');
  const closeEls = modal.querySelectorAll('[data-mydata-close]');
  const tabBtns = modal.querySelectorAll('[data-mydata-tab]');
  const fileInput = modal.querySelector('[data-mydata-file]');
  const fileName = modal.querySelector('[data-mydata-file-name]');

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  openBtn?.addEventListener('click', openModal);
  closeEls.forEach((el) => el.addEventListener('click', closeModal));

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
    });
  });

  if (fileInput && fileName) {
    fileInput.addEventListener('change', () => {
      const f = fileInput.files?.[0];
      fileName.textContent = f ? f.name : '선택된 파일 없음';
    });
  }

  // ===== 데이터 공유 설정 모달 (공통 모달 구조) =====
  const shareModal = document.getElementById('shareModal');
  if (shareModal) {
    const shareTabBtns = shareModal.querySelectorAll('[data-share-tab]');
    const sharePanels = shareModal.querySelectorAll('[data-share-panel]');

    document.querySelectorAll('[data-share-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        shareModal.classList.add('is-open');
        shareModal.setAttribute('aria-hidden', 'false');
      });
    });

    shareTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-share-tab');
        shareTabBtns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        sharePanels.forEach((p) => {
          p.hidden = p.getAttribute('data-share-panel') !== key;
        });
      });
    });

    shareModal.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const removeBtn = target.closest('[data-share-user-remove]');
      if (removeBtn) {
        removeBtn.closest('.mydata-share-users__item')?.remove();
      }
    });
  }

  // ===== 레이어 리스트: 체크/삭제/투명도 =====
  const list = document.querySelector('[data-mydata-layers]');
  if (!list) return;

  list.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const deleteBtn = target.closest('[data-layer-delete]');
    if (deleteBtn) {
      const item = deleteBtn.closest('[data-layer]');
      item?.remove();
      return;
    }
  });

  list.addEventListener('change', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-layer-check]')) {
      const checkbox = /** @type {HTMLInputElement} */ (target);
      const item = checkbox.closest('[data-layer]');
      if (!item) return;
      item.classList.toggle('is-checked', checkbox.checked);
      const range = item.querySelector('[data-layer-opacity]');
      if (range instanceof HTMLInputElement) range.disabled = !checkbox.checked;
      return;
    }
  });
}

