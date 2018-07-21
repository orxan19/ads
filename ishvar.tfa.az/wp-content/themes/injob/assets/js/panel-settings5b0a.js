(function ($) {
    "use strict";
    /** PANEL FUNCTION **/

    function panelInit() {
        $('body').append('<style type="text/css" id="color-setting"></style>');
        var clickOutSite = true;
        var animate1 = $('body').hasClass('rtl') ? {right : '0'} : { left : '0'};
        var animate2 = $('body').hasClass('rtl') ? {right : '-240px'} : {left : '-240px'};
        $('.panel-button').click(function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $('.panel-tools').show().animate(animate1, 400, 'easeInOutExpo');
            } else {
                $(this).removeClass('active');
                $('.panel-tools').animate(animate2, 400, 'easeInOutExpo');
            }
            clickOutSite = false;
        });

        $('.panel-content').click(function () {
            clickOutSite = false;
            setTimeout(function () {
                clickOutSite = true;
            }, 100);
        });

        $(document).click(function () {
            if (clickOutSite && $('.panel-button').hasClass('active')) {
                $('.panel-button').trigger('click');
            }
        });

        //change layout
        $('.button-command-layout').click(function () {
            panelChangeLayout($(this).val());
            panelWriteSetting();
        });
        
        //change background
        $('.background-setting button').click(function () {
            panelChangebackground($(this).val());
            panelWriteSetting();
        });

        //change color
        $('.sample-setting button').click(function () {
            panelChangeColor($(this).val());
            panelWriteSetting();
        });

        $('.reset-button button').click(function () {
            panelChangeLayout(inwavePanelSettings.default_settings.layout);
            panelChangebackground(inwavePanelSettings.default_settings.bgColor);
            panelChangeColor(inwavePanelSettings.default_settings.mainColor);

            setCookie(inwavePanelSettings.theme+'-setting', '');
            if ($('.rtl-setting .active').attr('data-value') == 'rtl') {
                var link;
                if (document.location.href.indexOf('=rtl') > 0) {
                    link = document.location.href.replace(/=rtl/, '=ltr')
                } else {
                    if (document.location.href.indexOf('&') > 0) {
                        link = document.location.href + '&d=ltr';
                    } else {
                        link = document.location.href + '?d=ltr';
                    }
                }
                document.location.href = link;
            }
        });
    }

    function panelChangeLayout(layout) {
        var layout_btn = $('.button-command-layout[value="'+layout+'"]');
        if (!layout_btn.hasClass('active')) {
            $('.button-command-layout').removeClass('active');
            layout_btn.addClass('active');
            if (layout == 'boxed') {
                $('.overlay-setting').removeClass('disabled');
                $('body').addClass('body-boxed');
            } else {
                $('.overlay-setting').addClass('disabled');
                $('body').removeClass('body-boxed');
            }
            //$(window).resize();
            $('.rev_slider_wrapper ').resize();
        }
    }

    function panelChangeColor(color) {
        var color_btn = $('.sample-setting button[value="'+color+'"]');
        if (!color_btn.hasClass('active')) {
            $('.sample-setting button').removeClass('active');
            color_btn.addClass('active');
            var color_regexp =  new RegExp(inwavePanelSettings.color, 'g');
            var newColorSetting = inwavePanelSettings.color_css.replace(color_regexp, color);
            $('#color-setting').html(newColorSetting);
        }
    }

    function panelChangebackground(background){
        if ($('.button-command-layout.active').val() == 'wide') {
            return;
        }
        var background_btn = $('.background-setting button[value="'+background+'"]');
        if (!background_btn.hasClass('active')) {
            $('.background-setting button').removeClass('active');
            background_btn.addClass('active');
            if (background.indexOf('#') === 0) {
                $('body').css('background', background);
            } else {
                $('body').css('background', 'url(' + background + ')');
            }
        }
    }

    function panelWriteSetting() {
        var activeSetting = {
            layout: $('.button-command-layout.active').val(),
            mainColor: $('.sample-setting button.active').val(),
            bgColor: $('.background-setting button.active').val()
        };
        setCookie(inwavePanelSettings.theme+'-setting', JSON.stringify(activeSetting), 0);
    }

    /** COOKIE FUNCTION */
    function setCookie(cname, cvalue, exdays) {
        var expires = "";
        if (exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = " expires=" + d.toUTCString();
        }
        document.cookie = cname + "=" + cvalue + ";" + expires + '; path=/';
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    }

    $(document).ready(function () {
        panelInit();
    });

})(jQuery);