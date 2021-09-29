$(function(){
  // 글로벌 네비게이션 영역
  const $gnbContainer = $("#wrap > header > .main-mnu-container");
  const $gnb = $("#wrap > header > .main-mnu-container > .main-mnu > nav > .gnb > li > a")
  const $search = $("#wrap > header > .main-mnu-container > .main-mnu > .search");

  // 스크롤 이벤트
  $(window).on("scroll", function(){
    const top = $(window).scrollTop();

    if(top > 100){
      $gnbContainer.stop().animate({height:80}, 200).css({backgroundColor : "#fff"}).children(".main-mnu").css({paddingTop:40});
      $gnb.css({color:"#000"});
      $search.css({backgroundImage : "url(./../images/ico_search2.png)"})
    } else{
      $gnbContainer.stop().animate({height:100}, 200).css({backgroundColor : "initial"}).children(".main-mnu").css({paddingTop:50});
      $gnb.css({color:"#fff"});
      $search.css({backgroundImage : "url(./../images/ico-search.png)"})
    }
  });

  // 메인 비주얼 슬라이드 영역
  const $mainContainer = $("#wrap > header > .main-visual-container");
  const $mainSlide = $("#wrap > header > .main-visual-container > .main-visual");
  const $mainImg = $("#wrap > header > .main-visual-container > .main-visual > .visual");
  const $mainIndi = $("#wrap > header > .main-visual-container > .indigator > li > a");

  const mainWidth = $mainImg.width();
  let mainIdx = 0;
  
  // 메인 비주얼 슬라이드 함수선언
  const slideFn = function(){};

  // 자동 슬라이드
  let pauseKey = setInterval(function(){
    const $mainSlide = $("#wrap > header > .main-visual-container > .main-visual");
    const $firstImg = $("#wrap > header > .main-visual-container > .main-visual > .visual").eq(0);
    const $secondImg = $("#wrap > header > .main-visual-container > .main-visual > .visual").eq(1);
    
    if(mainIdx < 2){
      mainIdx++;
    } else{
      mainIdx = 0;
    }
    $mainIndi.eq(mainIdx).parent().addClass("on").siblings().removeClass("on");

    $secondImg.animate({left:0}, function(){
      $firstImg.css({left:mainWidth});
      $firstImg.appendTo($mainSlide);
    });
  }, 3000);

  // 인디게이터 클릭 이벤트
  $mainIndi.on("click", function(evt){
    evt.preventDefault();
    clearInterval(pauseKey);

    mainIdx = $mainIndi.index(this);

    $mainIndi.eq(mainIdx).parent().addClass("on").siblings().removeClass("on");

    if(mainIdx === 0){
      $mainImg.css({zIndex:-1});
      $mainSlide.children(".visual1-container").css({zIndex:0}).stop().animate({left:0}, function(){
        $mainSlide.children(".visual1-container").siblings().css({left: mainWidth});
      });
    }else if(mainIdx === 1){
      $mainImg.css({zIndex:-1});
      $mainSlide.children(".visual2-container").css({zIndex:0}).stop().animate({left:0}, function(){
        $mainSlide.children(".visual2-container").siblings().css({left: mainWidth});
      });
    }else if(mainIdx === 2){
      $mainImg.css({zIndex:-1});
      $mainSlide.children(".visual3-container").css({zIndex:0}).stop().animate({left:0}, function(){
        $mainSlide.children(".visual3-container").siblings().css({left: mainWidth});
      });
    }
  });

  // 일시정지 버튼 클릭 이벤트
  const $play = $("#wrap > header > .main-visual-container > .play");

  $play.on("click", function(evt){
    evt.preventDefault();

    if($(this).hasClass("pause")){
      clearInterval(pauseKey);
      $(this).removeClass("pause");
    } else {
      pauseKey = setInterval(function(){
        const $mainSlide = $("#wrap > header > .main-visual-container > .main-visual");
        const $firstImg = $("#wrap > header > .main-visual-container > .main-visual > .visual").eq(0);
        const $secondImg = $("#wrap > header > .main-visual-container > .main-visual > .visual").eq(1);
        
        if(mainIdx < 2){
          mainIdx++;
        } else{
          mainIdx = 0;
        }
        $mainIndi.eq(mainIdx).parent().addClass("on").siblings().removeClass("on");

        $secondImg.animate({left:0}, function(){
          $firstImg.css({left:mainWidth});
          $firstImg.appendTo($mainSlide);
        });
      }, 3000);
      $(this).addClass("pause");
    }
  });

  // 베스트 메뉴 영역
  const $menuImg = $("#wrap > section > .best-menu-container > .menu-img-container > .menu-img-slide");
  const $menuText = $("#wrap > section > .best-menu-container > .menu-intro > .menu-text-container > .menu-text-slide > .menu-text");
  const $menuPage = $("#wrap > section > .best-menu-container > .menu-intro > .menu-text-container > .pagination > li > a");
  const $btnPrev = $("#wrap > section > .best-menu-container > .menu-intro > .menu-text-container > .prev");
  const $btnNext = $("#wrap > section > .best-menu-container > .menu-intro > .menu-text-container > .next");

  const imgWidth = $menuImg.children("li").width();
  let check = false;
  let bestIdx = 0;

  // 이전 버튼 클릭 이벤트
  $btnPrev.on("click", function(evt){
    evt.preventDefault();

    if(check === false){
      check = true;

      if(bestIdx > 0){
        bestIdx--;
      }else{
        bestIdx = 4;
      }

      // 배경 이미지 슬라이드
      $menuImg.stop().animate({left:(-imgWidth * 4)}, function(){
        const $lastImg = $(".menu-img-slide > li").last();

        $lastImg.prependTo($menuImg);
        $menuImg.css({left:(-imgWidth * 5)});

        check = false;
      });

      // 텍스트 슬라이드
      $menuText.eq(bestIdx).stop().fadeIn().siblings().fadeOut();
      $menuPage.eq(bestIdx).parent().addClass("on").siblings().removeClass("on");
    }
  });

  // 다음 버튼 클릭 이벤트
  $btnNext.on("click", function(evt){
    evt.preventDefault();

    if(check === false){
      check = true;

      if(bestIdx < 4){
        bestIdx++;
      }else{
        bestIdx = 0;
      }

      // 배경 이미지 슬라이드
      $menuImg.stop().animate({left:(-imgWidth * 6)}, function(){
        const $firstImg = $(".menu-img-slide > li").first();

        $firstImg.appendTo($menuImg);
        $menuImg.css({left:(-imgWidth * 5)});

        check = false;
      });

      // 텍스트 슬라이드
      $menuText.eq(bestIdx).stop().fadeIn().siblings().fadeOut();
      $menuPage.eq(bestIdx).parent().addClass("on").siblings().removeClass("on");
    }
  });

  // 페이지네이션 클릭 이벤트
  $menuPage.on("click", function(evt){
    evt.preventDefault();

    let nowIdx = $menuPage.index(this);

    $menuPage.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
    $menuText.eq(nowIdx).stop().fadeIn().siblings().fadeOut();

    $menuImg.stop().animate({left:(-imgWidth * (5 + nowIdx - bestIdx))});
  });

  // 패밀리사이트 영역
  const $family = $("#wrap > footer > .footer-container > .family > a");
  const $siteList = $("#wrap > footer > .footer-container > .family > .site");

  $family.on("click", function(evt){
    evt.preventDefault();

    $family.parent().toggleClass("click");
    $siteList.stop().animate({top:-360}, 3000);
  });

  // top버튼 영역
  // 클릭 이벤트
  const $top = $("#wrap > section > .top > a");

  $top.on("click", function(){
    $(window).scrollTop(0);
  });
});