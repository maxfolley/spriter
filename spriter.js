(function ($) {
    "use strict";
    function loop(el) {
        var sprData = el.data("sprData");
        // If past boundary, repeat
        if (sprData.xpos <= -(sprData.sceneW - sprData.frameW)) {
            sprData.xpos = 0;
        } else {
            sprData.xpos -= sprData.frameW;
        }
        if (typeof sprData.img !== "undefined") {
            sprData.img.css("left", sprData.xpos)
        } else {
            el.css("backgroundPosition", "(" + sprData.xpos + "px 0)");
        }
        el.data("sprData", sprData);
    }
    function startSprite(el) {
        var sprData = el.data("sprData"),
            helper = function (el) {
                return function () {
                    loop(el);
                };
            };

        // Return if already started
        if (typeof sprData === "undefined" || typeof sprData.interval !== "undefined") {
            return;
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
        clearInterval(sprData.interval);
        sprData.interval = undefined;
        el.data("sprData", sprData);
    }
    $.fn.spriter = function (options) {
        var opts = {
                fps: 10,
                autoPlay: false,
                frames: 2,
                frameWidth: NaN,
                useImage: false 
            },
            sprData = this.data("sprData") || {},
            frameW;

        $.extend(opts, options);
        frameW = opts.frameW || this.width();
        $.extend(sprData, {
            rate: Math.round((1 / opts.fps) * 1000),
            frames: opts.frames,
            frameW: frameW,
            css: (opts.useImage === true) ? "left" : "bg-position-x",
            dir: -1,
            interval: undefined,
            img: $(opts.useImage === true) ? $("img", this) : undefined,
            sceneW: opts.frames * frameW,
            xpos: 0
        });

        this.data("sprData", sprData);

        if (opts.autoPlay === true) {
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
}(jQuery));
