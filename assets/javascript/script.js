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
  ];

  //GIF SEARCH INPUT
  $("#gif-input").on("keyup", function (){
    if ($("#gif-input").val().length > 0) {
      $(".buttonDisabled").attr("disabled", false);
    }
  });

  //GIF SEARCH BUTTON-CLICK
  $("#gif-search").on("click", function(event)  {
    if ($.inArray(($("#gif-input").val()).toLowerCase(), herosArray) !== -1)  {
      event.preventDefault();
      $("#gif-results").children("div").remove();
    	var protocol = "https://";
    	var domain = "api.giphy.com";
    	var path = "/v1/gifs/search";
      var searchTerm = $("#gif-input").val();
      var apiKey = "de2a630887f841daa7108fc41b93e1c0";
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
        	appendGifs(response);
      });
    } else if (($("#gif-input").val()).toLowerCase() === "jar jar binks") {
        alert("No. Just... No.");
    } else {
        alert("That is not a main Star Wars hero!");
    }
  });

  //CLICKING ON RECENT SEARCHES
  $("#recents-buttons").on("click", "li", function(event) {
    event.preventDefault();
    $("#gif-results").children("div").remove();
  	var protocol = "https://";
  	var domain = "api.giphy.com";
  	var path = "/v1/gifs/search";
    var searchTerm = $(this).text();
    var apiKey = "de2a630887f841daa7108fc41b93e1c0";
  	var url = protocol + domain + path + "?" + "q=" + searchTerm + "&api_key=" + apiKey;

  	$.ajax({
		  url: url,
		  method: "GET"
      }).done(function(response) {
      	appendGifs(response);
    });

  });

  //GETTING GIF SEARACH RESULTS
  function appendGifs(response) {
  	var gifs = response.data;
    for(var i=0; i < 10; i++) {
      var img = gifs[i].images.original_still.url;
      $("#gif-results").append("<div class='gif-div'><li><img src='" + img + "'></li>" + "<p>Rated " + (gifs[i].rating).toUpperCase() + "</p>");
    }
  };









});
