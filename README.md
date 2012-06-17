Spriter!
=======

A simple jQuery plugin for animating sprites.

Usage
----

    $("#my-sprite").spriter({fps: 12, frames: 3, autoPlay: true});

OR

    // Init spriter
    $spr = $("#my-sprite");
    $spr.spriter({fps: 12, frames: 3});

    // Some later point in your code, start the animation
    $spr.spriter("start");

    // Some later point, stop the animation
    $spr.spriter("stop");

Options
-------
*autoPlay* - set to true if you want it to play whe inited, otherwise you need to call the "start" method  
*fps* - frames per second, defaults to 12  
*frames* - number of frames in your sprite, required if useing a background image  
*frameWidth* - width of the frame, defaults to the dimensions of the element  
*iterations* - number of times to play the sprite, by default it plays inifinitely  
*useImage* - set to true if you want to use an image tag as the sprite instead of a background image  
