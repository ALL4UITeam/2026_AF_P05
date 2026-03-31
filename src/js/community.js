import '../scss/community.scss';

const commuMenuMap = {
  '/communication_notice.html': '/communication_notice.html',
  '/communication.html': '/communication.html',
  '/communication_qna.html': '/communication_qna.html',
  '/communication_guide.html': '/communication_guide.html',
  '/communication_guide_view.html': '/communication_guide.html',
  '/communication-2.html': '/communication_notice.html',
};

function setActiveCommuTab() {
  const currentPath = window.location.pathname;
  const activeTarget = commuMenuMap[currentPath];
  if (!activeTarget) return;

  const tabLinks = document.querySelectorAll('.popover-menu-wrap.commu .tab-menu a');
  tabLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === activeTarget);
  });
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion__item');
  if (!items.length) return;

  const closeItem = (item) => {
    const button = item.querySelector('.faq-accordion__q');
    const panel = item.querySelector('.faq-accordion__a');
    if (!button || !panel) return;
    button.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    item.classList.remove('active');
  };

  const openItem = (item) => {
    const button = item.querySelector('.faq-accordion__q');
    const panel = item.querySelector('.faq-accordion__a');
    if (!button || !panel) return;
    button.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    item.classList.add('active');
  };

  items.forEach((item) => {
    const button = item.querySelector('.faq-accordion__q');
    if (!button) return;

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      items.forEach(closeItem);
      if (!expanded) openItem(item);
    });
  });
}

function initCommuChips() {
  const chips = document.querySelectorAll('.commu-chip-wrap .commu-chip');
  if (!chips.length) return;
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((target) => target.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

function initCodeManageTree() {
  const tree = document.querySelector('.code-manage-tree');
  if (!tree) return;

  const nodes = tree.querySelectorAll('.code-node');

  const setNodeState = (node, expanded) => {
    const row = node.querySelector('.code-row-parent');
    const toggle = row?.querySelector('.code-toggle');
    const childrenWrap = node.querySelector('.code-row-children');
    if (!row || !toggle) return;

    const hasChildren = !!childrenWrap && childrenWrap.querySelectorAll('.code-row-child').length > 0;

    toggle.classList.toggle('is-leaf', !hasChildren);
    toggle.classList.toggle('is-open', hasChildren && expanded);
    toggle.setAttribute('aria-expanded', hasChildren && expanded ? 'true' : 'false');
    toggle.textContent = hasChildren && expanded ? '-' : '+';

    if (!hasChildren) {
      toggle.setAttribute('disabled', '');
      toggle.setAttribute('aria-disabled', 'true');
      return;
    }

    toggle.removeAttribute('disabled');
    toggle.removeAttribute('aria-disabled');
    childrenWrap.hidden = !expanded;
  };

  nodes.forEach((node) => {
    const row = node.querySelector('.code-row-parent');
    const toggle = row?.querySelector('.code-toggle');
    if (!row || !toggle) return;

    const isExpanded = toggle.classList.contains('is-open') || toggle.getAttribute('aria-expanded') === 'true';
    setNodeState(node, isExpanded);
  });

  tree.addEventListener('click', (event) => {
    const clickedToggle = event.target.closest('.code-toggle');
    const clickedName = event.target.closest('.code-row-parent .code-name');
    if (!clickedToggle && !clickedName) return;

    const row = (clickedToggle || clickedName).closest('.code-row-parent');
    const node = row?.closest('.code-node');
    const toggle = row?.querySelector('.code-toggle');
    if (!node || !toggle || toggle.classList.contains('is-leaf')) return;

    if (clickedToggle) event.preventDefault();
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setNodeState(node, !expanded);
  });
}

function initCodeManageModals() {
  const wrap = document.querySelector('.code-manage-wrap');
  if (!wrap) return;

  wrap.addEventListener('click', (event) => {
    const editBtn = event.target.closest('.code-action .com-btn.sm, .code-manage__table--detail .com-btn.sm');
    if (!editBtn) return;

    event.preventDefault();
    if (typeof window.showPopup === 'function') {
      window.showPopup('codeManageCodeEditModal');
    }
  });
}

function initSpatialDataMgmtSvcToggle() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.spatial-data-mgmt__svc');
    if (!btn) return;
    const on = btn.classList.toggle('spatial-data-mgmt__svc--on');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function initSpatialCoordTransformModal() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.spatial-data-mgmt__coord-btn');
    if (!btn) return;

    const name = btn.dataset.sdmName ?? '';
    const epsg = btn.dataset.sdmEpsg ?? '';
    const nameEl = document.getElementById('sdmCoordDataName');
    const srcEl = document.getElementById('sdmCoordSource');
    if (nameEl) nameEl.textContent = name || '—';
    if (srcEl) srcEl.value = epsg;

    if (typeof window.showPopup === 'function') {
      window.showPopup('popupSpatialCoordTransform');
    }
  });
}

function initSpatialDash() {
  const segmentGroups = document.querySelectorAll('.spatial-dash__segment-group');
  segmentGroups.forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.spatial-dash__segment');
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll('.spatial-dash__segment').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  document.querySelectorAll('.spatial-dash__panel-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const panel = toggle.closest('.spatial-dash__panel');
      const body = panel?.querySelector('.spatial-dash__panel-body');
      if (!panel || !body) return;
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      toggle.setAttribute('aria-expanded', next ? 'true' : 'false');
      panel.classList.toggle('is-collapsed', !next);
      body.hidden = !next;
    });
  });
}

function initLinkageMonitorErrorsFold() {
  const btn = document.querySelector('.linkage-monitor__errors-fold');
  const block = document.getElementById('linkageErrorsTableBlock');
  if (!btn || !block) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    btn.setAttribute('aria-expanded', next ? 'true' : 'false');
    block.hidden = !next;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveCommuTab();
  initFaqAccordion();
  initCommuChips();
  initCodeManageTree();
  initCodeManageModals();
  initSpatialDash();
  initSpatialDataMgmtSvcToggle();
  initSpatialCoordTransformModal();
  initLinkageMonitorErrorsFold();
});
