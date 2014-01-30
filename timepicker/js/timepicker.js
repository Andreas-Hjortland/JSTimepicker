$.fn.timepicker = function() {
	var $this = $(this);
	var $element = $('.timepicker');
	var AM_PM = false;

	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	setupArms = function(outer, $selector) {
		$selector.each(function(index, value) {
			// 0 degrees is straight down (06), the numbers start at 01 which is 210 degrees from 06.
			var degrees = (210 + (index * 30)) % 360;
			$(value).hover(
				// Hover enter
				function() {
					var $arm = undefined;
					if(outer) {
						$arm =  $element.find('.dial .digits.clock-hand.outer')
					} else {
						$arm =  $element.find('.dial .digits.clock-hand.inner')
					}
					$arm.css('transform', 'rotate(' + degrees + 'deg)');
					$arm.show();
				},
				// Hover exit
				function() {
					if(outer) {
						$arm =  $element.find('.dial .digits.clock-hand.outer')
					} else {
						$arm =  $element.find('.dial .digits.clock-hand.inner')
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
		if (!$element.is(e.target)
			&& $element.has(e.target).length === 0)
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
		var hours = $element.find('.digital .hours').text().trim()
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

	$this.on('click', function() {
		$element.fadeIn();
	});
}
