mobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

jQuery(function ($) {
	function contrast(hue, hsl) {
		var newrgb = hslToRgb(hue, hsl[1], hsl[2]);
		newrgb[0] = Math.floor((255 - newrgb[0]));
		newrgb[1] = Math.floor((255 - newrgb[1]));
		newrgb[2] = Math.floor((255 - newrgb[2]));
		$("article div#contrast").append("<div class='colour' title='rgb("+newrgb+")' style='background-color:rgb("+newrgb +");'></div>");	
	}
	
	$(document).ready(function(){
		//allow numeric only input
		$('input').keydown(function (e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				 // Allow: Ctrl+A
				(e.keyCode == 65 && e.ctrlKey === true) || 
				 // Allow: home, end, left, right
				(e.keyCode >= 35 && e.keyCode <= 39)) {
					 // let it happen, don't do anything
					 return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
		
		$("#calc").on(mobile ? 'touchstart' : 'click', function(e) {
			/* get RGB */
			var red = $('input#red').val();
			var green = $('input#green').val();
			var blue = $('input#blue').val();
			/* ensure correct values */
			if(red > 255) red = 255;
			else if(red == "") red = 0;
			
			if(green > 255) green = 255;
			else if(green == "") green = 0;
			
			if(blue > 255) blue = 255;
			else if(blue == "") blue = 0;
			/* set input to match*/
			$('input#red').val(red);
			$('input#blue').val(blue);
			$('input#green').val(green);
			/* display data */
			
			$("header div#info").children().remove();
			$("header div#info").append("<div><p>Red: "+red+"</p><p>Green: "+green+"</p><p>Blue: "+blue+"</p></div>");
			
			var hsl = rgbToHsl(red,green,blue);
			$("header div#info").append("<div><p>Hue: "+hsl[0]+"</p><p>Saturation: "+hsl[1]+"</p><p>Light: "+hsl[2]+"</p></div>");
			$("article div#pallet, article div#contrast").children().remove();
			
			$("div#current").css("background-color","rgb("+red+","+green+","+blue+")");
			$("div#current").attr("title", "rgb("+red+","+green+","+blue+")");
			
			/* generate pallet*/
			$("article").css("display","block");
			
			var hue = hsl[0];
			if(hue == 0) hue = 0.01;
			
			contrast(hue, hsl);
			var dirup = (hue < 0.1);
			/* non contrasting pallet generation here */
			for(var i = 0; i < 4; i++) {
				if(dirup)
					hue *= 1.6180339887;
				else
					hue *= 0.6180339887;
				
				var newrgb = hslToRgb(hue, hsl[1], hsl[2]);
				newrgb[0] = Math.floor(newrgb[0]);
				newrgb[1] = Math.floor(newrgb[1]);
				newrgb[2] = Math.floor(newrgb[2]);
				$("article div#pallet").append("<div class='colour' title='rgb("+newrgb+")' style='background-color:rgb("+newrgb +");'></div>");
				contrast(hue, hsl);
			}			
		});
	});
});
