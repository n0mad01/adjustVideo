/* ============================================================
 * adjustVideo.js v1.0.0
 * http://videoplugin.soluch.at/
 * ============================================================
 * Copyright 2013, Adrian Soluch - http://soluch.at/
 * Released under the MIT License https://raw.github.com/n0mad01/adjustVideo/master/MIT-LICENSE.txt
 * ============================================================ */

(function($) {
    $.adjustVideo = function( element, options ) {

        var plugin = this,
            defaults = {
                width : null,
                height: null,
                unitWidth :'px',
                unitHeight :'px',
                center : false
            },
            $element = $(element),
            element = element,
            $parent = null,
            vids = null,
            aspectRatio = null;

        plugin.settings = {};

        getAspectRatio = function( elem ) {
            return elem.height() / elem.width();
        },
        plugin.init = function() {
            plugin.settings = $.extend( {}, defaults, options );

            vids = $element.find('iframe');

            vids.each( function( i ) {
                    $parent = $(this).wrap('<div class="adjustVideo_wrapper" />').parent();
                if( ! plugin.settings.width && ! plugin.settings.height ) {
                    // apply video wrappers
                    $parent.css({ 
                        'position' : 'relative', 
                        'padding-bottom' : '56.25%', /* 16:9 Ratio */
                    });
                    // position the video itself
                    $(this).css({
                        'position' : 'absolute',
                        'top' : '0',
                        'left' : '0',
                        'width' : '100%',
                        'height' : '100%'
                    });
                }
                else {
                    if( plugin.settings.height ) {
                        // TODO : different size units em, %, px
                        //unitHeight = height.replace ( /[!^0-9]/g, '' );
                        //height = height.match( /\d+\.?\d*/g );
                        if( ! plugin.settings.width ) {
                            aspectRatio = getAspectRatio( $(this) );
                            plugin.settings.width = ( plugin.settings.height / aspectRatio );
                        }
                    }
                    if( plugin.settings.width ) {
                        if( ! plugin.settings.height ) {
                            aspectRatio = getAspectRatio( $(this) );
                            plugin.settings.height = ( plugin.settings.width * aspectRatio );
                        }
                        // TODO : different size units em, %, px
                        //unitWidth = width.replace ( /[!^0-9]/g, '' );
                        //width = width.match( /\d+\.?\d*/g );
                    }
                    $(this).width( plugin.settings.width + plugin.settings.unitWidth ).height( plugin.settings.height + plugin.settings.unitHeight );
                }
                if( plugin.settings.center ) {
                    $parent.css({ 'text-align' : 'center' });
                }
            });
        };
        plugin.init();
    };

    $.fn.adjustVideo = function( options ) {
        return this.each(function() {
            if( $(this).data('adjustVideo') == undefined ) {
                var plugin = new $.adjustVideo(this, options);
                $(this).data('adjustVideo', plugin);
            }
        });
    };
})(jQuery);
