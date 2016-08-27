
var allBtns = ['ice cream','pizza','cake'];
var btnClass = ['success', 'warning','danger','info','primary','default'];


			

function printBtns (){
	
	$('#buttons').empty();

	for (var j = 0; j < allBtns.length; j++){
					
		var newBtn = $('<button data-add="'+ allBtns[j] +'"class="food btn btn-lg btn-'+ btnClass[j%6] +'">').text(allBtns[j]);
					
		$('#buttons').append(newBtn);
	}
}

$(document).ready(function(){

	// print the buttons
	printBtns();

});

$(document).on('click', '.food', function(){

	$("#gifs").empty();

	var clickBtn = $(this).data('add');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickBtn + "&api_key=dc6zaTOxFJmzC&limit=10";

	console.log(clickBtn);

	$.ajax({url: queryURL, method: 'GET'})
	    .done(function(response) {
	        var daGifs = response.data;
				
			for (var j = 0; j < daGifs.length; j++){
				var foodDiv = $('<div class = "well">');
	            var p = $('<p>').html(daGifs[j].rating);
	            p.prepend('Rating: ');

	            var foodGif = $('<img class="images">');
	            foodGif.attr('src', daGifs[j].images.fixed_height_still.url);
	            foodGif.attr('data-action', daGifs[j].images.fixed_height.url);
	            foodGif.attr('data-still', daGifs[j].images.fixed_height_still.url);
	            foodGif.attr('data-state','still');

	            
	            $(foodDiv).append(foodGif);
	            $(foodDiv).append(p);

	            $('#gifs').prepend(foodDiv);
			}

	    });

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

// Add a button 

$(document).on('click', '#submit', function(){

	var input = $('#inputSuccess').val().trim();
	console.log(input)

	allBtns.push(input);
	console.log(allBtns)

	printBtns();

	// return false;
});











