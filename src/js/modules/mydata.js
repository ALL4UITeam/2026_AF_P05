/**
 * 사용자 데이터 패널 + 등록 모달 + 공유 모달 UI 동작
 * 탭 전환: modules/mapUiTabs.js — data-map-ui-tab + data-map-ui-content
 */
import { bindMapUiTabs } from './mapUiTabs.js';

export function init() {
  // ===== 등록 모달 (map-ui 공통 구조) =====
  const modal = document.getElementById('mydataModal');
  if (modal) {
    const openBtn = document.querySelector('[data-mydata-open]');
    const closeEls = modal.querySelectorAll('[data-mydata-close]');

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

    bindMapUiTabs(modal);

    modal.querySelectorAll('[data-mydata-file]').forEach((fileInput) => {
      fileInput.addEventListener('change', () => {
        const f = fileInput.files?.[0];
        const panel = fileInput.closest('[data-map-ui-content]');
        const nameEl = panel?.querySelector('[data-mydata-file-name]');
        if (nameEl) nameEl.textContent = f ? f.name : '선택된 파일 없음';
      });
    });
  }

  // ===== 데이터 공유 설정 모달 =====
  const shareModal = document.getElementById('shareModal');
  if (shareModal) {
    document.querySelectorAll('[data-share-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        shareModal.classList.add('is-open');
        shareModal.setAttribute('aria-hidden', 'false');
      });
    });

    bindMapUiTabs(shareModal);

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

