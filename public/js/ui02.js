$(document).ready(function(){

  /* =========================
    [추가] sticky thead 자동 보정
    - 헤더 1줄 높이를 계산해서 2줄째 top 값 자동 세팅
    - 탭/접힘/리사이즈 시 다시 계산
  ========================= */
  function setNoVScrollClass(){
  $('.tbl-wrap.scroll').each(function(){
    const el = this;
    const hasV = el.scrollHeight > el.clientHeight + 1;
    $(el).toggleClass('no-vscroll', !hasV);
  });
}

  function stickyHeadFix($scope){
    $scope.find('table.tbl.h-scroll').each(function(){
      const $t = $(this);
      const $thead = $t.find('thead');
      if (!$thead.length) return;

      const $row1 = $thead.find('tr').eq(0);
      if (!$row1.length) return;

      // 1번째 헤더 줄 높이(픽셀) 측정
      const h1 = Math.ceil($row1[0].getBoundingClientRect().height);

      // 테이블에 CSS 변수로 저장 (2번째 줄 top에 사용)
      this.style.setProperty('--thead-row1-h', h1 + 'px');
    });
  }

  function stickyHeadRefresh($scope){
    // 보이는 다음 프레임에서 계산(탭/접힘 display 변경 대응)
    requestAnimationFrame(() => stickyHeadFix($scope));
  }

  /* =========================
    기존 너 코드 시작 (floatThead 관련은 삭제!)
  ========================= */

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
    e.stopPropagation();

    const $menu = $(this).closest(".tab-menu");
    const $content = $menu.next(".tab-content");
    const target = "#" + $(this).data("target");

    $menu.find("a").removeClass("active");
    $(this).addClass("active");

    $content.children("div").removeClass("active");
    $content.children(target).addClass("active");

    // [수정] floatThead reflow 대신 sticky 헤더 재계산
    stickyHeadRefresh($content.children(target));
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
  const popupMap = { mapsel: "tp01", layer: "tp02" };

  $(".mapset-btn").on("click", function(){
    let btnClass = $(this).attr("class").split(" ")[1];
    let popupId = popupMap[btnClass];

    if (popupId) {
      $(".maptool-popup").hide();
      $("#" + popupId).show();
    }
  });

  // input text reset
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

  //업로드 이력관리
  $(".uphistory-btn").on("click", function (e){
    e.preventDefault();

    const $this = $(this);
    const $historycon = $this.closest('.cont-box').find(".up-history");

    $this.toggleClass("active");

    if($this.hasClass("active")) $historycon.show();
    else $historycon.hide();
  });

  //시군 선택
  $(".allcities-btn").on("click", function (e){
    e.preventDefault();

    const $this = $(this);
    const $county = $this.next(".usearea-sel");

    $this.toggleClass("active");

    if($this.hasClass("active")) $county.show();
    else $county.hide();
  });

  // 컨텐츠 fold
  $(".foldcon-btn").on("click", function (e){
    e.preventDefault();

    const $this = $(this);
    const $foldContent = $this.closest('.cont-box').find('.fold-cont');

    $this.toggleClass("active");
    $foldContent.toggle($this.hasClass("active"));

    // [수정] 펼쳐질 때 sticky 헤더 재계산
    if ($this.hasClass("active")) {
      stickyHeadRefresh($foldContent);
    }
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
    $(this).siblings(".sw-txt").text($(this).is(":checked") ? "활성화" : "비활성화");
  });

  // 팝업 닫기 버튼
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

  // [추가] 최초 1회 sticky 헤더 계산
  stickyHeadRefresh($(document));

  // [추가] 리사이즈 때도 재계산
  $(window).on("resize", function(){
    stickyHeadRefresh($(document));
  });

});

// 최초 실행
setNoVScrollClass();

// 화면 크기 바뀌면 다시 체크
$(window).on('resize', setNoVScrollClass);

// 탭 전환/접힘 후에도 다시 체크 (display 바뀌니까)
$(document).on('click', '.tab-menu a, .foldcon-btn', function(){
  setTimeout(setNoVScrollClass, 0);
});