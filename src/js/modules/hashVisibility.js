/**
 * data-hash-key 있는 요소 = #키=값 이 일치할 때만 보임. 나머지는 전부 숨김.
 * - 설정 추가 없이, HTML에 data-hash-key="sidebar" 만 넣으면 #sidebar=1 일 때만 보임.
 * - hashchange 시 자동 반영.
 * - window.__hashVisibility.set(key, value) / .toggle(key) 로 제어.
 *
 * 규칙: #키=값 에서 값이 showWhen(기본 '1')에 들어갈 때만 보임. 없거나 다르면 .is-hidden
 *
 * URL 예: #sidebar=1 → data-hash-key="sidebar" 보임  |  #sidebar=0 또는 없음 → 숨김
 */

const HIDE_CLASS = 'is-hidden';
const DEFAULT_SHOW_WHEN = ['1'];

function parseHash() {
	const raw = (window.location.hash || '').replace(/^#/, '').trim();
	const out = {};
	if (!raw) return out;
	raw.split('&').forEach((part) => {
		const i = part.indexOf('=');
		if (i > 0) {
			const key = part.slice(0, i).trim();
			const value = part.slice(i + 1).trim().toLowerCase();
			out[key] = value;
		} else if (part) {
			out[part.trim().toLowerCase()] = '1';
		}
	});
	return out;
}

function apply(config, hashParams) {
	const elements = document.querySelectorAll('[data-hash-key]');
	elements.forEach((el) => {
		const key = el.getAttribute('data-hash-key');
		if (!key) return;
		const value = hashParams[key];
		const rule = config && config[key];
		const showWhen = (rule && rule.showWhen != null)
			? (Array.isArray(rule.showWhen) ? rule.showWhen : [String(rule.showWhen)])
			: DEFAULT_SHOW_WHEN;
		const showValues = showWhen.map((v) => String(v).toLowerCase());
		const visible = value != null && (showValues.includes(value) || showValues.includes('*'));
		el.classList.toggle(HIDE_CLASS, !visible);
	});
}

function setHash(key, value) {
	const current = parseHash();
	current[key] = value == null ? '' : String(value).toLowerCase();
	const str = Object.entries(current)
		.filter(([, v]) => v !== '')
		.map(([k, v]) => (v === '1' ? k : `${k}=${v}`))
		.join('&');
	window.location.hash = str ? `#${str}` : '';
}

/**
 * @param {Object} [config] - 키별 showWhen 덮어쓸 때만 사용. 없어도 됨.
 * @param {string|string[]} [config[].showWhen] - 이 값일 때 보임 (기본 '1')
 */
export function init(config = {}) {
	function sync() {
		apply(config, parseHash());
	}

	sync();
	window.addEventListener('hashchange', sync);

	window.__hashVisibility = {
		parse: parseHash,
		set(key, value) {
			setHash(key, value);
			apply(config, parseHash());
		},
		toggle(key, showValue = '1', hideValue = '0') {
			const cur = parseHash()[key];
			const showValues = Array.isArray(showValue) ? showValue : [showValue];
			const isVisible = cur != null && showValues.includes(String(cur).toLowerCase());
			setHash(key, isVisible ? hideValue : showValue);
			apply(config, parseHash());
		},
		sync,
	};
}
