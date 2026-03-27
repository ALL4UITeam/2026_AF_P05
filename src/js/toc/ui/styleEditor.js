// src/js/toc/ui/styleEditor.js
// 스타일 카드 내부 인터랙션: 줌탭, 서브탭, 색상 hex 동기화, 폼 → store 연동

export function initStyleEditor(container, ctx) {
	if (!container) return;

	// 줌레벨 탭 전환
	container.addEventListener('click', (e) => {
		const zoomTab = e.target.closest('.toc-style-card__zoom-tab');
		if (zoomTab && !zoomTab.classList.contains('toc-style-card__zoom-tab--add')) {
			const card = zoomTab.closest('.toc-style-card');
			card?.querySelectorAll('.toc-style-card__zoom-tab').forEach((t) =>
				t.classList.toggle('is-active', t === zoomTab)
			);
		}
	});

	// 서브탭 (스타일/라벨) 전환
	container.addEventListener('click', (e) => {
		const subTab = e.target.closest('.toc-style-card__sub-tab');
		if (!subTab) return;

		const card = subTab.closest('.toc-style-card');
		const group = subTab.closest('.toc-style-card__sub-tabs');
		const target = subTab.getAttribute('data-style-sub');

		group?.querySelectorAll('.toc-style-card__sub-tab').forEach((t) =>
			t.classList.toggle('is-active', t === subTab)
		);

		card?.querySelectorAll('[data-sub-content]').forEach((el) => {
			el.classList.toggle('is-hidden', el.getAttribute('data-sub-content') !== target);
		});
	});

	// color input → hex 텍스트 동기화
	container.addEventListener('input', (e) => {
		if (e.target.type === 'color') {
			const hexSpan = e.target.closest('.toc-style-field__color-wrap')?.querySelector('.toc-style-field__color-hex');
			if (hexSpan) hexSpan.textContent = e.target.value;
		}
	});

	// 카드 닫기
	container.addEventListener('click', (e) => {
		const closeBtn = e.target.closest('[data-style-close]');
		if (closeBtn) {
			const card = closeBtn.closest('.toc-style-card');
			card?.remove();
		}
	});

	// 초기화
	container.addEventListener('click', (e) => {
		const resetBtn = e.target.closest('[data-style-reset]');
		if (!resetBtn) return;
		const layerId = resetBtn.getAttribute('data-style-reset');
		ctx.store.dispatch({ type: 'RESET_STYLE', layerId });
	});

	// 적용
	container.addEventListener('click', (e) => {
		const applyBtn = e.target.closest('[data-style-apply]');
		if (!applyBtn) return;

		const card = applyBtn.closest('.toc-style-card');
		const layerId = applyBtn.getAttribute('data-style-apply');
		if (!card) return;

		const changes = {};
		card.querySelectorAll('[data-style-prop]').forEach((input) => {
			const prop = input.getAttribute('data-style-prop');
			let value;

			if (input.type === 'checkbox') {
				value = input.checked;
			} else if (input.type === 'number') {
				value = parseFloat(input.value);
			} else if (input.type === 'color') {
				value = input.value;
			} else {
				value = input.value;
			}

			if (prop.includes('.')) {
				const [parent, child] = prop.split('.');
				if (!changes[parent]) changes[parent] = {};
				changes[parent][child] = value;
			} else {
				changes[prop] = value;
			}
		});

		ctx.store.dispatch({ type: 'UPDATE_STYLE', layerId, changes });
	});

	// 취소 (카드 닫기)
	container.addEventListener('click', (e) => {
		const cancelBtn = e.target.closest('[data-style-cancel]');
		if (cancelBtn) {
			cancelBtn.closest('.toc-style-card')?.remove();
		}
	});
}

// 레이어 클릭 시 카드 생성 (동적)
export function openStyleCard(container, layerEl) {
	if (!container || !layerEl) return;

	const layerId = layerEl.getAttribute('data-layer-id');
	const layerType = layerEl.getAttribute('data-layer-type') || 'point';
	const layerName = layerEl.getAttribute('data-layer-name') || layerEl.querySelector('.toc-layer-item__name')?.textContent || '';
	const layerCode = layerEl.getAttribute('data-layer-code') || '';

	if (container.querySelector(`[data-style-card="${layerId}"]`)) return;

	const title = layerCode ? `[${layerCode}] ${layerName} 설정` : `${layerName} 설정`;
	const formHtml = getFormByType(layerType, layerId);

	const card = document.createElement('div');
	card.className = 'toc-style-card';
	card.setAttribute('data-style-card', layerId);
	card.innerHTML = `
		<div class="toc-style-card__header">
			<h4 class="toc-style-card__title">${title}</h4>
			<button type="button" class="toc-style-card__close" data-style-close="${layerId}" aria-label="닫기">✕</button>
		</div>
		<div class="toc-style-card__zoom-tabs">
			<button type="button" class="toc-style-card__zoom-tab is-active">10-15</button>
			<button type="button" class="toc-style-card__zoom-tab">16-19</button>
			<button type="button" class="toc-style-card__zoom-tab toc-style-card__zoom-tab--add">+</button>
		</div>
		<div class="toc-style-card__body">
			<div class="toc-style-field">
				<label class="toc-style-field__label">유효 줌레벨</label>
				<div class="toc-style-field__range">
					<span class="toc-style-field__range-val">10</span>
					<input type="range" min="1" max="19" value="10" class="toc-style-field__slider">
					<span class="toc-style-field__range-val">15</span>
				</div>
			</div>
			<div class="toc-style-card__sub-tabs">
				<button type="button" class="toc-style-card__sub-tab is-active" data-style-sub="style">스타일</button>
				<button type="button" class="toc-style-card__sub-tab" data-style-sub="label">라벨(추가)</button>
			</div>
			<div class="toc-style-field">
				<label class="toc-style-field__label">미리보기</label>
				<div class="toc-style-preview"></div>
			</div>
			${formHtml}
			<div class="toc-style-label-form is-hidden" data-sub-content="label">
				<div class="toc-style-field__label-heading">라벨 표시 속성</div>
				<div class="toc-style-field">
					<label class="toc-style-field__label">시설명 (Name)</label>
					<select class="toc-style-field__select" data-style-prop="label.field">
						<option value="name" selected>시설명 (Name)</option>
						<option value="code">코드 (Code)</option>
					</select>
				</div>
				<div class="toc-style-field">
					<label class="toc-style-field__label">글자 크기</label>
					<input type="number" class="toc-style-field__input" value="12" min="1" max="100" data-style-prop="label.fontSize">
				</div>
				<div class="toc-style-field">
					<label class="toc-style-field__label">글자 색상</label>
					<div class="toc-style-field__color-wrap">
						<input type="color" class="toc-style-field__color" value="#333333" data-style-prop="label.fontColor">
						<span class="toc-style-field__color-hex">#333333</span>
					</div>
				</div>
				<div class="toc-style-field">
					<label class="toc-style-field__label">공개 표시</label>
					<input type="checkbox" data-style-prop="label.show">
				</div>
			</div>
		</div>
		<div class="toc-style-card__footer">
			<button type="button" class="com-btn sm" data-style-reset="${layerId}">초기화</button>
			<button type="button" class="com-btn blue sm" data-style-apply="${layerId}">적용</button>
			<button type="button" class="com-btn sm" data-style-cancel="${layerId}">취소</button>
		</div>
	`;

	container.appendChild(card);
}

function getFormByType(type, layerId) {
	switch (type) {
		case 'point':
			return `
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">크기</label>
					<input type="number" class="toc-style-field__input" value="11" min="1" max="100" data-style-prop="pointSize">
				</div>
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">색상</label>
					<div class="toc-style-field__color-wrap">
						<input type="color" class="toc-style-field__color" value="#2a61ba" data-style-prop="fill">
						<span class="toc-style-field__color-hex">#2a61ba</span>
					</div>
				</div>`;
		case 'line':
			return `
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">테두리 두께</label>
					<div class="toc-style-field__inline">
						<input type="number" class="toc-style-field__input toc-style-field__input--sm" value="3.5" step="0.5" min="0.5" max="20" data-style-prop="strokeWidth">
						<input type="color" class="toc-style-field__color" value="#2a61ba" data-style-prop="stroke">
					</div>
				</div>
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">선스타일</label>
					<select class="toc-style-field__select" data-style-prop="strokeStyle">
						<option value="solid" selected>실선 (Solid)</option>
						<option value="dashed">점선 (Dashed)</option>
						<option value="dotted">도트 (Dotted)</option>
					</select>
				</div>
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">끝 모양</label>
					<select class="toc-style-field__select" data-style-prop="lineCap">
						<option value="round" selected>둥글게 (Round)</option>
						<option value="square">사각 (Square)</option>
						<option value="butt">평면 (Butt)</option>
					</select>
				</div>`;
		case 'polygon':
		default:
			return `
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">채우기 색상</label>
					<div class="toc-style-field__color-wrap">
						<input type="color" class="toc-style-field__color" value="#22c55e" data-style-prop="fill">
						<span class="toc-style-field__color-hex">#22c55e</span>
					</div>
				</div>
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">테두리 색상</label>
					<div class="toc-style-field__color-wrap">
						<input type="color" class="toc-style-field__color" value="#16a34a" data-style-prop="stroke">
						<span class="toc-style-field__color-hex">#16a34a</span>
					</div>
				</div>
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">테두리 두께</label>
					<input type="number" class="toc-style-field__input" value="2" min="0" max="20" data-style-prop="strokeWidth">
				</div>
				<div class="toc-style-field" data-sub-content="style">
					<label class="toc-style-field__label">테두리 스타일</label>
					<select class="toc-style-field__select" data-style-prop="strokeStyle">
						<option value="solid" selected>실선</option>
						<option value="dashed">점선</option>
						<option value="dotted">도트</option>
					</select>
				</div>`;
	}
}
