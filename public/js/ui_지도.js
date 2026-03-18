$(document).ready(function(){
	// gnb
	$(".gnb > ul > li > a").on("click", function (e){
		e.preventDefault();

		$(".gnb > ul > li > a").removeClass("active");
		$(this).addClass("active");
	});
	
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

	// tab
    $('.tabMenu ul li a').click(function(e) {
        e.preventDefault();

        var target = $(this).attr('href');

        $('.tabContents > div').hide();
        $(target).show();

        $('.tabMenu ul li a').removeClass('active');
        $(this).addClass('active');
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

	// 지도 확대/축소
	$(".size-control .mapset-btn").on("click", function(){
		var $bar = $(this).siblings(".size-box").find(".bar");
		var currentHeight = parseInt($bar[0].style.height);
		if (isNaN(currentHeight)) currentHeight = 50;

		if ($(this).hasClass("zoomin")) {
			currentHeight -= 10;
		} else if ($(this).hasClass("zoomout")) {
			currentHeight += 10;
		}

		if (currentHeight > 100) currentHeight = 100;
		if (currentHeight < 0) currentHeight = 0;

		$bar.css("height", currentHeight + "%");
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

});

	
	
	function showPopup(popupId) {
		let $popup = $('#' + popupId);
		// let popupHeight = $popup.offsetHeight;
		//let windowHeight = window.innerHeight;
	
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

		// 현재 떠있는 다른 팝업들의 z-index 확인
		$('.layerpop-wrap:visible').not($popup).each(function(){
			let z = parseInt($(this).css('z-index')) || baseZ;
			if(z > maxZ) maxZ = z;
		});

		// 오버레이를 가장 높은 팝업 위로, 새 팝업을 그 위로 설정
		$overlay.css('z-index', maxZ + 1);
		$popup.css('z-index', maxZ + 2);
	}
	
	function closePopup(popupId) {
		$('#' + popupId).hide();
		
		let $visiblePopups = $('.layerpop-wrap:visible');
		
		if($visiblePopups.length === 0){
			$(".overlay").hide();
		} else {
			// 아직 열린 팝업이 있다면 오버레이 z-index를 조정하여 남은 팝업 중 최상위 팝업 아래로 이동
			let maxZ = 0;
			$visiblePopups.each(function(){
				let z = parseInt($(this).css('z-index')) || 0;
				if(z > maxZ) maxZ = z;
			});
			$(".overlay").css('z-index', maxZ - 1);
		}
	}