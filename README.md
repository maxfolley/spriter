Spriter!
=======

A simple jQuery plugin for animating sprites.

Usage
----

    $("#my-sprite").spriter({fps: 12, frames: 3, autoplay: true});

OR

    // Init spriter
    $spr = $("#my-sprite");
    $spr.spriter({fps: 12, frames: 3});

    // Some later point in your code, start the animation
    $spr.startSpriter();

    // Some later point, stop the animation
    $spr.stopSpriter();

