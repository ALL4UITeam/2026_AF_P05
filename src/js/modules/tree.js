/**
 * 트리 UI: [data-tree] 컨테이너 단위로 동작
 * - 펼치기/접기: [data-tree-toggle] 클릭 시 해당 노드의 자식 토글
 * - 체크박스 연동: data-parent + data-children(쉼표 구분 data-tree-id) / data-leaf + data-tree-id
 * - 모두 열기/닫기: 같은 컨테이너 내 [data-tree-expand-all] 버튼
 * 한 페이지에 여러 트리가 있어도 각 [data-tree] 안에서만 동작
 */
const TREE_CONTAINER = '[data-tree]';
const HIDDEN_CLASS = 'is-hidden';
const CARET_OPEN_CLASS = 'map-ui-tree__caret--open';

function initTree(root) {
	const treeList = root.querySelector('.map-ui-tree');
	if (!treeList) return;

	// 펼치기/접기
	root.querySelectorAll('[data-tree-toggle]').forEach((row) => {
		row.addEventListener('click', (e) => {
			if (e.target.tagName === 'INPUT') return;
			const node = row.closest('.map-ui-tree__node');
			const children = node?.querySelector(':scope > .map-ui-tree__children');
			const caret = row.querySelector('.map-ui-tree__caret');
			if (!children) return;
			const isOpen = !children.classList.contains(HIDDEN_CLASS);
			children.classList.toggle(HIDDEN_CLASS, isOpen);
			caret?.classList.toggle(CARET_OPEN_CLASS, !isOpen);
			node?.setAttribute('aria-expanded', String(!isOpen));
		});
	});

	// 자식 체크박스 찾기 (이 트리 내에서만, data-tree-id 기준)
	function getChildInputs(parentInput) {
		const ids = (parentInput.getAttribute('data-children') || '').split(',').map((s) => s.trim()).filter(Boolean);
		return ids.map((id) => root.querySelector(`input[data-tree-id="${id}"]`)).filter(Boolean);
	}

	function updateParentState() {
		root.querySelectorAll('input[data-parent]').forEach((parentCb) => {
			const children = getChildInputs(parentCb);
			const checkedCount = children.filter((c) => c.checked).length;
			if (checkedCount === 0) {
				parentCb.checked = false;
				parentCb.indeterminate = false;
			} else if (checkedCount === children.length) {
				parentCb.checked = true;
				parentCb.indeterminate = false;
			} else {
				parentCb.checked = false;
				parentCb.indeterminate = true;
			}
		});
	}

	root.querySelectorAll('input[data-parent]').forEach((cb) => {
		cb.addEventListener('change', () => {
			getChildInputs(cb).forEach((el) => {
				el.checked = cb.checked;
				el.indeterminate = false;
			});
			updateParentState();
		});
	});

	root.querySelectorAll('input[data-leaf]').forEach((cb) => {
		cb.addEventListener('change', updateParentState);
	});

	updateParentState();

	// 모두 열기/닫기
	const expandBtn = root.querySelector('[data-tree-expand-all]');
	if (expandBtn) {
		let allExpanded = true;
		expandBtn.addEventListener('click', () => {
			allExpanded = !allExpanded;
			root.querySelectorAll('.map-ui-tree__children').forEach((el) => {
				el.classList.toggle(HIDDEN_CLASS, !allExpanded);
			});
			root.querySelectorAll('.map-ui-tree__caret').forEach((c) => {
				c.classList.toggle(CARET_OPEN_CLASS, allExpanded);
			});
			root.querySelectorAll('.map-ui-tree__node[aria-expanded]').forEach((node) => {
				node.setAttribute('aria-expanded', String(allExpanded));
			});
			expandBtn.textContent = allExpanded ? '모두 열기' : '모두 닫기';
		});
	}
}

export function init() {
	document.querySelectorAll(TREE_CONTAINER).forEach(initTree);
}
