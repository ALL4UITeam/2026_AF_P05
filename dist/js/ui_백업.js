$(document).ready(function(){

  function fthInit($scope){
    $scope.find('table.tbl.h-scroll').each(function(){
      const $t = $(this);
      if ($t.data('floatThead')) return;

      $t.floatThead({
        scrollContainer: function($table){
          return $table.closest('.tbl-wrap');
        }
      });
    });
  }

  function fthReflow($scope){
    $scope.find('table.tbl.h-scroll').each(function(){
      const $t = $(this);

      if (!$t.data('floatThead')) {
        $t.floatThead({
          scrollContainer: function($table){
            return $table.closest('.tbl-wrap');
          }
        });
      }

      requestAnimationFrame(() => {
        // 1) floatThead 기본 계산
        $t.floatThead('reflow');

        const $wrap = $t.closest('.tbl-wrap');
        const $wrapper = $t.closest('.floatThead-wrapper');
        const $container = $wrapper.children('.floatThead-container');
        const $headTable = $container.find('table.floatThead-table'); // 복제 헤더 테이블

        if (!$wrap.length || !$container.length || !$headTable.length) return;

        // 2) ✅ 핵심: 원본 테이블의 "진짜 픽셀 폭"을 헤더 복제 테이블에 강제
        //    - getBoundingClientRect()는 화면상 실제 렌더 폭(px)
        //    - scrollWidth는 내용 기준 실제 전체 폭(px) (가로 스크롤 있을 때 중요)
        const bodyRectW = Math.ceil($t[0].getBoundingClientRect().width);
        const bodyScrollW = Math.ceil($t[0].scrollWidth);
        const fixedW = Math.max(bodyRectW, bodyScrollW);

        $headTable.css({
          width: fixedW + 'px',
          minWidth: fixedW + 'px'
        });

        // 3) 헤더 컨테이너는 "보이는 영역 폭"으로 유지 (가로스크롤 동작 유지)
        //    clientWidth = 세로스크롤바 제외한 실제 보이는 폭
        $container.css('width', $wrap[0].clientWidth + 'px');

        // 4) (선택) 혹시 floatThead가 %width를 다시 박는 경우 한 번 더 reflow
        //    - 아래 줄이 없으면 그대로 두고,
        //    - 아직 1~2px 튀면 주석 풀어
        // $t.floatThead('reflow');
      });
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
      $toolbar.find('button').removeClass('active');
      $this.addClass('active');
      $useAreaSel.hide();
    }
  });

  $(".usearea-btn").each(function (){
    var $mapBox = $(this).closest('.map-box');
    if(!$(this).hasClass("active")){
      $mapBox.find(".usearea-sel").hide();
    } else {
      $mapBox.find(".usearea-sel").show();
    }
  });

  $(".admin-btn").on("click", function(){
    $(this).toggleClass("active");
    $(".admin-selbox").toggleClass("active");
  });

  $(".usearea-sel li").on("click", function(){
    $(this).addClass("active").siblings().removeClass("active");
  });

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

  $(".tbl tr").on("click", function(){
    $(this).addClass("active").siblings().removeClass("active");
  });

  $('.selectSingle2').select2();

  // tab
  $(".tab-menu > ul > li > a").click(function(e){
    e.preventDefault();
    e.stopPropagation();

    const $menu = $(this).closest(".tab-menu");
    const $content = $menu.next(".tab-content");
    const target = "#" + $(this).data("target");

    $menu.find("a").removeClass("active");
    $(this).addClass("active");

    $content.children("div").removeClass("active");
    $content.children(target).addClass("active");

    setTimeout(() => fthReflow($content.children(target)), 0);
  });

  $(".folding > li > .dept1").click(function(e) {
    e.preventDefault();
    $(this).toggleClass("active");
  });

  $(".top-menu > .land").click(function(){
    $(".popover-menu-wrap").toggleClass("active");
  });

  $(".mapset-btn").on("click", function(){
    $(".mapset-btn").removeClass("active");
    $(this).addClass("active");

    $(".maptool-popup").hide();
    const target = $(this).data("popup");
    if (target) $("#" + target).show();
  });

  const popupMap = { mapsel: "tp01", layer: "tp02" };

  $(".mapset-btn").on("click", function(){
    let btnClass = $(this).attr("class").split(" ")[1];
    let popupId = popupMap[btnClass];

    if (popupId) {
      $(".maptool-popup").hide();
      $("#" + popupId).show();
    }
  });

  $(".regiMem").on("input", function() {
    const $clearBtn = $(this).next(".txtClear");
    if ($(this).val().length > 0) $clearBtn.show();
    else $clearBtn.hide();
  });

  $(".txtClear").on("click", function (e) {
    e.preventDefault();
    $(this).prev(".regiMem").val('');
    $(this).hide();
  });

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

  $(".foldcon-btn").on("click", function (e){
    e.preventDefault();

    const $this = $(this);
    const $foldContent = $this.closest('.cont-box').find('.fold-cont');

    $this.toggleClass("active");
    $foldContent.toggle($this.hasClass("active"));

    if ($this.hasClass("active")) {
      setTimeout(() => fthReflow($foldContent), 0);
    }
  });

  $(".foldcon-btn").each(function(index){
    if(index === 0){
      $(this).addClass("active");
      $(this).closest('.cont-box').find('.fold-cont').show();
    }
  });

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

  $(document).on("change", ".switch input", function(){
    $(this).siblings(".sw-txt").text($(this).is(":checked") ? "활성화" : "비활성화");
  });

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

  // 테이블 제목 고정 스크롤 (초기화 1회)
  fthInit($(document));
  setTimeout(() => fthReflow($(document)), 0);

  $(window).on('resize', function(){
    fthReflow($(document));
  });

});
