function setDescription(target, text) {
	if (!target) return;
	const lines = (text || '').split('|').map((line) => line.trim()).filter(Boolean);
	target.innerHTML = '';
	if (!lines.length) return;
	lines.forEach((line, index) => {
		if (index > 0) {
			target.appendChild(document.createElement('br'));
		}
		target.appendChild(document.createTextNode(line));
	});
}

function applyMenuPreview(link, refs) {
	if (!link || !refs.thumbnail || !refs.title || !refs.desc) return;
	const key = link.dataset.menuKey || 'total';
	const title = link.dataset.menuTitle || link.textContent.trim();
	const desc = link.dataset.menuDesc || '';

	refs.thumbnail.className = `intelligent-menu-thumbnail is-${key}`;
	refs.thumbnail.setAttribute('aria-label', title);
	refs.title.textContent = title;
	setDescription(refs.desc, desc);
}

export function init() {
	const menu = document.querySelector('.intelligent-menu');
	if (!menu) return;

	const links = Array.from(menu.querySelectorAll('ul a'));
	if (!links.length) return;

	const refs = {
		thumbnail: menu.querySelector('.intelligent-menu-thumbnail'),
		title: menu.querySelector('.intelligent-menu-desc-title span'),
		desc: menu.querySelector('.intelligent-menu-desc'),
	};

	const getSelectedLink = () => links.find((link) => link.classList.contains('active')) || links[0];

	function setActive(link) {
		links.forEach((item) => item.classList.toggle('active', item === link));
	}

	links.forEach((link) => {
		link.addEventListener('mouseenter', () => applyMenuPreview(link, refs));
		link.addEventListener('focus', () => applyMenuPreview(link, refs));
		link.addEventListener('click', (event) => {
			event.preventDefault();
			setActive(link);
			applyMenuPreview(link, refs);
		});
	});

	menu.addEventListener('mouseleave', () => {
		applyMenuPreview(getSelectedLink(), refs);
	});

	applyMenuPreview(getSelectedLink(), refs);
}
