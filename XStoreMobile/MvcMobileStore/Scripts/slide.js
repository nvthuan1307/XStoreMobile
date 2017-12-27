$(document).ready(function(){
	
	// Homepage slide
	var bannerWrapper = $('#banner .banner-wrapper .the-mask .image-wrapper');
	firstImg = $(bannerWrapper).find('.img').first();
	lastImg = $(bannerWrapper).find('.img').last()
	firstImg.clone().appendTo(bannerWrapper);
	lastImg.clone().prependTo(bannerWrapper);
	var imgList = $(bannerWrapper).find('.img');
//	$(firstImg).clone().appendTo(bannerWrapper);
	var totalItem = imgList.length;
	if (_cposi > (totalItem - 2))
	{
	    var nPos = _cposi % (totalItem - 2);
	    if (nPos == 0)
	    {
	        nPos = totalItem - 2;
	    }
	    _cposi = nPos;
	}
	var itemWidth = $(imgList).width();
	var bannerListWidth = totalItem * itemWidth;
	var defaultLeftIndent = parseInt($(bannerWrapper).css('left'));
	var currentPosition = _cposi;
	var latestWindowWidth = $(window).width();
	var isResized = 0;
	
	// Start position
	$(bannerWrapper).css({'left': defaultLeftIndent + (itemWidth * currentPosition * -1)})
	
	// Set imge-wrapper div width để tính width tự động, khỏi phải chỉnh trong CSS
	bannerWrapper.width(bannerListWidth);
	
	// Nhấn nút left
	var leftArrowState = 0
	$('#banner .banner-wrapper .arrow-wrapper .left-arrow').click(function(event){
		event.preventDefault();
		
		if(leftArrowState == 0) {
			leftArrowState = 1;
			window.clearInterval(slideTimer);
	
			currentPosition--;
			var newLeftIndent = defaultLeftIndent + (itemWidth * currentPosition * -1);
	/*
			console.log(currentPosition);
			console.log(newLeftIndent);
	*/
			
			$(bannerWrapper).animate({
				'left':newLeftIndent
			}, {
				duration: 1000,
				queue: false,
				complete: function() {
					leftArrowState = 0;
					if(currentPosition == 0 || currentPosition < 1) {
						currentPosition = totalItem - 2;
						$(bannerWrapper).css({'left': defaultLeftIndent + (itemWidth * currentPosition * -1)});
					}
					slideTimer = setInterval(slideAutoPlay, 5000);
					
					if(isResized == 1) {
						var newLeftIndent = defaultLeftIndent + (itemWidth * currentPosition * -1)
						$(bannerWrapper).css({'left': newLeftIndent});
						isResized = 0;
					}
				}
			});
		}
	});
	
	// Nhấn nút right
	var rightArrowState = 0;
	$('#banner .banner-wrapper .arrow-wrapper .right-arrow').click(function(event){
		event.preventDefault();
		
		if(rightArrowState == 0) {
			rightArrowState = 1;
			window.clearInterval(slideTimer);
	
			currentPosition++;
			var newLeftIndent = defaultLeftIndent + (itemWidth * currentPosition * -1);
	/*
			console.log(currentPosition);
			console.log(newLeftIndent);
	*/
			
			$(bannerWrapper).animate({
				'left':newLeftIndent
			}, {
				duration: 1000,
				queue: false,
				complete: function() {
					rightArrowState = 0;
					if(currentPosition == totalItem-1 || currentPosition > totalItem-2) {
						currentPosition = 1;
						$(bannerWrapper).css({'left': defaultLeftIndent + (itemWidth * currentPosition * -1)});
					}
					slideTimer = setInterval(slideAutoPlay, 5000);
					
					if(isResized == 1) {
						var newLeftIndent = defaultLeftIndent + (itemWidth * currentPosition * -1)
						$(bannerWrapper).css({'left': newLeftIndent});
						isResized = 0;
					}
				}
			});
		}
	});
	
	// Resize trình duyệt, dành cho responsive, nhưng browser vẫn bị quirky ở chỗ hiện scrollbar nhưng vẫn không tính vào \
	// viewport width, dẫn đến viewport width bị lệnh một khoảng bằng width của scrollbar. Chưa tìm ra giải pháp!
	$(window).resize(function(){
		// Check viewport's width
		var viewportWidth = $(window).width();
		
		if(viewportWidth >= 1160) { // If viewport is larger than 1160
			if (latestWindowWidth < 1160) { // And latest viewport's width is SMALLER than 1160
				console.log('is SMALLER than 1160');
			
				defaultLeftIndent = 95;
				isResized = 1;

				var newLeftIndent = defaultLeftIndent + (itemWidth * currentPosition * -1)
				$(bannerWrapper).css({'left': newLeftIndent});
				latestWindowWidth = viewportWidth; // update latest viewport width by current viewport's width
			}
		} else { // If viewport is SMALLER than 1160
			if (latestWindowWidth >= 1160) { // And latest viewport's width is LARGER than or EQUAL with 1159
				console.log('is LARGER than or EQUAL with 1159');
				
				defaultLeftIndent = 0;
				isResized = 1;

				var newLeftIndent = defaultLeftIndent + (itemWidth * currentPosition * -1)
				$(bannerWrapper).css({'left': newLeftIndent});
				latestWindowWidth = viewportWidth; // update latest viewport width by current viewport's width
			}
		}
	});
	
	// Auto play
	var slideAutoPlay = function() {
		$('#banner .banner-wrapper .arrow-wrapper .right-arrow').trigger('click');
	}
	slideTimer = setInterval(slideAutoPlay, 5000);
});