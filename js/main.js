!(function ($) {
	"use strict";

	// Hero Typed
	if ($('.typed').length) {
		var typed_strings = $('.typed').data('typed-items');
		typed_strings = typed_strings.split(',')
		new Typed('.typed', {
			strings: typed_strings,
			loop: true,
			typeSpeed: 100,
			backSpeed: 50,
			backDelay: 2000
		});
	}

	//Mobile Navigation
	$(document).on('click', '.mobile-nav-toggle', function (e) {
		$('body').toggleClass('mobile-nav-active');
		$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
	});

	$(document).click(function (e) {
		var container = $(".mobile-nav-toggle");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			if ($('body').hasClass('mobile-nav-active')) {
				$('body').removeClass('mobile-nav-active');
				$('mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
			}
		}
	});

	
  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

	// Skills section
	$('.progress .progress-bar').css("width",
		function () {
			return $(this).attr("aria-valuenow") + "%";
		}
	)

	// Porfolio isotope and filter
	$(window).on('load', function() {
		var portfolioIsotope = $('.portfolio-container').isotope({
		  itemSelector: '.portfolio-item',
		  animationOptions: { duration: 300, easing: 'ease-in' },
		  layoutMode: 'fitRows'
		});
	
		$('#portfolio-flters li').on('click', function() {
		  $("#portfolio-flters li").removeClass('filter-active');
		  $(this).addClass('filter-active');
	
		  portfolioIsotope.isotope({
			filter: $(this).data('filter')
		  });
		  aos_init();
		});
	
		// Initiate venobox (lightbox feature used in portofilo)
		$(document).ready(function() {
		  $('.venobox').venobox();
		});
	  });


	// Init AOS
	function aos_init() {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out-back",
			once: true
		});
	}
	$(window).on('load', function () {
		aos_init();
	});


})(jQuery);