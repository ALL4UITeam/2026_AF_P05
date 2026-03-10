$(document).ready(function(){

  // ✅ [추가] floatThead 공용 처리 (보이는 테이블만!)
  function initOrReflowFloatThead($scope){
    $scope.find('table.tbl.h-scroll').each(function(){
      const $t = $(this);
      const $wrap = $t.closest('.tbl-wrap');

      // 숨김 상태면 절대 init/reflow 금지 (헤더 날아가는 원인)
      if (!$t.is(':visible')) return;
      if (!$wrap.length || !$wrap.is(':visible')) return;

      if (!$t.data('floatThead')) {
        $t.floatThead({
          scrollContainer: function($table){
            return $table.closest('.tbl-wrap');
          }
        });
      } else {
        $t.floatThead('reflow');
      }
    });
  }

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
	$(".tab-menu > ul > li > a").click(function(e){
		e.preventDefault();

		const $menu = $(this).closest(".tab-menu");   // 탭 메뉴
		const $content = $menu.next(".tab-content");  // 탭 콘텐츠
		const target = "#" + $(this).data("target");  // ex) #tab01
		const $target = $content.children(target);

		$menu.find("a").removeClass("active");
		$(this).addClass("active");

		$content.children("div").removeClass("active");
		$target.addClass("active");

    // ✅ [교체] 탭 영역만, 보이는 다음에 init/reflow
    setTimeout(function(){
      requestAnimationFrame(function(){
        initOrReflowFloatThead($target);
      });
    }, 50);

		// ❌ [삭제] 전역 reflow 2줄 (이게 탭 숨김 테이블까지 건드려서 헤더 날림)
		// $('.tbl.h-scroll').each(function(){
		// 	let $thead = $(this);
		// 	if ($thead.data('floatThead')) {
		// 		$thead.floatThead('reflow');
		// 	}
		// });
		// $('.tbl.h-scroll').floatThead('reflow');
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
		$(this).hide();
	});

  //업로드 이력관리
  $(".uphistory-btn").on("click", function (e){
      e.preventDefault();

      const $this = $(this);
      const $historycon = $this.closest('.cont-box').find(".up-history");

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

		// ✅ [교체] 펼쳐진 다음 해당 영역만 init/reflow
		if ($this.hasClass("active")) {
      setTimeout(function(){
        requestAnimationFrame(function(){
          initOrReflowFloatThead($foldContent);
        });
      }, 50);
		}

    // ❌ 기존 reflow만 호출하던 줄 제거
		// if ($this.hasClass("active")) {
		//   $foldContent.find('.tbl.h-scroll').floatThead('reflow');
		// }
	});

	// fold 초기화 (첫번째 컨텐츠 보이게)
	$(".foldcon-btn").each(function(index){
		if(index === 0){
			$(this).addClass("active");
			$(this).closest('.cont-box').find('.fold-cont').show();
		}
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

	// ✅ [교체] 테이블 제목 고정 스크롤 (처음부터 "보이는" 것만 init)
  setTimeout(function(){
    initOrReflowFloatThead($('body'));
  }, 100);

}); // ✅ ready 끝



// ===== 아래 showPopup / closePopup은 ready 밖에 그대로 두는게 맞음 =====
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
