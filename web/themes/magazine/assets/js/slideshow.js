
(jQuery)(function () {
	
	fix_slider_html();
	(jQuery)('#slideshow_container').flexslider({
		animation: "slide",
	});
	onDrag();
	
	function fix_slider_html() {
		var parent = (jQuery)('#slideshow_container');
		var sliderContainer = (jQuery)(parent.children()[1]);
		var slider = (jQuery)('<ul class="slides"></ul>');
		sliderContainer.children().each(function (i, e) {
			var self = (jQuery)(this);
			var image = self.find('.views-field-field-slideshow img').parent().parent();
			var title = self.find('.views-field-title a').parent();
			
			var newElement = '<li>' + image.html() + '<p class="flex-caption">' + title.html() + '</p></li>';
			
			(jQuery)(slider).append(newElement);
		});
		parent.empty();
		parent.append(slider);
	}
	
	function onDrag() {
		var isDragging = false;
		var img = (jQuery)('#slideshow_container .slides img');
		var deltaX, deltaY;
		
		img.mousedown(function(event) {
			isDragging = false;
			deltaX = event.offsetX;
			//deltaY = event.offsetY;
		})
		.mousemove(function(event) {
			isDragging = true;
		})
		.mouseup(function(event) {
			var wasDragging = isDragging;
			
			isDragging = false;
			deltaX -= event.offsetX;
			//deltaY -= event.offsetY;
			
			if (Math.abs(deltaX) > 20/* || Math.abs(deltaY) > 20*/) {
				if (deltaX < 0) {
					movePrev();
				} else {
					moveNext();
				}
				/*
				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					if (deltaX < 0) {
						movePrev();
					} else {
						moveNext();
					}
				} else {
					if (deltaY < 0) {
						moveTop();
					} else {
						moveDown();
					}
				}
				*/				
			}
		});
	}
	
	function moveNext() {
		(jQuery)('#slideshow_container').flexslider({
			direction: "horizontal"
		});
		(jQuery)('#slideshow_container').flexslider("next");
	}
	
	function movePrev() {
		(jQuery)('#slideshow_container').flexslider({
			direction: "horizontal"
		});
		(jQuery)('#slideshow_container').flexslider("prev");
	}
	
	function moveTop() {
		(jQuery)('#slideshow_container').flexslider({
			direction: "vertical"
		});
		(jQuery)('#slideshow_container').flexslider("next");
	}
	
	function moveDown() {
		(jQuery)('#slideshow_container').flexslider({
			direction: "vertical"
		});
		(jQuery)('#slideshow_container').flexslider("prev");
	}
	
	/*
		<ul class="slides">
            <li>
  	    	    <img src="images/kitchen_adventurer_cheesecake_brownie.jpg" />
              <p class="flex-caption">Adventurer Cheesecake Brownie</p>
  	    		</li>
  	    		<li>
  	    	    <img src="images/kitchen_adventurer_lemon.jpg" />
              <p class="flex-caption">Adventurer Lemon</p>
  	    		</li>
  	    		<li>
  	    	    <img src="images/kitchen_adventurer_donut.jpg" />
              <p class="flex-caption">Adventurer Donut</p>
  	    		</li>
  	    		<li>
  	    	    <img src="images/kitchen_adventurer_caramel.jpg" />
              <p class="flex-caption">Adventurer Caramel</p>
  	    		</li>
          </ul>
		*/
});