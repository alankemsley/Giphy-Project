$( document ).ready(function() {

  $('#add').on('click', function(event) {
  	event.preventDefault();

  	var searchTerm = $('#input').val();
  	var apiKey = "de2a630887f841daa7108fc41b93e1c0";
  	var protocol = "https://";
  	var domain = "api.giphy.com";
  	var path = "/v1/gifs/search";
  	var url = protocol + domain + path + "?" + "q=" + searchTerm + "&api_key=" + apiKey;

  	$.ajax({
		  url: url,
		  method: "GET"
      }).done(function(response) {
      	appendGifs(response);
      });
  });

  function appendGifs(response) {
  	var gifs = response.data;
      for(var i=0; i < gifs.length; i++) {
        var img = gifs[i].images.preview_gif.url;
      	 $("#gif-results").append("<li><img src='" + img + "'></img></li>");
       }
  }




});
