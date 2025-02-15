/**
 * onScreen v1.0 (https://github.com/rkroboth/jQuery.onScreen)
 * Copyright 2025 Rusty Kroboth (https://www.krobeinteractive.com)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
(function($, undefined) {
    $.fn.onScreen = function(callback, options) {
        
        if (typeof options !== 'object') {
            options = {};
        }
        options = $.extend({}, $.fn.onScreen.defaults, options);
        
        return this.each(function() {
            
            let getOverlapPercent = function(start1, end1, start2, end2) {
                const length1 = end1 - start1;
                if (end1 <= start2 || start1 >= end2) {
                    return 0;
                }
                const overlapLength = Math.min(end1, end2) - Math.max(start1, start2);
                return length1 ? (overlapLength / length1) * 100 : 0;
            }
            
            let checkForOnScreen = function() {
                let viewportTop = $(window).scrollTop();
                let viewportBottom = viewportTop + $(window).height();
                
                let elementTop = $(this).offset().top;
                let elementBottom = elementTop + $(this).outerHeight();
                
                let percent_of_element_on_screen = getOverlapPercent(elementTop, elementBottom, viewportTop, viewportBottom);
                let percent_screen_covered_by_element = getOverlapPercent(viewportTop, viewportBottom, elementTop, elementBottom);
                
                if (
                    (
                        !options.runOnce
                        || !$(this).data("onScreenHasRun")
                    )
                    && (
                        percent_of_element_on_screen > options.percentOfElementOnScreen
                        || percent_screen_covered_by_element > options.percentOfScreenFilled
                    )
                ) {
                    if (options.runOnce) {
                        $(this).data("onScreenHasRun", true);
                    }
                    callback.call(this);
                }
            }.bind(this);
            
            let scrollTimeout = null
            let onScroll = function() {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(
                    function() {
                        checkForOnScreen();
                    },
                    options.stopScrollDelay
                );
            }
            
            $(this).data("onScreenHasRun", false);
            setTimeout(function() {
                checkForOnScreen();
                $(window).scroll(onScroll);
            }, options.delayStart);
            
        });
    };
    $.fn.onScreen.defaults = {
        delayStart: 500,
        percentOfElementOnScreen: 95,
        percentOfScreenFilled: 100,
        stopScrollDelay: 10,
        runOnce: true,
    };
}(window.jQuery));
