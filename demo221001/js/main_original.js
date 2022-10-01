//  AOS.init({
//  	duration: 800,
//  	easing: 'slide'
//  });

 (function ($) {

 	"use strict";

 	$(window).stellar({
 		responsive: true,
 		parallaxBackgrounds: true,
 		parallaxElements: true,
 		horizontalScrolling: false,
 		hideDistantElements: false,
 		scrollProperty: 'scroll'
 	});


 	var fullHeight = function () {

 		$('.js-fullheight').css('height', $(window).height());
 		$(window).resize(function () {
 			$('.js-fullheight').css('height', $(window).height());
 		});

 	};
 	fullHeight();

 	// loader
 	var loader = function () {
 		setTimeout(function () {
 			if ($('#ftco-loader').length > 0) {
 				$('#ftco-loader').removeClass('show');
 			}
 		}, 1);
 	};
 	loader();

 	// Scrollax
 	$.Scrollax();

 	var carousel = function () {
 		$('.home-slider').owlCarousel({
 			loop: true,
 			autoplay: true,
 			margin: 0,
 			animateOut: 'fadeOut',
 			animateIn: 'fadeIn',
 			nav: false,
 			autoplayHoverPause: false,
 			items: 1,
 			navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
 			responsive: {
 				0: {
 					items: 1
 				},
 				600: {
 					items: 1
 				},
 				1000: {
 					items: 1
 				}
 			}
 		});
 		$('.carousel-testimony').owlCarousel({
 			autoplay: true,
 			center: true,
 			loop: true,
 			items: 1,
 			margin: 30,
 			stagePadding: 0,
 			nav: false,
 			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
 			responsive: {
 				0: {
 					items: 1
 				},
 				600: {
 					items: 1
 				},
 				1000: {
 					items: 2
 				}
 			}
 		});

 	};
 	carousel();

 	$('nav .dropdown').hover(function () {
 		var $this = $(this);
 		// 	 timer;
 		// clearTimeout(timer);
 		$this.addClass('show');
 		$this.find('> a').attr('aria-expanded', true);
 		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
 		$this.find('.dropdown-menu').addClass('show');
 	}, function () {
 		var $this = $(this);
 		// timer;
 		// timer = setTimeout(function(){
 		$this.removeClass('show');
 		$this.find('> a').attr('aria-expanded', false);
 		// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
 		$this.find('.dropdown-menu').removeClass('show');
 		// }, 100);
 	});


 	$('#dropdown04').on('show.bs.dropdown', function () {
 		console.log('show');
 	});

 	// scroll
 	var scrollWindow = function () {
 		$(window).scroll(function () {
 			var $w = $(this),
 				st = $w.scrollTop(),
 				navbar = $('.ftco_navbar'),
 				sd = $('.js-scroll-wrap');

 			if (st > 150) {
 				if (!navbar.hasClass('scrolled')) {
 					navbar.addClass('scrolled');
 				}
 			}
 			if (st < 150) {
 				if (navbar.hasClass('scrolled')) {
 					navbar.removeClass('scrolled sleep');
 				}
 			}
 			if (st > 350) {
 				if (!navbar.hasClass('awake')) {
 					navbar.addClass('awake');
 				}

 				if (sd.length > 0) {
 					sd.addClass('sleep');
 				}
 			}
 			if (st < 350) {
 				if (navbar.hasClass('awake')) {
 					navbar.removeClass('awake');
 					navbar.addClass('sleep');
 				}
 				if (sd.length > 0) {
 					sd.removeClass('sleep');
 				}
 			}
 		});
 	};
 	scrollWindow();


 	var counter = function () {

 		$('#section-counter').waypoint(function (direction) {

 			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

 				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
 				$('.number').each(function () {
 					var $this = $(this),
 						num = $this.data('number');
 					console.log(num);
 					$this.animateNumber({
 						number: num,
 						numberStep: comma_separator_number_step
 					}, 7000);
 				});

 			}

 		}, {
 			offset: '95%'
 		});

 	}
 	counter();

 	var contentWayPoint = function () {
 		var i = 0;
 		$('.ftco-animate').waypoint(function (direction) {

 			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

 				i++;

 				$(this.element).addClass('item-animate');
 				setTimeout(function () {

 					$('body .ftco-animate.item-animate').each(function (k) {
 						var el = $(this);
 						setTimeout(function () {
 							var effect = el.data('animate-effect');
 							if (effect === 'fadeIn') {
 								el.addClass('fadeIn ftco-animated');
 							} else if (effect === 'fadeInLeft') {
 								el.addClass('fadeInLeft ftco-animated');
 							} else if (effect === 'fadeInRight') {
 								el.addClass('fadeInRight ftco-animated');
 							} else {
 								el.addClass('fadeInUp ftco-animated');
 							}
 							el.removeClass('item-animate');
 						}, k * 50, 'easeInOutExpo');
 					});

 				}, 100);

 			}

 		}, {
 			offset: '95%'
 		});
 	};
 	contentWayPoint();


 	// magnific popup
 	$('.image-popup').magnificPopup({
 		type: 'image',
 		closeOnContentClick: true,
 		closeBtnInside: false,
 		fixedContentPos: true,
 		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
 		gallery: {
 			enabled: true,
 			navigateByImgClick: true,
 			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
 		},
 		image: {
 			verticalFit: true
 		},
 		zoom: {
 			enabled: true,
 			duration: 300 // don't foget to change the duration also in CSS
 		}
 	});

 	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
 		disableOn: 700,
 		type: 'iframe',
 		mainClass: 'mfp-fade',
 		removalDelay: 160,
 		preloader: false,

 		fixedContentPos: false
 	});


 	// $('.appointment_date').datepicker({
 	// 	'format': 'm/d/yyyy',
 	// 	'autoclose': true
 	// });

 	// $('.appointment_time').timepicker();




 })(jQuery);

 document.addEventListener('DOMContentLoaded', () => {
 	function CreateBugFeedbackBtnForFixedPosition() {
 		var BugFeedbackTool = document.createElement('div'),
 			BugFeedbackWidget = document.createElement('div'),
 			BugFeedbackButton = document.createElement('a'),
 			BugFeedbackStyle = document.createElement('style');

 		BugFeedbackStyle.innerHTML = '.bugfeedback-tool{position:absolute;top:0;right:0;width:100%;z-index:999999;}' +
 			'.bugfeedback-button{background-color:#0080C8;position:fixed;padding: 0px 10px;bottom:20px;right:0;width:40px;height:40px;z-index:999999;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:-5px 5px 10px rgb(20 26 52 / 10%);border-radius:5px 0 0 5px;}' +
 			'.bugfeedback-button span{display:none;color:#FFFFFF;font-size:14px;padding: 0px 10px;}' +
 			'.bugfeedback-button:hover{width:auto;}' +
 			'.bugfeedback-button:hover span{display:block;}';
 		document.head.append(BugFeedbackStyle);

 		BugFeedbackTool.id = 'bugfeedback-tool';
 		BugFeedbackTool.classList.add('bugfeedback-tool');
 		document.body.append(BugFeedbackTool);

 		BugFeedbackWidget.id = 'bugfeedback-widge';
 		BugFeedbackWidget.classList.add('bugfeedback-widge');
 		BugFeedbackTool.append(BugFeedbackWidget);

 		BugFeedbackButton.id = 'bugfeedback-button';
 		BugFeedbackButton.classList.add('bugfeedback-button', 'bug_feedback_btn');
 		BugFeedbackButton.innerHTML = '<i class="fas fa-bug" style="font-size:25px;color:#FFFFFF;"></i><span>Bug feedback</span>';
 		BugFeedbackWidget.append(BugFeedbackButton);

 		ListenEventByBugFeedbackBtn();
 	}

 	function ListenEventByBugFeedbackBtn() {
 		document.querySelectorAll('.bug_feedback_btn').forEach(element => {
 			element.addEventListener('click', (event) => {
 				event.preventDefault();
 				var formUrl = new URL('https://docs.google.com/forms/d/e/1FAIpQLSfPWlx8DfO3CSvQNsubtlNaAUO5ZFasY7odg1is_p5jKRIsTg/viewform?usp=pp_url'),
 					locationUrl = window.location.href,
 					userAgent = window.navigator.userAgent,
 					now = (new Date()),
 					currentDate = now.toLocaleDateString('en-CA'),
 					currentTime = now.toLocaleTimeString('it-IT');

 				formUrl.searchParams.append('entry.2085077820', locationUrl);
 				formUrl.searchParams.set('entry.1548031696', currentDate + '+' + currentTime);
 				formUrl.searchParams.set('entry.1839409245', userAgent);
 				formUrl.searchParams.set('entry.1713413705', '');

 				window.open(formUrl.href, '_blank');
 			});
 		});
 	}

 	if (document.querySelectorAll('.bug_feedback_btn').length == 0) {
 		CreateBugFeedbackBtnForFixedPosition();
 	} else {
 		ListenEventByBugFeedbackBtn();
 	}
 });

 const ge = function(e_key)
 {
	 try{
		dataLayer.push({'event': e_key});
	 }catch(e){
		 console.log(e);
	 }
 }

 window.addEventListener('load', function(){
	 try{
		 document.querySelectorAll('[data-gtm-click-event]').forEach(function(elm){
			elm.addEventListener('click', function(e){
				ge(e.currentTarget.dataset.gtmClickEvent);
			});
		 });
	 }catch(e){
		 console.log(e);
	 }
 });