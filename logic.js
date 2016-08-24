
var allBtns = ['lions','tigers','bears'];
var btnClass = ['primary', 'success','default','warning','link','danger','info'];


			

function printBtns (){
		
	for (var j = 0; j < allBtns.length; j++){
					
		var newBtn = $('<button data-add="'+ allBtns[j] +'"class="btn btn-lg btn-'+ btnClass[j%7] +'">').text(allBtns[j]);
					
		$('#buttons').append(newBtn);
	}
}

$(document).ready(function(){

	// print the buttons
	printBtns();


	// get gifs when you click button
	$('button').on('click', function(){

		var clickBtn = $(this).data('add');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickBtn + "&api_key=dc6zaTOxFJmzC&limit=10";

		console.log(clickBtn);

		$.ajax({url: queryURL, method: 'GET'})
	        .done(function(response) {
	        	var daGifs = response.data;
				
				for (var j = 0; j < daGifs.length; j++){
					var movieDiv = $('<div>');
	                var p = $('<p>').html(daGifs[j].rating);

	                var movieGif = $('<img class="images">');
	                movieGif.attr('src', daGifs[j].images.fixed_height_still.url);
	                movieGif.attr('data-action', daGifs[j].images.fixed_height.url);
	                movieGif.attr('data-still', daGifs[j].images.fixed_height_still.url);
	                movieGif.attr('data-state','action');

	                $(movieDiv).append(p);
	                $(movieDiv).append(movieGif);

	                $('#gifs').prepend(movieDiv);
				}

	         });

	})


});

// turn on/off gif
$(document).on('click', '.images', function(){
		
	var state = $(this).data('state'); 
	console.log(state);
	console.log(this);

	if (state === 'still'){
        $(this).attr('src', $(this).data('action'));
        $(this).data("state", "action");
        console.log($(this).data('state'))

    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).data("state","still");
        console.log($(this).data('state'))

    }
});

