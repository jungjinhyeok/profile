$(function() {
	const $gnb = $('header > nav > .gnb > li > a')
	const $banner = $('header > .banner_container > .banner')
	const $cont = $('section > article > div > ul > li')
	const $lnb = $('section > article > nav > .lnb > li > a')
	const $slidesArr = []
	for (let i = 0; i < 5; i++) {
		$slidesArr[i] = $(
			'section > article:nth-of-type(' +
				(i + 1) +
				') > div > ul > li:nth-of-type(2) > .slides-frame > .slides'
		)
	}

	const $odongdoThmbs = $(
		'section > .odongdo > .odongdo_container > .odongdo_cont > li:nth-of-type(2) > .thmbs > li > a'
	)
	const $muralThmbs = $(
		'section > .mural-village > .mural-village_container > .mural-village_cont > li:nth-of-type(2) > .thmbs > li > a'
	)
	const $dolsanThmbs = $(
		'section > .dolsan-park > .dolsan-park_container > .dolsan-park_cont > li:nth-of-type(2) > .thmbs > li > a'
	)
	const $hamelThmbs = $(
		'section > .hamel-lighthouse > .hamel-lighthouse_container > .hamel-lighthouse_cont > li:nth-of-type(2) > .thmbs > li > a'
	)
	const $romanticThmbs = $(
		'section > .romantic-cart-bars > .romantic-cart-bars_container > .romantic-cart-bars_cont > li:nth-of-type(2) > .thmbs > li > a'
	)

	const $btnPrevArr = []
	for (let i = 0; i < 5; i++) {
		$btnPrevArr[i] = $(
			'section > article:nth-of-type(' +
				(i + 1) +
				') > div > ul > li:nth-of-type(2) > .slides-frame > .prev'
		)
	}

	const $btnNextArr = []
	for (let i = 0; i < 5; i++) {
		$btnNextArr[i] = $(
			'section > article:nth-of-type(' +
				(i + 1) +
				') > div > ul > li:nth-of-type(2) > .slides-frame > .next'
		)
	}

	const $videoArr = []
	for (let i = 0; i < 5; i++) {
		$videoArr[i] = $(
			'section > article:nth-of-type(' +
				(i + 1) +
				') > div > ul > li:last-child > .video_container > .video'
		)
	}

	const $odongdoVideoThmbs = $(
		'section	> .odongdo	> .odongdo_container	> .odongdo_cont	> li:last-child	> .video-list	> li > a'
	)
	const $muralVideoThmbs = $(
		'section	> .mural-village	> .mural-village_container	> .mural-village_cont	> li:last-child	> .video-list	> li > a'
	)
	const $dolsanVideoThmbs = $(
		'section	> .dolsan-park	> .dolsan-park_container	> .dolsan-park_cont	> li:last-child	> .video-list	> li > a'
	)
	const $hamelVideoThmbs = $(
		'section	> .hamel-lighthouse	> .hamel-lighthouse_container	> .hamel-lighthouse_cont	> li:last-child	> .video-list	> li > a'
	)
	const $romanticVideoThmbs = $(
		'section	> .romantic-cart-bars	> .romantic-cart-bars_container	> .romantic-cart-bars_cont	> li:last-child	> .video-list	> li > a'
	)

	let pauseKey
	let bannerIdx = 0
	let nowIdx = 0
	const topArr = []
	topArr[0] = $('.banner_container').offset().top
	for (let i = 1; i < 6; i++) {
		topArr[i] = $('section > article:nth-of-type(' + i + ')').offset().top
	}

	const nowBannerFn = function() {
		if (bannerIdx < 3) {
			bannerIdx++
		} else {
			bannerIdx = 0
		}

		$banner.stop().animate({
			marginLeft: -1200 * bannerIdx
		})
	}

	const nowSlideFn = function(idx, nowSlide) {
		$slidesArr[nowSlide].stop().animate({
			marginLeft: -870 * [idx]
		})
	}

	const nowVideoFn = function(idx, nowVideo) {
		$videoArr[nowVideo].stop().animate({
			marginLeft: -870 * [idx]
		})
	}

	// a태그 기본기능 작동방지
	$('a').on('click', function(evt) {
		evt.preventDefault()
	})

	// gnb click에 따른 화면이동과 활성화
	$gnb.on('click', function() {
		nowIdx = $gnb.index(this)

		$('html, body').stop().animate({ scrollTop: topArr[nowIdx] - 60 })

		$(this).parent().addClass('on').siblings().removeClass('on')
	})

	// 보이는 화면에 따른 gnb 활성화
	$(window).on('scroll', function() {
		let scrollTop = $(window).scrollTop()

		for (let i = 0; i < 6; i++) {
			if (scrollTop >= topArr[i] - 250) {
				$gnb.eq(i).parent().addClass('on').siblings().removeClass('on')
			}
		}
	})

	// lnb click에 따른 컨텐츠 활성화
	$lnb.on('click', function() {
		nowIdx = $lnb.index(this)

		$cont.eq(nowIdx).css({ display: 'block' }).siblings().css({ display: 'none' })

		$lnb.eq(nowIdx).parent().addClass('select').siblings().removeClass('select')

		nowIdx = 0
	})

	// 관련사진 컨텐츠 썸네일 기능
	$odongdoThmbs.on('click', function() {
		nowIdx = $odongdoThmbs.index(this)

		$odongdoThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img odongdo_thmb')
			.siblings()
			.removeClass('on_img odongdo_thmb')

		nowSlideFn(nowIdx, 0)
	})

	$muralThmbs.on('click', function() {
		nowIdx = $muralThmbs.index(this)

		$muralThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img mural_thmb')
			.siblings()
			.removeClass('on_img mural_thmb')

		nowSlideFn(nowIdx, 1)
	})

	$dolsanThmbs.on('click', function() {
		nowIdx = $dolsanThmbs.index(this)

		$dolsanThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img dolsan_thmb')
			.siblings()
			.removeClass('on_img dolsan_thmb')

		nowSlideFn(nowIdx, 2)
	})

	$hamelThmbs.on('click', function() {
		nowIdx = $hamelThmbs.index(this)

		$hamelThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img hamel_thmb')
			.siblings()
			.removeClass('on_img hamel_thmb')

		nowSlideFn(nowIdx, 3)
	})

	$romanticThmbs.on('click', function() {
		nowIdx = $romanticThmbs.index(this)

		$romanticThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img romantic_thmb')
			.siblings()
			.removeClass('on_img romantic_thmb')

		nowSlideFn(nowIdx, 4)
	})

	// 관련사진 컨텐츠에서 이전 click 이벤트
	$btnPrevArr[0].on('click', function() {
		nowIdx = $odongdoThmbs.parent().index($('.odongdo_thmb'))

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 3
		}

		nowSlideFn(nowIdx, 0)

		$odongdoThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img odongdo_thmb')
			.siblings()
			.removeClass('on_img odongdo_thmb')
	})

	$btnPrevArr[1].on('click', function() {
		nowIdx = $muralThmbs.parent().index($('.mural_thmb'))

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 3
		}

		nowSlideFn(nowIdx, 1)

		$muralThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img mural_thmb')
			.siblings()
			.removeClass('on_img mural_thmb')
	})

	$btnPrevArr[2].on('click', function() {
		nowIdx = $dolsanThmbs.parent().index($('.dolsan_thmb'))

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 3
		}

		nowSlideFn(nowIdx, 2)

		$dolsanThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img dolsan_thmb')
			.siblings()
			.removeClass('on_img dolsan_thmb')
	})

	$btnPrevArr[3].on('click', function() {
		nowIdx = $hamelThmbs.parent().index($('.hamel_thmb'))

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 3
		}

		nowSlideFn(nowIdx, 3)

		$hamelThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img hamel_thmb')
			.siblings()
			.removeClass('on_img hamel_thmb')
	})

	$btnPrevArr[4].on('click', function() {
		nowIdx = $romanticThmbs.parent().index($('.romantic_thmb'))

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 3
		}

		nowSlideFn(nowIdx, 4)

		$romanticThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img romantic_thmb')
			.siblings()
			.removeClass('on_img romantic_thmb')
	})

	// 관련사진 컨텐츠에서 다음 버튼
	$btnNextArr[0].on('click', function() {
		nowIdx = $odongdoThmbs.parent().index($('.odongdo_thmb'))

		if (nowIdx < 3) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		nowSlideFn(nowIdx, 0)

		$odongdoThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img odongdo_thmb')
			.siblings()
			.removeClass('on_img odongdo_thmb')
	})

	$btnNextArr[1].on('click', function() {
		nowIdx = $muralThmbs.parent().index($('.mural_thmb'))

		if (nowIdx < 3) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		nowSlideFn(nowIdx, 1)

		$muralThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img mural_thmb')
			.siblings()
			.removeClass('on_img mural_thmb')
	})

	$btnNextArr[2].on('click', function() {
		nowIdx = $dolsanThmbs.parent().index($('.dolsan_thmb'))

		if (nowIdx < 3) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		nowSlideFn(nowIdx, 2)

		$dolsanThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img dolsan_thmb')
			.siblings()
			.removeClass('on_img dolsan_thmb')
	})

	$btnNextArr[3].on('click', function() {
		nowIdx = $hamelThmbs.parent().index($('.hamel_thmb'))

		if (nowIdx < 3) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		nowSlideFn(nowIdx, 3)

		$hamelThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img hamel_thmb')
			.siblings()
			.removeClass('on_img hamel_thmb')
	})

	$btnNextArr[4].on('click', function() {
		nowIdx = $romanticThmbs.parent().index($('.romantic_thmb'))

		if (nowIdx < 3) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		nowSlideFn(nowIdx, 4)

		$romanticThmbs
			.eq(nowIdx)
			.parent()
			.addClass('on_img romantic_thmb')
			.siblings()
			.removeClass('on_img romantic_thmb')
	})

	// 관련영상 썸네일
	$odongdoVideoThmbs.on('click', function() {
		nowIdx = $odongdoVideoThmbs.index(this)

		$odongdoVideoThmbs.eq(nowIdx).parent().addClass('on_video').siblings().removeClass('on_video')

		nowVideoFn(nowIdx, 0)
	})

	$muralVideoThmbs.on('click', function() {
		nowIdx = $muralVideoThmbs.index(this)

		$muralVideoThmbs.eq(nowIdx).parent().addClass('on_video').siblings().removeClass('on_video')

		nowVideoFn(nowIdx, 1)
	})

	$dolsanVideoThmbs.on('click', function() {
		nowIdx = $dolsanVideoThmbs.index(this)

		$dolsanVideoThmbs.eq(nowIdx).parent().addClass('on_video').siblings().removeClass('on_video')

		nowVideoFn(nowIdx, 2)
	})

	$hamelVideoThmbs.on('click', function() {
		nowIdx = $hamelVideoThmbs.index(this)

		$hamelVideoThmbs.eq(nowIdx).parent().addClass('on_video').siblings().removeClass('on_video')

		nowVideoFn(nowIdx, 3)
	})

	$romanticVideoThmbs.on('click', function() {
		nowIdx = $romanticVideoThmbs.index(this)

		$romanticVideoThmbs.eq(nowIdx).parent().addClass('on_video').siblings().removeClass('on_video')

		nowVideoFn(nowIdx, 4)
	})

	$(window).on('load', function() {
		$('html, body').stop().animate({ scrollTop: topArr[0] - 60 })

		pauseKey = setInterval(function() {
			nowBannerFn()
		}, 2000)
	})
})
