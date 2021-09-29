$(function() {
  // 컨텐츠 네비게이션 hover에 관한 이벤트 구문
  const $contNav = $(".maincont > section > .section-head > .mnu-box> nav > .cont-nav > li > a");
  const $bar = $(".maincont > section > .section-head > .mnu-box> nav > .bar");

  let nowIdx = 0;

  $("a").on("click", function(evt){
    evt.preventDefault();
  });

  $contNav.on("mouseover", function(){
    const left = $(this).offset().left;
    const width = $(this).css("width");

    $bar.stop().animate({
      left : left,
      width : width
    }, 800);
  });

  $contNav.on("mouseout", function(){
    nowIdx = $contNav.parent().has(".on").children();

    const left = nowIdx.offset().left;
    const width = nowIdx.css("width");

    $bar.stop().animate({
      left : left,
      width : width
    }, 800);
  });

  // 색상안내 영역에 대한 이벤트 구문
  const $colorList = $(".maincont > section > .contents > .design > .list > a");
  const $colorView = $(".maincont > section > .contents > .design > .color > dl");

  $colorList.on("click", function(){
    const winWidth = $("html, body").css("width").replace("px", "");

    nowIdx = $colorList.index(this)

    // 활성화
    $colorList.eq(nowIdx).addClass("on").siblings().removeClass("on");

    if(winWidth > 768){
    // 출력
    $colorView.eq(nowIdx).css({display:"flex"}).siblings().css({display:"none"});
  } else {
      // 출력
      $colorView.eq(nowIdx).css({display:"grid"}).siblings().css({display:"none"});
    }
  });

  // 상세스펙 영역에 대한 이벤트 구문
  const $specList = $(".maincont > section > .contents > .detail > .detail-list-box > .list > a");
  const $specView = $(".maincont > section > .contents > .detail > .spec > ul");
 
  $specList.on("click", function(){
    nowIdx = $specList.index(this)

    // 활성화
    $specList.eq(nowIdx).addClass("on").siblings().removeClass("on");

    // 출력
    $specView.eq(nowIdx).css({display:"block"}).siblings().css({display:"none"});
  });

  // 네트워크 속도 맞춤영역
  const $viewText = $(".maincont > article > .info > .info-container > ul > li > a");
  const $selectSpeed = $(".maincont > article > .info > .info-container > ul > li > ol > li > a");

  $viewText.on("click", function(e){
    e.stopPropagation();
    $selectSpeed.parents("ol").toggle();
  });

  $("html, body").on("click", function(){
    $selectSpeed.parents("ol").hide();
  });


  $selectSpeed.on("click", function(){
    nowIdx = $selectSpeed.index(this);

    if(nowIdx === 0){
      $viewText.children(".speed").text("(높음)");
    }else{
      $viewText.children(".speed").text("(낮음)");
    };

    $selectSpeed.parents("ol").hide();
  });

  // 페이지 설명 영역 속성 버튼
  const $btn = $(".maincont > article > .option > button");

  $btn.on("click", function(){
    
    if($(this).hasClass("normal")){
      $viewText.css({backgroundColor: "#f7f7f7", color: "#666"});
      $viewText.parents("ul").children("ol").css({backgroundColor: "#f7f7f7", color: "#666"});
      $viewText.children(".down").css({borderColor: "#000 transparent transparent transparent"});
      $(".info").css({backgroundColor: "#f7f7f7"});
      $(".info-container").css({color: "#666"});
    }else{
      $viewText.css({backgroundColor: "#000", color: "#fff01f"});
      $viewText.parents("ul").children("ol").css({backgroundColor: "#000", color: "#fff01f"});
      $viewText.children(".down").css({borderColor: "#fff01f transparent transparent transparent"});
      $(".info").css({backgroundColor: "#000"});
      $(".info-container").css({color: "#fff01f"});
    }
  });

  // 상단고정 컨텐츠
  const $mnu = $(".maincont > section > .section-head > .mnu-box");
  const $specListBox = $(".maincont > section > .contents > .detail > .detail-list-box");
  const $suvcontBox = $(".maincont > section > .subcont")
  const $up = $(".side > .up");

  const mnuTop = $mnu.offset().top;
  const specTop = $specListBox.offset().top;
  const lastTop = $suvcontBox.offset().top;

  const winWidth = $("html, body").css("width").replace("px", "");

  
  $(window).on("scroll", function(){
    const scrollTop = $("html, body").scrollTop();

    // 컨텐츠 네비게이션 상단 고정
    if(scrollTop > mnuTop){
      $mnu.addClass("mnu-fixed");
    }else{
      $mnu.removeClass("mnu-fixed");
    };

    // 상세스펙 리스트 상단 고정
    if(winWidth > 768){
        if(scrollTop > (specTop + 100) && scrollTop < (lastTop - 50)){
        $specListBox.addClass("list-box-fixed").children(".list").css({marginTop:0});
      }else{
        $specListBox.removeClass("list-box-fixed").children(".list").css({marginTop:20});
      };
    }else{
      if(scrollTop > (specTop - 100) && scrollTop < (lastTop - 300)){
        $specListBox.addClass("list-box-fixed").css({top:70}).children(".list").css({marginTop:0});
      }else{
        $specListBox.removeClass("list-box-fixed").children(".list").css({marginTop:20});
      };
    }

    // 페이지 상단이동 버튼
    if(scrollTop > 400){
      $up.css({display:"block"});
    }else{
      $up.css({display:"none"});
    }
  });

  // 페이지 상단이동 버튼
  $up.on("click", function(){
    $("html, body").animate({scrollTop:0});
  });

  // 화면 로딩 후 메뉴 활성화
  $(window).on("load", function(){
    nowIdx = $contNav.parent().has(".on").children();

    const left = nowIdx.offset().left;
    const width = nowIdx.css("width");

    $bar.css({
      left : left,
      width : width
    });
  });
});
