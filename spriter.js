(function($, window) {
    var els = $([]),
        numEls = 0;

    function loop(el) {
        var sprData = el.data("sprData"),
            elW = el.width();
        // If past boundary, repeat
        if (sprData.xpos <= -(elW - sprData.frameW)) {
            sprData.xpos = 0;
        } else {
            sprData.xpos -= sprData.frameW;
        } 
        el.css("left", sprData.xpos)
          .data("sprData", sprData);
    }
    function startSprite(el) {
        var sprData = el.data("sprData");
        // Return if already started
        if (typeof sprData === "undefined" || typeof sprData.interval !== "undefined") {
            return;
        }
        // Maintain scope of el
        var helper = function (el) {
            return function () {
                loop(el);
            }
        }
        sprData.interval = setInterval(helper(el), sprData.rate); 
        el.data("sprData", sprData);
    }
    function stopSprite(el) {
        var sprData = el.data("sprData");
        // Return if not started
        if (typeof sprData === "undefined" || typeof sprData.interval === "undefined") {
            return;
        }
        sprData.interval = undefined;
        el.data("sprData", sprData);
    }
    $.fn.spriter = function (options) {
        var opts = {
                fps: 10,
                autoplay: false,
                frames: NaN,
                frameWidth: NaN
            },
            sprData = this.data("sprData") || {};

        $.extend(opts, options);
        $.extend(sprData, {
            rate: Math.round((1/opts.fps) * 1000),
            frameW: opts.frameWidth || this.parent().width() || 0,
            dir: -1,
            interval: undefined,
            xpos: 0
        });

        this.data("sprData", sprData);

        if (opts.autoplay === true) {
            startSprite(this);
        }

        return this;
    };
    $.fn.startSpriter = function () {
        startSprite(this);
        return this;
    };
    $.fn.stopSpriter = function () {
        stopSprite(this);
        return this;
    };
})(jQuery);
