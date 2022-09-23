"use strict";

(function ($) {
	// Hero Image Animation.
	if (window.matchMedia("(min-width: 769px)").matches) {
		$(".section-hero__slide").mousemove(function (e) {
			let elemOffset = $(this).offset();
			let x = e.pageX - elemOffset.left;
			let y = e.pageY - elemOffset.top;
			$(this)
				.find("img")
				.css({
					transform: "translate3d(" + x * 0.05 + "px, " + y * 0.05 + "px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
				});
		});
		$(".section-hero__slide").mouseout(function (e) {
			$(this).find("img").css({
				transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
			});
		});
	}

	// FAQ Accordion
	$(".section-faq__item-heading").on("click", function () {
		const heading = $(this);
		const content = heading.next();

		if (!heading.hasClass("opened")) {
			$(".section-faq__item-content").removeClass("opened");
			$(".section-faq__item-heading").removeClass("opened");
			$(".section-faq__item-icon").removeClass("opened");
			heading.addClass("opened");
			heading.find(".section-faq__item-icon").addClass("opened");
			content.addClass("opened");
		}
	});

	$(window).on("load", function () {
		showScrollToTop();
		replaceSearchAndSocial();
		setSearchForm();
	});

	$(window).on("resize", function () {
		replaceSearchAndSocial();
		setSearchForm();
	});

	$(".scroll-to-top").on("click", function () {
		$("html, body").stop().animate(
			{
				scrollTop: 0,
			},
			200,
			"linear"
		);
		return false;
	});
	$(window).scroll(function(){
		if ($(window).scrollTop() >= 10) {
			$('header').addClass('sticky');
			
		}
		else {
			$('header').removeClass('sticky');
			
		}
	});
	$(".navbar-toggler").on("click", function () {
		$(".header").toggleClass("opened");
		$("body").toggleClass("menu-opened");
	});

	function showScrollToTop() {
		const button = $(".scroll-to-top"),
			view = $(window);

		$(document).on("scroll", function () {
			if (view.scrollTop() < 400) {
				button.removeClass("scrolled");
			} else {
				button.addClass("scrolled");
			}
		});
	}

	function replaceSearchAndSocial() {
		const searchForm = $(".header__search"),
			socialButtons = $(".header__social"),
			headerTop = $(".header__top"),
			headerButton = $(".header__button"),
			navbarMenu = $(".navbar-collapse"),
			navbar = $(".navbar");

		if (window.matchMedia("(max-width: 1200px)").matches) {
			searchForm.removeClass("moved");
			headerButton.removeClass("moved");
			socialButtons.removeClass("moved");
			navbar.addClass("moved");
			navbarMenu.prepend(searchForm);
			navbarMenu.append(headerButton);
			navbarMenu.append(socialButtons);
			navbarMenu.prepend(navbar);
			searchForm.addClass("moved");
			headerButton.addClass("moved");
			socialButtons.addClass("moved");
			
		} else {
			searchForm.removeClass("moved");
			headerButton.removeClass("moved");
			socialButtons.removeClass("moved");
			navbar.removeClass("moved");
			headerTop.append(headerButton);
			headerTop.append(searchForm);
			headerTop.append(socialButtons);
			searchForm.addClass("moved");
			headerButton.addClass("moved");
			socialButtons.addClass("moved");
			
		}
	}

	function setSearchForm() {
		const searchForm = $(".search-form");
		if (searchForm.length) {
			if (window.matchMedia("(max-width: 1200px)").matches) {
				searchForm.addClass("opened");
				searchForm.find(".search-form__label").addClass("opened");
				searchForm.find(".search-form__input").addClass("opened");
			} else {
				searchForm.removeClass("opened");
				searchForm.find(".search-form__label").removeClass("opened");
				searchForm.find(".search-form__input").removeClass("opened");
			}
		}
	}

	const searchForm = $(".search-form");
	searchForm.on("click", function (e) {
		const searchForm = $(".search-form");
		const searchInputText = searchForm.find(".search-form__input").val;

		if (e.target.closest('input[type="submit"]')) {
			if (!searchForm.hasClass("opened")) {
				e.preventDefault();
			} else if (searchInputText === "") {
				e.preventDefault();
			}

			if (!window.matchMedia("(max-width: 1200px)").matches) {
				searchForm.toggleClass("opened");
				searchForm.find(".search-form__label").toggleClass("opened");
				searchForm.find(".search-form__input").toggleClass("opened");
			}
		}
	});

	const swiperHero = new Swiper(".section-hero__swiper", {
		loop: true,
		autoplay: {
			delay: 5000,
		  },
		pagination: {
			el: ".section-hero .swiper-pagination",
			clickable: true,
		},
	});

	const swiperPartners = new Swiper(".section-partners__swiper", {
		slidesPerView: 3,
		spaceBetween: 20,
		loop: true,
		autoplay: {
			delay: 5000,
		  },
		breakpoints: {
			320: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
			992: {
				slidesPerView: 6,
				spaceBetween: 40,
			},
		},
		
	});

	const swiperTeam = new Swiper(".section-team__swiper", {
		slidesPerView: 2,
		spaceBetween: 8,
		loop: true,
		autoplay: {
			delay: 5000,
		  },
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 8,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 16,
			},
			992: {
				slidesPerView: 5,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 6,
				spaceBetween: 20,
			},
		},
		pagination: {
			el: ".section-team .swiper-pagination",
			clickable: true,
		},
	});

	const swiperTestimonials = new Swiper(".section-testimonials__swiper", {
		slidesPerView: 1,
		loop: true,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 21,
			},
		},
		pagination: {
			el: ".section-testimonials .swiper-pagination",
			clickable: true,
		},
	});
})(jQuery);
