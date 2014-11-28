(function (d,w) {
	
	
	//--------------------------------------------------------------------------
	$(d).ready(function() {
		
		$('.js-download').on('click', function(event) {
			event.preventDefault();
			$(this).parent().parent().find('.download-links')
				.removeClass('fade-down')
				.addClass('fade-up');
		});

		$('.js-download-close').on('click', function(event) {
			event.preventDefault();
			$(this).parent().parent().parent()
				.removeClass('fade-up')
				.addClass('fade-down');
		});

	});


	//--------------------------------------------------------------------------
	function _(id) {
	    return (d.getElementById(id));
	}

	function _name(name) {
	    return (d.getElementsByName(name)[0]);
	}

	function _query(query) {
	    return (d.querySelectorAll(query));
	}

	function _class(className) {
	    return (_query('.' + className)[0]);
	}

	function _addEvent(o, event, func) {
	    return (!Boolean(w.addEventListener) ? o.attachEvent('on' + event, func) : o.addEventListener(event, func, false));
	}

	var _get = {
	    Scroll: function() {
	        return d.documentElement.scrollTop || d.body.scrollTop;
	    },
	    WindowHeight: function() {
	        return w.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
	    },
	    WindowWidth: function() {
	        return w.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
	    }
	}

	var SCROLL_TIME = 500,
		SCROLL_STEPS = 40,
		SCROLL_OSCILATION = 0.01;

	function scrollHref(elem) {
	    while (elem.tagName != 'BODY' && elem.className.indexOf('scroll') == -1)
	    elem = elem.parentNode;

	    var id = elem.href.split('#')[1];
	    scrollToElement(id != '' ? _('_' + id) : d.body);
	}

	var STE_step,
		STE_steps,
		STE_scroll,
		STE_initial_scroll,
		STE_times = [],
		STE_margin_top = 80; // Height of header

	function scrollToElement(toElement) {
	    var toPosition = toElement.offsetTop - STE_margin_top,
	    	time;

	    STE_scroll = _get.Scroll();
	    STE_initial_scroll = _get.Scroll();
	    STE_steps = (toPosition - STE_scroll) / SCROLL_STEPS;
	    STE_step = 0;

	    while (time = STE_times.pop())
	    clearTimeout(time);

	    for (var i = 1; i < (SCROLL_STEPS + 1); i++)
	    STE_times.push(setTimeout(function() {
	        scrollNextStep()
	    }, i * SCROLL_TIME / SCROLL_STEPS));

	    w.scrollTo(0, STE_scroll);
	}




	function scrollNextStep() {
	    var temporalStep = (STE_step % Math.floor(SCROLL_STEPS / 2)) - Math.floor(SCROLL_STEPS / 4),
	    	oscilation = (Math.floor(SCROLL_STEPS / 2) > STE_step ? temporalStep : -temporalStep) * SCROLL_OSCILATION;

	    STE_scroll += STE_steps + (STE_steps * (oscilation));

	    w.scrollTo(0, STE_scroll);

	    STE_step++;

	    if (SCROLL_STEPS <= STE_step) w.scrollTo(0, STE_initial_scroll + (STE_steps * SCROLL_STEPS));
	}

	function setHeaderFixed() {
	    var height = _get.WindowHeight(),
	    	scroll = _get.Scroll(),
	    	fix = (height - 40) > scroll,
	    	SE = ['_manual', '_logos', '_icons', '_templates', '_kit'],
	    	position = 0;

	    for (var k in SE) {
	        if (scroll >= _(SE[k]).offsetTop - STE_margin_top) position++;
	    };

	    for (var i = 1; i <= SE.length; i++) { // menu elements
	        changeClassName(_class('item' + i), 'current', i != position);
	    };
	}

	function changeClassName(o, className, remove) {
	    o.className = o.className.split(' ' + className).join('');
	    if (!remove) o.className += ' ' + className;
	}

	// Listeners ---------------------------------------------------------------

	_addEvent(w, 'scroll', function(e) { // On Scroll
	    setHeaderFixed();
	});

	var aLinks = ['top','manual','logos','icons','templates','kit'];
	for( var i in aLinks ) {
		_(aLinks[i]).addEventListener('click', function(e){
			e.preventDefault();
			scrollHref(this);
		});

	}

})(document, window);
