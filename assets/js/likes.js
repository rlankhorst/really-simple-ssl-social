jQuery(document).ready(function($) {
	 'use strict';

$(document).on('click', '.post-share', function(e){
	var counter = $(this).find('span').html();
	if (counter.indexOf('k')>=0 || counter.indexOf('m')>=0) {
		return;
	}

	if (counter=='') counter=0;
	counter++;
	$(this).find('span').html(counter);

	//now, clear the share cache for this url
	var post_id = $(this).closest('.rsssl_soc').data('rsssl_post_id');
	$.ajax({
			type: "GET",
			url: rsssl_soc_ajax.ajaxurl,
			dataType: 'json',
			data: ({
				action: 'rsssl_clear_likes',
				post_id: post_id,
			}),
			success: function(data){
			}
	});
});


function rsssl_soc_get_likes(){
  var data;
	if (rsssl_soc_ajax.use_cache) return;

  $(".rsssl_soc").each(function(i, obj) {
		var post_id = $(this).data('rsssl_post_id');
		var button_container = $('[data-rsssl_post_id="'+post_id+'"]');
		$.ajax({
        type: "GET",
        url: rsssl_soc_ajax.ajaxurl,
        dataType: 'json',
        data: ({
          action: 'rsssl_get_likes',
          post_id: post_id,
        }),
        success: function(data){
					button_container.find('a.post-share.rsssl-twitter span').html(data.twitter);
          button_container.find('a.post-share.rsssl-facebook span').html(data.facebook);
          button_container.find('a.post-share.rsssl-gplus span').html(data.gplus);
          button_container.find('a.post-share.rsssl-stumble span').html(data.stumble);
					button_container.find('a.post-share.rsssl-linkedin span').html(data.linkedin);
					button_container.find('a.post-share.rsssl-pinterest span').html(data.pinterest);
        }
    });
  });
}

	rsssl_soc_get_likes();
});
