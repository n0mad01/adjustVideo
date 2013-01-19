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
            defaults = {},
            $element = $(element),
            element = element,
            $parent = null,
            vids = null,
            aspectRatio = null,
            width = null,
            height = null;
            unitWidth = 'px',
            unitHeight = 'px',
            center = false;

        plugin.settings = {};

        setOptions = function() {
            if( Object.prototype.toString.call( options ) === '[object Object]' ) {
                if( typeof options.width !== 'undefined' ) { width = options.width; }
                if( typeof options.height !== 'undefined' ) { height = options.height; }
                if( typeof options.center !== 'undefined' ) { center = options.center; }
            }
        },
        getAspectRatio = function( elem ) {
            return elem.height() / elem.width();
        },
        plugin.init = function() {
            plugin.settings = $.extend( {}, defaults, options );

            setOptions();

            vids = $element.find('iframe');

            vids.each( function( i ) {
                    $parent = $(this).wrap('<div class="adjustVideo_wrapper" />').parent();
                if( ! width && ! height ) {
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
                    if( height ) {
                        // TODO : different size units em, %, px
                        //unitHeight = height.replace ( /[!^0-9]/g, '' );
                        //height = height.match( /\d+\.?\d*/g );
                        if( ! width ) {
                            aspectRatio = getAspectRatio( $(this) );
                            width = ( $(this).height() * aspectRatio );
                        }
                    }
                    if( width ) {
                        if( ! height ) {
                            aspectRatio = getAspectRatio( $(this) );
                            height = ( $(this).width() * aspectRatio );
                        }
                        // TODO : different size units em, %, px
                        //unitWidth = width.replace ( /[!^0-9]/g, '' );
                        //width = width.match( /\d+\.?\d*/g );
                    }
                    $(this).width( width + unitWidth ).height( height + unitHeight );
                }
                if( center ) {
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
