;(function()  {
	'use strict';


var template = (function(){
function encodeHTMLSource() {  var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },  matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;  return function() {    return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;  };};
String.prototype.encodeHTML=encodeHTMLSource();
var tmpl = {};
  tmpl['timepicker']=function anonymous(it) {
var out='<div class="timepicker" style="margin-left: auto; margin-right: auto"><div class="digital"><span class="hours">--</span>:<span class="minutes">--</span><small>&nbsp;PM</small></div><div class="dial"><div class="digits center"><div>&bull;</div></div><div class="digits clock-hand outer">&nbsp;</div><div class="digits clock-hand inner">&nbsp;</div><div class="digits hours-low"><div class="digit">1</div><div class="digit">2</div><div class="digit">3</div><div class="digit">4</div><div class="digit">5</div><div class="digit">6</div><div class="digit">7</div><div class="digit">8</div><div class="digit">9</div><div class="digit">10</div><div class="digit">11</div><div class="digit">12</div></div><div class="digits hours-high"><div class="digit">13</div><div class="digit">14</div><div class="digit">15</div><div class="digit">16</div><div class="digit">17</div><div class="digit">18</div><div class="digit">19</div><div class="digit">20</div><div class="digit">21</div><div class="digit">22</div><div class="digit">23</div><div class="digit">00</div></div><div class="digits minutes"><div class="digit">05</div><div class="digit">10</div><div class="digit">15</div><div class="digit">20</div><div class="digit">25</div><div class="digit">30</div><div class="digit">35</div><div class="digit">40</div><div class="digit">45</div><div class="digit">50</div><div class="digit">55</div><div class="digit">00</div></div></div><div class="ampm"><div class="am">AM</div><div class="pm">PM</div></div><div class="bottom"><button class="abort">Abort</button><button class="back">Back</button><button class="next">Next</button><button class="confirm">Done</button></div></div>';return out;
};
return tmpl;})();
$.fn.timepicker = function() {
	var $this = $(this);
	var AM_PM = false;
	var $element = $(template.timepicker()).hide().appendTo(document.body);


	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	var setupArms = function(outer, $selector) {
		$selector.each(function(index, value) {
			// 0 degrees is straight down (06), the numbers start at 01 which is 210 degrees from 06.
			var degrees = (210 + (index * 30)) % 360;
			$(value).hover(
				// Hover enter
				function() {
					var $arm;
					if(outer) {
						$arm =  $element.find('.dial .digits.clock-hand.outer');
					} else {
						$arm =  $element.find('.dial .digits.clock-hand.inner');
					}
					$arm.css('transform', 'rotate(' + degrees + 'deg)');
					$arm.show();
				},
				// Hover exit
				function() {
					var $arm;
					if(outer) {
						$arm =  $element.find('.dial .digits.clock-hand.outer');
					} else {
						$arm =  $element.find('.dial .digits.clock-hand.inner');
					}
					$arm.hide();
				}
			);
		});
	};

	function hourState() {
		$element.find('.digital.minutes').removeClass("selected");
		$element.find('.digital.hours').addClass("selected");
		$element.find('.back').fadeOut();
		$element.find('.confirm').fadeOut();
		$element.find('.next').fadeIn();
		$element.find('.abort').fadeIn();
		$element.find('.dial .digits[class*=hours-]').fadeIn();
		$element.find('.dial .digits.minutes').fadeOut();
	}

	function minuteState() {
		$element.find('.digital.minutes').removeClass("selected");
		$element.find('.digital.hours').addClass("selected");
		$element.find('.next').fadeOut();
		$element.find('.abort').fadeOut();
		$element.find('.back').fadeIn();
		$element.find('.confirm').fadeIn();
		$element.find('.dial .digits[class*=hours-]').fadeOut();
		$element.find('.dial .digits.minutes').fadeIn();
	}

	function hide() {
		$element.fadeOut(hourState);
	}

	if(AM_PM) {
		$element.find('.dial .digits.hours-high').hide();
	} else {
		$element.find('.ampm').hide();
		$element.find('.digital small').hide();
	}


	/**
	 * If we click on any other places than inside the container or the selector,
	 * we should close the timepicker.
	 */
	$(document).mouseup(function (e)
	{
		if (!$element.is(e.target) && $element.has(e.target).length === 0)
		{
			if (!$this.is(e.target) && $this.has(e.target).length === 0)
			{
				$element.fadeOut();
			}
		}
	});

	setupArms(true, $element.find('.dial .digits.hours-low div'));
	setupArms(false, $element.find('.dial .digits.hours-high div'));
	setupArms(true, $element.find('.dial .digits.minutes div'));

	$element.on('click', 'button.abort', function() {
		hide();
	});

	$element.on('click', 'button.confirm', function() {
		var hours = $element.find('.digital .hours').text().trim();
		var minutes = $element.find('.digital .minutes').text().trim();
		var ampm = $element.find('.digital small').text().trim();
		if(AM_PM) {
			$this.val(hours + ":" + minutes + " " + ampm);
		} else {
			$this.val(hours + ":" + minutes);
		}
		hide();
	});

	$element.on('click', 'button.next', function() {
		minuteState();
	});

	$element.on('click', 'button.back', function() {
		hourState();
	});

	$element.find('.dial .digits .digit').on('click', function() {
		$element.find('.dial .digits .digit.active').removeClass('active');
		$(this).addClass('active');
	});

	$element.find('.dial .digits[class*=hours-] > .digit').on('click', function() {
		$element.find('.digital .hours').text(pad($(this).text(), 2, '0'));
	});

	$element.find('.dial .digits.minutes > .digit').on('click', function() {
		$element.find('.digital .minutes').text(pad($(this).text(), 2, '0'));
	});

	$this.on('focus', function() {
		$element.fadeIn();
	});
};

}());
