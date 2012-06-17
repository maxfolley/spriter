(function ($) {
    "use strict";
    function loop(el) {
        var sprData = el.data("sprData");
        // If past boundary, repeat
        if (sprData.xpos <= -(sprData.sceneW - sprData.frameW)) {
            sprData.count += 1;
            sprData.xpos = sprData.frameW;
            // If done iterating, stop the sprite
            if (sprData.count >= sprData.iterations) {
                el.data("sprData", sprData);
                stopSprite(el);
                return;
            }
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
        loop(el);
        sprData.interval = setInterval(helper(el), sprData.rate);
        sprData.count = 0;
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
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this), 
                    opts = {
                        fps: 10,
                        autoPlay: false,
                        frames: 2,
                        frameWidth: NaN,
                        iterations: "infinite",
                        useImage: false 
                    },
                    sprData = $this.data("sprData") || {},
                    frameW;

                $.extend(opts, options);
                frameW = opts.frameW || $this.width();
                $.extend(sprData, {
                    rate: Math.round((1 / opts.fps) * 1000),
                    frames: opts.frames,
                    frameW: frameW,
                    css: (opts.useImage === true) ? "left" : "bg-position-x",
                    dir: -1,
                    interval: undefined,
                    iterations: opts.iterations,
                    img: $(opts.useImage === true) ? $("img", $this) : undefined,
                    sceneW: opts.frames * frameW,
                    xpos: frameW
                });

                $this.data("sprData", sprData);

                if (opts.autoPlay === true) {
                    startSprite($this);
                }
            });
        },
        start: function () {
            return this.each(function () {
                var $this = $(this);
                startSprite($this);
            });
        },
        stop: function () {
            return this.each(function () {
                var $this = $(this);
                stopSprite($this);
            });
        }
    };
    $.fn.spriter = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.spriter');
        }
    };
}(jQuery));
