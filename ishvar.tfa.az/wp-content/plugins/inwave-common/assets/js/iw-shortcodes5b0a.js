(function($){
    "use strict";
    /**
     * Tabs
     */
    $.fn.iwTabs = function () {
        $(this).each(function () {
            var iwTabObj = this, $iwTab = $(this);
            var type = $iwTab.data('type');
            if (type === 'tab') {
                iwTabObj.content_list = $iwTab.find('.iw-tab-content .iw-tab-item-content');
                iwTabObj.list = $iwTab.find('.iw-tab-items .iw-tab-item');
                iwTabObj.item_click_index = 0;
                $('.iw-tab-items .iw-tab-item', this).click(function () {
                    if ($(this).hasClass('active')) {
                        return;
                    }
                    var itemclick = this, item_active = $iwTab.find('.iw-tab-items .iw-tab-item.active');
                    iwTabObj.item_click_index = iwTabObj.list.index(itemclick);
                    $(itemclick).addClass('active');
                    iwTabObj.list.each(function () {
                        if (iwTabObj.list.index(this) !== iwTabObj.list.index(itemclick) && $(this).hasClass('active')) {
                            $(this).removeClass('active');
                        }
                    });
                    iwTabObj.loadTabContent();
                });
                this.loadTabContent = function () {
                    var item_click = $(iwTabObj.content_list.get(iwTabObj.item_click_index));
                    iwTabObj.content_list.each(function () {
                        if (iwTabObj.content_list.index(this) < iwTabObj.content_list.index(item_click)) {
                            $(this).addClass('prev').removeClass('active next');
                        } else if (iwTabObj.content_list.index(this) === iwTabObj.content_list.index(item_click)) {
                            $(this).addClass('active').removeClass('prev next');
//                            $(".map-contain",this).iwMap();
                        } else {
                            $(this).addClass('next').removeClass('prev active');
                        }
                    });
                };
            } else {
                this.accordion_list = $iwTab.find('.iw-accordion-item');
                $('.iw-accordion-header', this).click(function () {
                    var itemClick = $(this);
                    var item_target = itemClick.parent();
                    if (itemClick.hasClass('active')) {
                        itemClick.removeClass('active');
                        item_target.find('.iw-accordion-content').slideUp({easing: 'easeOutQuad'});
                        item_target.find('.iw-accordion-header-icon .expand').hide();
                        item_target.find('.iw-accordion-header-icon .no-expand').show();
                        return;
                    }
                    itemClick.addClass('active');
                    item_target.find('.iw-accordion-content').slideDown({easing: 'easeOutQuad'});
                    item_target.find('.iw-accordion-header-icon .expand').show();
                    item_target.find('.iw-accordion-header-icon .no-expand').hide();
                    iwTabObj.accordion_list.each(function () {
                        if (iwTabObj.accordion_list.index(this) !== iwTabObj.accordion_list.index(item_target) && $(this).find('.iw-accordion-header').hasClass('active')) {
                            $(this).find('.iw-accordion-header').removeClass('active');
                            $(this).find('.iw-accordion-content').slideUp({easing: 'easeOutQuad'});
                            $(this).find('.iw-accordion-header-icon .expand').hide();
                            $(this).find('.iw-accordion-header-icon .no-expand').show();
                        }
                    });
                });

                $('.iw-accordion-header', this).hover(function () {
                    var item = $(this), item_target = item.parent();
                    if (item.hasClass('active')) {
                        return;
                    }
                    item_target.find('.iw-accordion-header-icon .expand').show();
                    item_target.find('.iw-accordion-header-icon .no-expand').hide();
                }, function () {
                    var item = $(this), item_target = item.parent();
                    if (item.hasClass('active')) {
                        return;
                    }
                    item_target.find('.iw-accordion-header-icon .expand').hide();
                    item_target.find('.iw-accordion-header-icon .no-expand').show();
                });
            }

        });
    };
})(jQuery);

jQuery(document).ready(function($){
    /**
     * Video
     */
    $('.iw-video .play-button').click(function () {
        if (!$(this).parents('.iw-video').hasClass('playing')) {
            $(this).parents('.iw-video').find('video').get(0).play();
            $(this).parents('.iw-video').addClass('playing');
            return false;
        }
    });
	
    $('.iw-video,.iw-event-facts').click(function () {
        $(this).find('video').get(0).pause();
    });
    $('.iw-video video').on('pause', function (e) {
        $(this).parents('.iw-video').removeClass('playing');
    });

     $(document).on('invalid.wpcf7', function () {
        $('.wpcf7-form .iw-form-step').hide();
        $('.wpcf7-form .wpcf7-not-valid:eq(0)').closest('.iw-form-step').fadeIn();
    });

    $('.wpcf7-form .next-step').click(function(e){
        e.preventDefault();
        var parent = $(this).closest('.iw-form-step');
        parent.hide();
        parent.next('.iw-form-step').fadeIn();
    });

    $('.wpcf7-form .prev-step').click(function(e){
        e.preventDefault();
        var parent = $(this).closest('.iw-form-step');
        parent.hide();
        parent.prev('.iw-form-step').fadeIn();
    });


    $(window).on("load resize", function () {
        /* WC Version */
        var container_with = $('body .container').outerWidth();
        var window_with = $(window).width();
        $('.wc-version-left').css({'padding-left' : (window_with - container_with) /2});
        $('.wc-version-right').css({'padding-right' : (window_with - container_with) /2, 'padding-left' : 0});
    });

    /* accordions */
    $('.faq-accordion-item').each(function() {
        $('.faq-accordion-header', this).click(function() {
            if($(this).hasClass('active')){
                $(this).removeClass('active');

            }else{
                var parent = $(this).closest('.iw-accordions-items');
                var itemClick = $(this);
                parent.find('.faq-accordion-header.active').removeClass('active');
                itemClick.addClass('active');
            }
        });
    });

    /* Load more FAQ */
    var ppp = $('.iw-faqs').data('posts_per_page'); // Post per page
    var pageNumber = 1;
    var totalpages  =  $('#hidden_data_total_post').data('totalpost'); // get total pages

    $("#load-more-faq").on("click",function(){
        var itemTarget = $(this);
        pageNumber++;
        var str = '&pageNumber=' + pageNumber + '&ppp=' + ppp + '&action=more_faq_ajax';
        $.ajax({
            type: "POST",
            dataType: "html",
            url: ajax_posts.ajaxurl,
            cache: false,
            data: str,
            beforeSend: function (xhr) {
                itemTarget.addClass('loading');
            },
            success: function(data){
                var $data = $(data);
                if($data.length){
                    $(".iw-faqs-main").append($data);
                } else{
                    $("#load-more-faq").addClass("loaded");
                }

                if(totalpages === pageNumber){ // check total pages
                    $("#load-more-faq").addClass("loaded");
                }

                itemTarget.removeClass('loading');
            }

        });
        return false;
    });


});

function iwaveSetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function iwaveGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function iwaveCheckCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}