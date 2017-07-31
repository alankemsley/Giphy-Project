$( document ).ready(function() {

  var recentsArray = [];
  var herosArray = [
    "luke skywalker",
    "princess leia",
    "leia organa",
    "han solo",
    "obi-wan kenobi",
    "obi wan kenobi",
    "obiwan kenobi",
    "ben kenobi",
    "chewbacca",
    "chewie",
    "c3po",
    "c-3po",
    "r2-d2",
    "r2d2",
    "yoda",
    "lando calrissian",
    "rey",
    "po dameron",
    "finn",
    "quai-gon jin",
    "padme amidala",
    "queen amidala",
    "anakin skywalker",
    "mace windu",
    "mon mothma",
    "admiral ackbar",
  ];

  //GIF SEARCH INPUT
  $("#gif-input").on("keyup", function (){
    if ($("#gif-input").val().length > 0) {
      $(".buttonDisabled").attr("disabled", false);
    }
  });

  //GIF SEARCH BUTTON-CLICK
  $("#gif-search").on("click", function(event)  {
    //if (($("#gif-input").val()).toLowerCase() === herosArray.) {
    if ($.inArray(($("#gif-input").val()).toLowerCase(), herosArray) !== -1)  {
      event.preventDefault();
    	var searchTerm = $("#gif-input").val();
    	var apiKey = "de2a630887f841daa7108fc41b93e1c0";
    	var protocol = "https://";
    	var domain = "api.giphy.com";
    	var path = "/v1/gifs/search";
    	var url = protocol + domain + path + "?" + "q=" + searchTerm + "&api_key=" + apiKey;

      $("#recents-title").css("visibility", "visible");
      $("#recents-row").css("background-color", "#BAC0C6");
      $("#results-row").css("background-color", "#E8EAEC");
      recentsArray.push(searchTerm);
      $("#recents-buttons").append("<li class='button'>" + recentsArray[recentsArray.length-1] + "</li>");

    	$.ajax({
  		  url: url,
  		  method: "GET"
        }).done(function(response) {
        	prependGifs(response);
      });
    } else {
      alert("That is not a main Star Wars hero!");
    }
  });

  //CLICKING ON RECENT SEARCHES
  $("#recents-buttons").on("click", "li", function(event) {
    event.preventDefault();
  	var searchTerm = $(this).text();
  	var apiKey = "de2a630887f841daa7108fc41b93e1c0";
  	var protocol = "https://";
  	var domain = "api.giphy.com";
  	var path = "/v1/gifs/search";
  	var url = protocol + domain + path + "?" + "q=" + searchTerm + "&api_key=" + apiKey;

  	$.ajax({
		  url: url,
		  method: "GET"
      }).done(function(response) {
      	prependGifs(response);
    });

  });

  //GETTING GIF SEARACH RESULTS
  function prependGifs(response) {
  	var gifs = response.data;
      for(var i=0; i < gifs.length; i++) {
        var img = gifs[i].images.preview_gif.url;
      	 $("#gif-results").prepend("<li><img src='" + img + "'></img></li>");
       }
  }

});
