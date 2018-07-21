(function ($) {
    "use strict";

    window.InwaveOpenWindow = function (url) {
        window.open(url, 'sharer', 'toolbar=0,status=0,left=' + ((screen.width / 2) - 300) + ',top=' + ((screen.height / 2) - 200) + ',width=650,height=380');
        return false;
    };

    window.InwaveRegisterBtn = function () {
        $('#iwj-register-popup').modal("show");
        return false;
    };

    window.InwaveLoginBtn = function () {
        $('#iwj-login-popup').modal("show");
        return false;
    };

    /** theme prepare data */

    function InwaveHeaderSearchBtn() {
        /*
         ** Click icon search in header
         */
        $('.header .search-form .search-wrap span').on('click', function () {
            if($(this).parents('.display-search-box').length && $(this).prev().val() ){
                $(this).parents('form').submit();
            }else{
                $('.header .search-form-header').toggleClass('display-search-box');
                $('.header .search-form-header input').focus();
            }
        });
    }

    /**
     * Sticky Menu
     */

    function InwaveStickyMenu(){
        var $header = $(".header-sticky");
        var $header_2 = $(".header-sticky-2");
        if($header.length){
			$header.data('sticky', '');

			$(window).on("scroll load resize", function() {
                var fromTop = $(document).scrollTop();
				if(fromTop > 50)
				{
					if($header.data('sticky') == '')
					{
						$header.data('sticky','true');
						$header.addClass("clone");
						$('body').addClass("down");
						$('.iw-header-version3').addClass("header-clone");
					}
				}
				else
				{
					if($header.data('sticky') == 'true')
					{
						$header.data('sticky','');
						$header.removeClass("clone");
						$('body').removeClass("down");
                        $('.iw-header-version3').removeClass("header-clone");
					}
				}
            });
        }
        if($header_2.length){
            $header_2.data('sticky', '');

			$(window).on("load resize", function() {
                var fromTop = $(document).scrollTop();
                if($header_2.data('sticky') == '')
                {
                    $header_2.data('sticky','true');
                    $header_2.addClass("clone");
                    $('body').addClass("down");
                }
				else {
                    $header_2.data('sticky','');
                    $header_2.removeClass("clone");
                    $('body').removeClass("down");
                }
            });
        }
    }

    /**
     * Carousel social footer
     */
    function InwaveCarouselSetup() {
        setTimeout(function () {
            $(".owl-carousel").each(function () {
                var slider = $(this);
                var defaults = {
                    direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr'
                };
                var config = $.extend({}, defaults, slider.data("plugin-options"));
                // Initialize Slider
                slider.owlCarousel(config).addClass("owl-carousel-init");
            });
        }, 0);

        $('.post-text .gallery').each(function () {
            var galleryOwl = $(this);
            var classNames = this.className.toString().split(' ');
            var column = 1;
            $.each(classNames, function (i, className) {
                if (className.indexOf('gallery-columns-') != -1) {
                    column = parseInt(className.replace(/gallery-columns-/, ''));
                }
            });
            galleryOwl.owlCarousel({
                direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                items: column,
                singleItem: true,
                navigation: true,
                pagination: false,
                navigationText: ["<i class=\"fa fa-arrow-left\"></i>", "<i class=\"fa fa-arrow-right\"></i>"],
                autoHeight: true
            });
        });

        if($('.post-gallery .gallery-carousel').length){
            $('.post-gallery .gallery-carousel').owlCarousel({
                direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                items: 1,
                singleItem: true,
                navigation: true,
                pagination: false,
                navigationText: ["<i class=\"fa fa-arrow-left\"></i>", "<i class=\"fa fa-arrow-right\"></i>"],
                autoHeight: true
            });
        }
    }

    /**
     parallax effect */
    function InwaveParallaxSetup() {
        $('.iw-parallax').each(function () {
            $(this).css({
                'background-repeat': 'no-repeat',
                'background-attachment': 'fixed',
                'background-size': '100% auto',
                'overflow': 'hidden'
            }).parallax("50%", $(this).attr('data-iw-paraspeed'));
        });
        $('.iw-parallax-video').each(function () {
            $(this).parent().css({"height": $(this).attr('data-iw-paraheight'), 'overflow': 'hidden'});
            $(this).parallaxVideo("50%", $(this).attr('data-iw-paraspeed'));
        });
    }

    /**
     Hientv */
    function InwaveScrollMenu() {
        if(typeof $.fn.enscroll === 'function'){
            $('.off-canvas-menu-scroll').enscroll({
                showOnHover: true,
                verticalTrackClass: 'track3',
                verticalHandleClass: 'handle3',
                addPaddingToPane: false
            });
        }
    }

    function InwaveGallarySetup() {
        if(typeof $.fn.fancybox === 'function'){
            $("a[rel=iwj-gallery]").fancybox({
                'transitionIn'		: 'none',
                'transitionOut'		: 'none',
                'titlePosition' 	: 'over',
                'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
                    return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
                }
            });
        }
    }

    function InwaveFitVideo() {
        $(".fit-video").fitVids();
    }

    function InwaveSelectSetup() {
        if(typeof $.fn.select2 === 'function'){

            if($('.iwj-select-2').length) {
                $(".iwj-select-2").each(function () {
                    var options = $(this).data('options');
                    options = options ? options : {};
                    $(this).select2(options);
                });
            }
            if($('.iwj-select-2-wsearch').length) {
                $(".iwj-select-2-wsearch").each(function () {
                    var options = $(this).data('options');
                    options = options ? options : {'minimumResultsForSearch' : 'Infinity'};
                    options.dropdownCssClass = 'iwj-select-2-wsearch';
                    $(this).select2(options);
                })
            }
            if($('.iwj-find-jobs-select.style1').length) {
                $(".iwj-find-jobs-select.style1").select2({
                    dropdownCssClass : 'iwj-find-jobs-dropdown'
                })
            }
            if($('.iwj-find-jobs-select.style2').length) {
                $(".iwj-find-jobs-select.style2").select2({
                    dropdownCssClass : 'iwj-find-jobs-dropdown style2'
                })
            }
        }
    }

    function InwaveServiceBtn() {
        $('.buy-service-button .has-scroll').click(function (e) {
            e.preventDefault();
            var href = $(this).attr('href');
            var element = $(href);
            if(element.length){
                $("html, body").animate({
                    scrollTop: element.position().top
                }, 1000);

                return false;
            }
        });
    }

    function InwaveLoginRegisterBtn() {
        $('.top-bar-right .register-login a').hover(function () {
            if($(this).hasClass('login')){
                $('.top-bar-right .register-login').addClass('active-login');
            }
        },function (){
            $('.top-bar-right .register-login').removeClass('active-login');
        });


    }

    function InwaveStickySidebar() {
        setTimeout(function(){
            if( $('.header.header-default.clone').length) {
                var h_header = $('.header.header-default.clone .iw-header').outerHeight();
                var h_wpadminbar = $('#wpadminbar').outerHeight();
                var top = h_header + h_wpadminbar;
            }else{
                if($('body').hasClass('admin-bar')){
                    var top = 30;
                }else{
                    var top = 0;
                }
            }

            $('.iwj-sidebar-sticky')
                .theiaStickySidebar({
                    additionalMarginTop: top
                });

        }, 0);
    }

    function InwaveTooltipSetup() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    function InwavePreloadSetup() {
        $('#preview-area').fadeOut('slow', function () {
            $(this).remove();
        });
    }

    function woocommerce_init() {
        window.increaseQty = function (el, count) {
            var $el = $(el).parent().find('.qty');
            $el.val(parseInt($el.val()) + count);
        };
        window.decreaseQty = function (el, count) {
            var $el = $(el).parent().find('.qty');
            var qtya = parseInt($el.val()) - count;
            if (qtya < 1) {
                qtya = 1;
            }
            $el.val(qtya);
        };

        $('.add_to_cart_button').on('click', function (e) {
            if ($(this).find('.fa-check').length) {
                e.preventDefault();
                return;
            }
            $(this).addClass('cart-adding');
            $(this).html(' <i class="fa fa-cog fa-spin"></i> ');

        });

        $('body').on('added_to_cart', function (e, f) {
            $('.added_to_cart.wc-forward').remove();
            // $('.cart-adding i').remove();
            //$('.cart-adding').removeClass('cart-adding');
            $('.cart-adding').html('<i class="fa fa-check"></i>');
            $('.cart-adding').removeClass('cart-adding');
        });

        window.submitProductsLayout = function (layout) {
            $('.product-category-layout').val(layout);
            $('.woocommerce-ordering').submit();
        };

        if($("#woo-tab-contents").length){
            $("#woo-tab-contents .box-collateral").hide(); // Initially hide all content
            $("#woo-tab-buttons li:first").attr("class","current"); // Activate first tab
            $("#woo-tab-contents .box-collateral:first").show(); // Show first tab content
        }

        $('#woo-tab-buttons li a').click(function(e) {
            e.preventDefault();
            $("#woo-tab-contents .box-collateral").hide(); //Hide all content
            $("#woo-tab-buttons li").attr("class",""); //Reset id's
            $(this).parent().attr("class","current"); // Activate this
            $($(this).attr('href')).fadeIn(); // Show content for current tab
        });

        $('.add_to_cart_button').on('click', function (e) {
            if ($(this).find('.fa-check').length) {
                e.preventDefault();
                return;
            }
            $(this).addClass('cart-adding');
            $(this).html('<i class="fa fa-cog fa-spin"></i>');

        });
        $('.add_to_wishlist').on('click', function (e) {
            if ($(this).find('.fa-check').length) {
                e.preventDefault();
                return;
            }
            $(this).addClass('wishlist-adding');
            $(this).find('i').removeClass('fa-star').addClass('fa-cog fa-spin');
        });
        var wishlist = $('.yith-wcwl-add-to-wishlist');
        wishlist.appendTo('.add-to-box');
        wishlist.appendTo('.add-to-box form.cart');
        if ($('.variations_form').length) {
            wishlist.appendTo('.variations_form .single_variation_wrap');
        }
    }

    /*** RUN ALL FUNCTION */
    $(document).ready(function () {
        InwaveStickyMenu();
        InwaveParallaxSetup();
        InwaveHeaderSearchBtn();
        InwaveCarouselSetup();
        InwaveGallarySetup();
        InwaveFitVideo();
        InwaveSelectSetup();
        InwaveServiceBtn();
        InwaveLoginRegisterBtn();
        InwaveStickySidebar();
        InwaveTooltipSetup();
        woocommerce_init();

        /* header v3 */
        var h_header = $('.iw-header-version3 .header').outerHeight();
        $(".iw-header-version3").css("padding-bottom", (h_header));
    });

    /*window loaded */
    $(window).on('load', function () {
        InwaveScrollMenu();
        InwavePreloadSetup();
        InwaveParallaxSetup();
    });

    /*window resize*/
    $(window).on('resize',function(){
        InwaveParallaxSetup();
    });

    /*window load and resize*/
    $(window).on("load resize",function(){
        $('.navbar-nav > li').each(function() {
            var w_li = $(this).outerWidth();
            var offset_left = $(this).offset().left;
            var w_wrapper = $('body .wrapper').width();
            var ltr = (w_wrapper - offset_left);
            var rtl = (offset_left + w_li);
            if (rtl < 251 || ltr < 251) {
                $(this).addClass('sub-menu-position-new');
            }
            else {
                $(this).removeClass('sub-menu-position-new');
            }

            if (rtl < 501 || ltr < 501) {
                $(this).addClass('sub-menu2-position-new');
            }
            else {
                $(this).removeClass('sub-menu2-position-new');
            }
        });
    });

})(jQuery);
