$(function() {
	const $gnb = $('#wrap > header > nav > .gnb > li > a')
	const $char = $('#wrap > section > .about_me > .cont_box > .i_am >.char')
	const $career = $('#wrap > section > .life > .cont_box > .work > .career > li')
	const $skill = $('#wrap > section > .life > .cont_box > .skill > .skill-box > img')
	const $portList = $("#wrap > section > .portfolio > .cont_box > .list > li > a");
	const $portView = $("#wrap > section > .portfolio > .cont_box > .view-container > .view");
	const $goTop = $("#wrap > section > .top");

	const topArr = [0]
	for (let i = 0; i < 4; i++) {
		topArr[i + 1] = $('article').eq(i).offset().top
	}

	// 스크롤에 대한 이벤트
	$(window).on('scroll', function() {
		const top = $(window).scrollTop()

		// 글로벌네이게이션 활성화
		for (let i = 0; i < 5; i++) {
			if (top >= topArr[i] - 250) {
				$gnb.eq(i).parent().addClass('on').siblings().removeClass('on')
			}
		}

		// 성격 설명 영역 노출
		if (top >= topArr[1] - 100 && top < topArr[2]) {
			$char.eq(0).slideDown(1000)
			$char.eq(1).slideDown(1000)
		} else {
			$char.slideUp()
		}

		// 경력 노출
		if (top >= 1600 && top < topArr[3] - 250) {
			for (let i = 0; i < 7; i++) {
				$career.eq(i).delay((i + 1) * 100).stop().fadeIn(1000)
			}
		} else {
			$career.css({
				display: 'none'
			})
		}

		// 위로가기 버튼 노출
		if(top >= 500){
			$goTop.css({display:"block"});
		}else{
			$goTop.css({display:"none"});
		}
	})

	// 글로벌네비게이션 클릭 이벤트
	$gnb.on('click', function(evt) {
		evt.preventDefault()

		const nowIdx = $gnb.index(this)

		$('html, body').stop().animate({ scrollTop: topArr[nowIdx] }, 1000, 'easeInOutCubic')

		$(this).parent().addClass('on').siblings().removeClass('on')
	})

	// SKILL영역의 마우스엔터 이벤트
	$skill.on('mouseenter', function() {
		const nowIdx = $skill.index(this)

		$skill.eq(nowIdx).css({
			transition: 'all 0.5s',
			transform: 'scale(1.3)'
		})
	})

	// SKILL영역의 마우스리브 이벤트
	$skill.on('mouseleave', function() {
		$skill.css({
			transition: 'all 0.5s',
			transform: 'none'
		})
	})

	// portfolio영역의 클릭 이벤트
	$portList.on("click", function(evt){
		evt.preventDefault();

		const nowIdx = $portList.index(this);

		$(this).parent().addClass('on').siblings().removeClass('on')

		$portView.eq(nowIdx).stop().fadeIn().siblings().stop().fadeOut();
	});

	// 위로가기 버튼 클릭 이벤트

	$goTop.on("click", function(evt){
		evt.preventDefault();

		$('html, body').stop().animate({
			scrollTop: topArr[0]
		})

		$gnb.eq(0).parent().addClass('on').siblings().removeClass('on')
	});
})
