(function ($) {
    "use strict";
// When the window has finished loading create our google map below
    $.fn.iwMap = function () {
        $(this).each(function () {
            var self = $(this),
                map_style_block = $(this).data('style_block'),
                map_info_title = $(this).data('map_info_title'),
                map_styles = $(this).data('map_styles'),
                address = $(this).data('address'),
                phone_number = $(this).data('phone_number'),
                email_address = $(this).data('email_address'),
                icon = $(this).data('marker_icon'),
                lat = $(this).data('lat'),
                long = $(this).data('long'),
                width = $(this).data('width'),
                height = $(this).data('height'),
                info_panby_x = $(this).data('info_panby_x'),
                info_panby_y = $(this).data('info_panby_y'),
                panby_x = $(this).data('panby_x'),
                panby_y = $(this).data('panby_y');
            var loc = new google.maps.LatLng(lat, long);
            //$(this).addClass('map-rendered');

            var mapOptions = {
                scrollwheel: false,
                //disableDoubleClickZoom: true,
                draggable: true,
                // How zoomed in you want the map to start at (always required)
                zoom: $(this).data('zoom'),
                // The latitude and longitude to center the map (always required)
                center: loc,
                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles:
                    (iwmap.map_styles ? JSON.parse(iwmap.map_styles) : [
                        {
                            "featureType": "administrative",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#444444"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 45
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#46bcec"
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        }
                    ])

            };

            var map = new google.maps.Map($(this).find('.map-view').get(0), mapOptions);

            if(panby_x != '' || panby_y != ''){
                map.panBy(panby_x, panby_y);
            }
            var marker_options = {
                position: loc,
                map: map
            };

            if(map_info_title){
                marker_options.map_info_title = map_info_title;
            }

            if(address){
                marker_options.address = address;
            }

            if(phone_number){
                marker_options.phone_number = phone_number;
            }

            if(email_address){
                marker_options.email_address = email_address;
            }
            if(icon){
                marker_options.icon = icon;
                //marker_options.icon.url = icon;
                //marker_options.icon.anchor = new google.maps.Point(26, -160);
            }

            var marker = new google.maps.Marker(marker_options);

            var content = '';
            if(address || phone_number || email_address){
                content += '<div class="info">';
                if(map_info_title){
                    content += '<div class="map-info-title">'+map_info_title+'</div>';
                }
                if (map_style_block == 'style1') {
                    if(address){
                        content += '<div class="address"><span class="left">A:</span>'+address+'</div>';
                    }
                    if(phone_number){
                        content += '<div class="phone"><span class="left">T:</span>'+phone_number+'</div>';
                    }
                    if(email_address){
                        content += '<div class="email"><span class="left">E:</span>'+email_address+'</div>';
                    }
                }
                else {
                    if(address || phone_number){
                        content += '<div class="head-office">Head Office</div>';
                    }
                    if(address){
                        content += '<div class="address">'+address+'</div>';
                    }
                    if(phone_number){
                        content += '<div class="phone"><span class="left">T:</span>'+phone_number+'</div>';
                    }
                }
                content += '</div>';
            }

            var infobox = new InfoBox({
                content: content,
                disableAutoPan: false,
                maxWidth: 150,
//                    pixelOffset: new google.maps.Size(-230, -450),
                pixelOffset: new google.maps.Size(0 - (width/2) + info_panby_x, 0 - height - info_panby_y),
                zIndex: null,
                boxStyle: {
                    opacity: 1,
                    width: width+'px',
                    left: '50%'
                },
                closeBoxMargin: "0 0 -15px 0",
                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                infoBoxClearance: new google.maps.Size(1, 1)
            });
            //map.panBy(0, -160);
            infobox.open(map, marker);
            google.maps.event.addListener(marker, 'click', function () {
                infobox.open(map, this);
            });

            self.data('map', map);
            self.data('marker', marker);
            //self.data('markerinfowindow', markerinfowindow);
            //map, maker

            //marker change position
            //map center setCenter
            //new google.maps.LatLng(-34, 151)
        });
    };
    $(window).load(function(){
        $(".map-contain").iwMap();
        $(".inwave-multi-map .iw-map-item").on("click", function(){
            var itemClick = $(this);
            $('.inwave-multi-map .iw-map-item.active').removeClass('active');
            itemClick.addClass('active');
            var parent = itemClick.closest('.inwave-multi-map');
            var map_container = parent.find(".map-contain");
            var map = map_container.data('map');
            var marker = map_container.data('marker');
            var markerinfowindow = map_container.data('markerinfowindow');
            var new_lat = itemClick.data( "lat" );
            var new_long = itemClick.data( "long" );
            var new_address = itemClick.data( "address" );
            var latlng = new google.maps.LatLng(new_lat, new_long);
            setTimeout( function(){
                map.setCenter(latlng);
                marker.setPosition(latlng);
                markerinfowindow.setContent(new_address);
            }, 1000 );
        });

    });
})(jQuery);

