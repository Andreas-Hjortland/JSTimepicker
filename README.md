Screenshot
==========

![screenshot](https://raw.github.com/AndreasHjortland/JSTimepicker/master/screen.png)

Description
============
This is an effort to recreate the timepicker which is used on the standard calendar for android devices in html + javascript.

Usage
=====
As of now this is in the prototyping stage, so I wouldn't recommend anyone to use it quite yet, but if you want to use it, you have to host the less file (possibly compiled, else with lessjs), and copy the node div.timepicker (with all the subnodes of course) from the timepicker.html file and bind it to the input field like this (you can use another selector if you want.. You get the idea).

    $('input[type=time]').timepicker();

<!---
Configuration
=============
TODO: This isn't done yet.
-->

License
=======
[MIT](https://raw.github.com/AndreasHjortland/JSTimepicker/master/LICENSE)
