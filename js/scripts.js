WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: getCssVar(mainSlider, '--spaceBetween'),
			slidesPerView: getCssVar(mainSlider, '--slidesPerView'),
			lazy: true,
			navigation: {
				nextEl: mainSlider.querySelector('.swiper-button-next'),
				prevEl: mainSlider.querySelector('.swiper-button-prev')
			},
			pagination: {
				el: mainSlider.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
		})
	}


	// Text images slider
	const textImageSliders = [],
		textImageSlider = document.querySelectorAll('.text_block .image_slider .swiper')

	textImageSlider.forEach((el, i) => {
		el.classList.add('text_image_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev')
			},
			spaceBetween: getCssVar(el, '--spaceBetween'),
			slidesPerView: getCssVar(el, '--slidesPerView'),
		}

		textImageSliders.push(new Swiper('.text_image_s' + i, options))
	})


	// Product info
	if ($('.product_info .images').length) {
		const bigEl = document.querySelector('.product_info .big .swiper'),
			thumbsEl = document.querySelector('.product_info .thumbs .swiper')

		const productThumbs = new Swiper(thumbsEl, {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: thumbsEl.querySelector('.swiper-button-next'),
				prevEl: thumbsEl.querySelector('.swiper-button-prev')
			},
			spaceBetween: getCssVar(thumbsEl, '--spaceBetween'),
			slidesPerView: getCssVar(thumbsEl, '--slidesPerView'),
			breakpoints: {
				0: {
					direction: 'horizontal',
				},
				1024: {
					direction: 'vertical',
				}
			},
		})

		new Swiper(bigEl, {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			thumbs: {
				swiper: productThumbs
			},
			spaceBetween: getCssVar(bigEl, '--spaceBetween'),
			slidesPerView: getCssVar(bigEl, '--slidesPerView'),
		})
	}


	// Fancybox
	const fancyOptions = {
		dragToClose: false,
		placeFocusBack: false,
		l10n: {
			CLOSE: 'Закрыть',
			NEXT: 'Следующий',
			PREV: 'Предыдущий',
			MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
		},
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		...fancyOptions,
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '(000) 000-00-00',
				lazy: true
			})
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)'),
		selectsInstances = []

	if (selects) {
		selects.forEach(el => {
			selectsInstances.push(NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			}))

			el.addEventListener('change', () => el.classList.add('selected'))

			if (el.querySelector('option[selected]')) {
				el.classList.add('selected')
			}
		})
	}


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	if (is_touch_device()) {
		$('header .account .name').click(function(e) {
			e.preventDefault()

			setTimeout(() => {
				$('header .account').addClass('open')
				$('header .account .dropdown, .overlay').fadeIn(300)
			})
		})
	}


	// Search
	$('.search .input').keydown(function(e) {
		let _self = $(this),
			form = $(this).closest('form')

		setTimeout(() => {
			_self.val().length > 2
				? form.find('.clear_btn, .tips').addClass('show')
				: form.find('.clear_btn, .tips').removeClass('show')
		})
	})


	$('.search .clear_btn').click(function(e) {
		e.preventDefault()

		let form = $(this).closest('form')

		form.find('.input').val('')
		form.find('.clear_btn, .tips').removeClass('show')
	})


	// Ctalog
	$('.catalog_modal .main .btn').click(function(e) {
		e.preventDefault()

		let miniModal = $(this).closest('.mini_modal')

		$('.catalog_modal .main .btn').removeClass('active')
		$(this).addClass('active')

		miniModal.find('.catalog').hide()
		miniModal.find('.catalog' + ($(this).index() + 1)).fadeIn(300)

		if (WW < 1024) {
			$('.catalog_modal .main').hide()
			$('.catalog_modal .sub').fadeIn(300)
		}
	})


	$('.catalog_modal .catalog .back_btn').click(function(e) {
		e.preventDefault()

		$('.catalog_modal .sub').hide()
		$('.catalog_modal .main').fadeIn(300)
	})


	// Orders
	$('.order .head').click(function(e) {
		e.preventDefault()

		$(this).closest('.order').toggleClass('open')
		$(this).next('.data').slideToggle(300)
	})


	// Products view
	$('.products_head .view .btn').click(function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$('.products_head .view .btn').removeClass('active')
			$(this).addClass('active')

			const products = $(this).closest('.category_info').find('.products')

			products.find('.grid_row, .list').toggleClass('show')
		}
	})


	if (WW < 1024) {
		$('.products .grid_row').addClass('show')
		$('.products .list').removeClass('show')
	}


	// Product to favorite
	$('.product .favorite_btn, .product_info .favorite_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Product to cart
	$('.product .buy_btn').click(function(e) {
		e.preventDefault()

		$(this).hide()
		$(this).next('.after_buy').addClass('show')
	})


	// Product features
	$('.product .features .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this)
			.toggleClass('active')
			.prev('.items').slideToggle(300)
	})


	// Product amount — minus/plus
	$('body').on('click', '.product .amount .btn, .product_info .amount .btn', function (e) {
		e.preventDefault()

		const $input = $(this).closest('.amount').find('.input'),
			current = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit') || '',
			direction = $(this).hasClass('minus') ? -1 : 1

		if (isNaN(current)) {
			$input.val(minimum + unit)
			return
		}

		$input.val(Math.min(Math.max(current + direction * step, minimum), maximum) + unit)
	})

	$('body').on('keydown', '.product .amount .input, .product_info .amount .input', function () {
		const $input = $(this),
			minimum = parseFloat($input.data('minimum')),
			maximum = parseFloat($input.data('maximum'))

		setTimeout(() => {
			const val = parseFloat($input.val())
			$input.val(Math.min(Math.max(isNaN(val) ? minimum : val, minimum), maximum))
		})
	})


	// Mini pop-up windows
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			$('.overlay').fadeOut(200)

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			$('.overlay').fadeIn(300)

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})


	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			$('.overlay').fadeOut(200)
			$('header .account').removeClass('open')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Filter
	$('.filter .item .label').click(function(e) {
		e.preventDefault()

		$(this)
			.toggleClass('active')
			.next('.data').slideToggle(300)
	})


	const priceRange = $('#price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 200000,
		from: 240,
		to: 140000,
		step: 10,
		onChange: data => {
			$('.filter .price_range input.from').val(data.from.toLocaleString('ru-RU'))
            $('.filter .price_range input.to').val(data.to.toLocaleString('ru-RU'))
		},
	}).data('ionRangeSlider')

	$('.filter .price_range .input').keyup(function () {
		priceRange.update({
			from: parseInt($('.filter .price_range .input.from').val()),
			to: parseInt($('.filter .price_range .input.to').val()),
		})
	})


	$('.filter .reset_btn').click(function() {
		if (priceRange) { priceRange.reset() }
	})


	// AI help info
	$('.ai_help_info .product .col_recommended_amount .change_btn').click(function(e) {
		e.preventDefault()

		const parent = $(this).closest('.col_recommended_amount')

		$(this).hide()
		parent.find('span').hide()
		parent.find('.input').fadeIn(100)
	})


	// Products
	initProductsSliders()


	$('.products .more_btn').click(function(e) {
		e.preventDefault()

		const products = $(this).closest('.products')

		$(this).toggleClass('active')
		products.find('.grid_row > *').toggleClass('show')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Products
		if (WW < 1024) {
			$('.products .grid_row').addClass('show')
			$('.products .list').removeClass('show')
		}

		initProductsSliders()


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})


function setLastVisible(swiper) {
    swiper.slides.forEach(slide => slide.classList.remove('last-visible'))

    const last = [...swiper.visibleSlides]
        .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)
        .pop()

    if (last) last.classList.add('last-visible')
}


// Products slider
var productsSliders = []

function initProductsSliders() {
	const conditionalSwiper = '.products .swiper:not(.always-swiper)',
		alwaysSwiper = '.products .swiper.always-swiper'

	$(alwaysSwiper).each(function (i) {
		if ($(this).hasClass('products_always_s' + i)) return // уже инициализирован

		$(this).addClass('products_always_s' + i)

		const section = $(this).closest('.products')

		productsSliders.push(new Swiper('.products_always_s' + i, buildProductsOptions(this, section)))
	})

	if (WW > 767) {
		if ($(conditionalSwiper + ' .grid_row').length) {
			$(conditionalSwiper + ' .grid_row > *').addClass('swiper-slide')
			$(conditionalSwiper + ' .grid_row').addClass('swiper-wrapper').removeClass('grid_row show')

			$(conditionalSwiper).each(function (i) {
				$(this).addClass('products_s' + i)

				const section = $(this).closest('.products')

				productsSliders.push(new Swiper('.products_s' + i, buildProductsOptions(this, section)))
			})
		}
	} else {
		productsSliders = productsSliders.filter(swiper => {
			const isAlways = swiper.el.classList.contains('always-swiper')

			if (!isAlways) swiper.destroy(true, true)

			return isAlways
		})

		$(conditionalSwiper + ' .swiper-wrapper').addClass('grid_row show').removeClass('swiper-wrapper')
		$(conditionalSwiper + ' .grid_row > *').removeClass('swiper-slide')
		$(conditionalSwiper + ' .grid_row .product, ' + conditionalSwiper + ' .grid_row .banner').height('auto')
	}
}


function buildProductsOptions(el, section) {
	return {
		loop: true,
		speed: 500,
		watchSlidesProgress: true,
		slideActiveClass: 'active',
		slideVisibleClass: 'visible',
		lazy: true,
		navigation: {
			nextEl: section.find('.swiper-button-next')[0],
			prevEl: section.find('.swiper-button-prev')[0]
		},
		pagination: {
			el: section.find('.swiper-pagination')[0],
			type: 'bullets',
			clickable: true,
			bulletActiveClass: 'active'
		},
		breakpoints: {
			0: { spaceBetween: getCssVar(el, '--spaceBetween-0'), slidesPerView: getCssVar(el, '--slidesPerView-0')    },
			1024: { spaceBetween: getCssVar(el, '--spaceBetween-1024'), slidesPerView: getCssVar(el, '--slidesPerView-1024') },
			1280: { spaceBetween: getCssVar(el, '--spaceBetween-1280'), slidesPerView: getCssVar(el, '--slidesPerView-1280') },
			1440: { spaceBetween: getCssVar(el, '--spaceBetween-1440'), slidesPerView: getCssVar(el, '--slidesPerView-1440') }
		},
		on: {
			init: swiper => {
				setHeight(swiper.el.querySelectorAll('.product, .banner'))

				setLastVisible(swiper)
			},
			slideChange: swiper => setLastVisible(swiper),
			resize: swiper => {
				let items = swiper.el.querySelectorAll('.product, .banner')

				items.forEach(el => el.style.height = 'auto')

				setHeight(items)

				setLastVisible(swiper)
			}
		}
	}
}