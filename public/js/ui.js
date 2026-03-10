$(document).ready(function(){

	// gnb
	$(".gnb > ul > li > a").on("click", function (e){
		e.preventDefault();

		$(".gnb > ul > li > a").removeClass("active");
		$(this).addClass("active");
	});

  //map-toolbar
	$(".map-toolbar button").on("click", function (e){
		e.preventDefault();
		e.stopImmediatePropagation();

		const $this = $(this);
		const $mapBox = $this.closest('.map-box');
		const $toolbar = $this.closest('.map-toolbar');
		const $useAreaSel = $mapBox.find('.usearea-sel');

		// 용도지역 버튼 클릭 시
		if ($this.hasClass('usearea-btn')) {
			if ($this.hasClass('active')) {
				$this.removeClass('active');
				$useAreaSel.hide();
			} else {
				$toolbar.find('button').removeClass('active');
				$this.addClass('active');
				$useAreaSel.show();
			}
		} else {
			// 다른 버튼 클릭 시
			$toolbar.find('button').removeClass('active');
			$this.addClass('active');
			$useAreaSel.hide();
		}
	});

	// 초기 상태 설정
	$(".usearea-btn").each(function (){
		var $mapBox = $(this).closest('.map-box');
		if(!$(this).hasClass("active")){
			$mapBox.find(".usearea-sel").hide();
		} else {
			$mapBox.find(".usearea-sel").show();
		}
	});

	// 용도지역 연도 선택
	$(".admin-btn").on("click", function(){
		$(this).toggleClass("active");
		$(".admin-selbox").toggleClass("active");
	});

	// 용도지역 연도 선택
	$(".usearea-sel li").on("click", function(){
		$(this).addClass("active").siblings().removeClass("active");
	});

	// folding
	$(".fold-btn").on("click", function(){
		$(this).toggleClass("active");

		const $foldTit = $(this).parent(".deptit");

		if($(this).hasClass("active")){
			$foldTit.addClass("active");
			$foldTit.next("ul").show();
		}else{
			$foldTit.removeClass("active");
			$foldTit.next("ul").hide();
		}
	});

	// tbl tr 선택
	$(".tbl tr").on("click", function(){
		$(this).addClass("active").siblings().removeClass("active");
	});

	//select2
	$('.selectSingle2').select2();

	//floatThead 테이블 헤더 고정
	function applyFloatTheadAndMinWidth($scope){
		$scope.find('table.tbl.h-scroll').each(function(){
			const t = this;
			const $t = $(t);
			const $wrap = $t.closest('.tbl-wrap');

			if(!$wrap.length) return;

			if(!$t.is(':visible') || !$wrap.is(':visible')) return;

			// floatThead 적용/재계산
			if(!$t.data('floatThead')){
				$t.floatThead({
					scrollContainer: function($table){
						return $table.closest('.tbl-wrap');
					}
				});
			} else {
				$t.floatThead('reflow');
			}

			// floatThead가 자동으로 넣은 min-width(px) 제거 후, 가로 스크롤 없으면 100%
			t.style.removeProperty('min-width');

			const wrapEl = $wrap[0];
			const hasHScroll = wrapEl.scrollWidth > wrapEl.clientWidth + 1;

			if(!hasHScroll){
				t.style.width = '100%';
				t.style.minWidth = '100%';
			} else {
				t.style.removeProperty('width');
				t.style.removeProperty('min-width');
			}

			// 스타일 보정 후 다시 맞춤
			if($t.data('floatThead')) $t.floatThead('reflow');
		});
	}

	// tab
	$(".tab-menu > ul > li > a").on("click", function(e){
		e.preventDefault();
		e.stopPropagation();

		const $menu = $(this).closest(".tab-menu");   // 탭 메뉴
		const $content = $menu.next(".tab-content");  // 탭 콘텐츠
		const target = "#" + $(this).data("target");  // ex) #tab01
		const $target = $content.children(target);

		$menu.find("a").removeClass("active");
		$(this).addClass("active");

		$content.children("div").removeClass("active");
		$target.addClass("active");

		// 현재 탭이 "보인 다음"에만 처리
		setTimeout(function(){
			applyFloatTheadAndMinWidth($target);
		}, 0);
	});

	//folding
	$(".folding > li > .dept1").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
	});

	$(".top-menu > .land").click(function(){
		$(".popover-menu-wrap").toggleClass("active");
	});

	// 오른쪽 Map maptool active
	$(".mapset-btn").on("click", function(){
		$(".mapset-btn").removeClass("active");
  		$(this).addClass("active");

		$(".maptool-popup").hide();
		const target = $(this).data("popup");
		if (target) $("#" + target).show();
	});

	// Map 버튼별로 툴바 팝업
	const popupMap = {
		mapsel: "tp01",    //지도 설정
		layer: "tp02" ,     //레이어
	};

	$(".mapset-btn").on("click", function(){
		let btnClass = $(this).attr("class").split(" ")[1];  // 멀티 클래스 옆에 있는 이름
		let popupId = popupMap[btnClass];

		if (popupId) {
			$(".maptool-popup").hide();
			$("#" + popupId).show();
		}
	});

	// input text reset
	$(".regiMem").on("input", function() {
		const $clearBtn = $(this).next(".txtClear");

		if ($(this).val().length > 0) {
			$clearBtn.show();
		} else {
			$clearBtn.hide();
		}
	});

	$(".txtClear").on("click", function (e) {
		e.preventDefault();
		$(this).prev(".regiMem").val('');
		$(this).hide(); // 입력 지우면서 버튼도 숨기기
	});

	//dropdown
	$(".dropdown-btn").on("click", function (e){
		e.preventDefault();

		const $this = $(this);
		const $historycon = $this.closest('.cont-box').find(".drop-content");

		$this.toggleClass("active");

		if($this.hasClass("active")){
			$historycon.show();
		}else{
			$historycon.hide();
		}
	});

	$(".allcities-btn").on("click", function (e){
		e.preventDefault();

		const $this = $(this);
		const $county = $this.next(".usearea-sel");

		$this.toggleClass("active");

		if($this.hasClass("active")){
			$county.show();
		}else{
			$county.hide();
		}
	});

	// 컨텐츠 fold
	$(".foldcon-btn").on("click", function (e){
		e.preventDefault();

		const $this = $(this);
		const $foldContent = $this.closest('.cont-box').find('.fold-cont');

		$this.toggleClass("active");
		$foldContent.toggle($this.hasClass("active"));

		// 펼쳐진 다음에만 처리
		if ($this.hasClass("active")) {
			setTimeout(function(){
				applyFloatTheadAndMinWidth($foldContent);
			}, 0);
		}
	});

	// fold 초기화 (첫번째 컨텐츠 보이게)
	$(".foldcon-btn").each(function(index){
		if(index === 0){
			$(this).addClass("active");
			$(this).closest('.cont-box').find('.fold-cont').show();
		}
	});

	//dropdown 리스트 내용선택하면 text 바뀜
	$(".droplist li a").on("click", function(e){
		e.preventDefault();
		var txt = $(this).text();
		var $container = $(this).closest(".sel");
		
		// 텍스트 변경
		$container.find(".state-btn span").text(txt);
		
		// 닫기
		$container.find(".dropdown-btn").removeClass("active");
		$container.find(".drop-content").hide();
	});

	// file upload preview
	$(document).on("change", ".fileup-wrap .input-file", function(){
		var $this = $(this);
		if (this.files && this.files[0]) {
			var $label = $this.next("label");
			var reader = new FileReader();
			reader.onload = function (e) {
				$label.css('background-image', 'url(' + e.target.result + ')');
				$label.css('background-size', 'cover');
			}
			reader.readAsDataURL(this.files[0]);
		}
	});

	// switch toggle text
	$(document).on("change", ".switch input", function(){
		if($(this).is(":checked")){
			$(this).siblings(".sw-txt").text("활성화");
		} else {
			$(this).siblings(".sw-txt").text("비활성화");
		}
	});

	// 팝업 닫기 버튼 (지도선택, 레이어, 용도지역 등)
	$(document).on("click", ".maptool-popup .pop-close-btn, .usearea-sel .pop-close-btn", function() {
		const $popup = $(this).closest(".maptool-popup, .usearea-sel");
		$popup.hide();

		if ($popup.hasClass("maptool-popup")) {
			$(".mapset-btn").removeClass("active");
		} else if ($popup.hasClass("usearea-sel")){
			$popup.closest(".map-box").find(".usearea-btn").removeClass("active");
			$popup.prev(".allcities-btn").removeClass("active");
		}
	});

	// 로딩 후: "보이는 테이블만" 적용 (탭/폴드 숨김은 건드리지 않음)
	setTimeout(function(){
		applyFloatTheadAndMinWidth($('body'));
	}, 0);

	// 리사이즈 시에도 보정
	$(window).on('resize', function(){
		applyFloatTheadAndMinWidth($('body'));
	});


	// 지도영역 가로로 넓히기
	$(".expand-btn").on("click", function (e){
		e.preventDefault();

		const $this = $(this);
		const $searchArea = $(".result-view .search-area");
		const $mapArea = $(".result-view .map-area");
		$this.toggleClass("collapse");

		if($this.hasClass("collapse")){
			$searchArea.hide();
			$mapArea.css('width','100%')
		}else{
			$searchArea.show();
			$mapArea.css('width','585px')
		}
	});

	//filter
	$(".filter-btn").on("click", function (e){
		$(this).addClass("active").siblings().removeClass("active");
	});
});



function showPopup(popupId) {
	let $popup = $('#' + popupId);

	if($('.overlay').length === 0){
		$('body').append('<div class="overlay"></div>');
	}
	let $overlay = $('.overlay');

	$popup.show();
	$overlay.show();

	let top = ($(window).height() - $popup.outerHeight()) / 2;
	let left = ($(window).width() - $popup.outerWidth()) / 2;

	$popup.css({
		'top': top + 'px',
		'left': left + 'px'
	});

	// 팝업 Z-Index (다중 팝업 시 오버레이 위치 조정)
	let baseZ = 1000;
	let maxZ = baseZ;

	$('.layerpop-wrap:visible').not($popup).each(function(){
		let z = parseInt($(this).css('z-index')) || baseZ;
		if(z > maxZ) maxZ = z;
	});

	$overlay.css('z-index', maxZ + 1);
	$popup.css('z-index', maxZ + 2);
	
}

function closePopup(popupId) {
	$('#' + popupId).hide();

	let $visiblePopups = $('.layerpop-wrap:visible');

	if($visiblePopups.length === 0){
		$(".overlay").hide();
	} else {
		let maxZ = 0;
		$visiblePopups.each(function(){
			let z = parseInt($(this).css('z-index')) || 0;
			if(z > maxZ) maxZ = z;
		});
		$(".overlay").css('z-index', maxZ - 1);
	}
}
