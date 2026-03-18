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

document.addEventListener('DOMContentLoaded', () => {
  setActiveCommuTab();
  initFaqAccordion();
  initCommuChips();
});
