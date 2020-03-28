$(document).ready(function() {
  // Get references to page elements
  var author = $("#author");
  var reviewText = $("#reviewText");
  var submitBtn = $("#submitReview");
  var rating = $("#rating");
  var reviewList = $("#reviews");
  var gameInfo = {};
  // Add event listeners to the submit and delete buttons
  var gameInfo = {};
  var gameDataId;

<<<<<<< HEAD
  // var handleFormSubmit = function (event) {
  //   event.preventDefault();
  //   console.log("Work plz?");
  //   var gameInfo = {
  //     author: author.val().trim(),
  //     game: 2454,
  //     text: reviewText.val().trim(),
  //     rating: rating.val()
  //   };

  //   if (!(author && reviewText && rating)) {
  //     alert("You must enter an example text and description!");
  //     return;
  //   }
  //   console.log(gameInfo);
  //   API.postReview(gameInfo).then(function () {
  //     refreshReviews();
  //   });
  //   console.log(gameInfo);
  //   author.val("");
  //   reviewText.val("");
  //   rating.val("");
  // };
=======
  var handleFormSubmit = function (event) {
    event.preventDefault();
    console.log("Work plz?");
    gameInfo = {
      author: author.val().trim(),
      game: $("#apiNum").data("id"),
      text: reviewText.val().trim(),
      rating: rating.val()
    };

    if (!(author && reviewText && rating)) {
      alert("You must enter an example text and description!");
      return;
    }
    console.log(gameInfo);
    API.postReview(gameInfo).then(function () {
      // refreshReviews();
      console.log("Done");
    });
    console.log(gameInfo);
    author.val("");
    reviewText.val("");
    rating.val("default");
  };
>>>>>>> fd84d2c4e4be8d5ff6eea514aae260aacb2258d4

  // submitBtn.on("click", handleFormSubmit);
  // $deleteBtn.on("click", "button.delete", handleDeleteBtnClick);

  // The API object contains methods for each kind of request we'll make
  var API = {
    postReview: function (gameInfo) {
      console.log("Hello!");
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/review",
        data: JSON.stringify(gameInfo)
      });
    },
    getReview: function () {
      return $.ajax({
        url: "api/review",
        type: "GET"
      });
    },
    deleteReview: function (id) {
      return $.ajax({
        url: "api/review/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshReviews = function () {
    API.getReview().then(function (data) {
      var reviews = data.map(function (review) {
        var gameID = $(("#search").val().join().toLowerCase());
        var $a = $("<a>")
          .text(review.text)
          .attr("href", "/models/review/" + dbReview)

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": review.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      reviewList.empty();
      reviewList.append(reviews);
    });
  };
  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list


  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteReview(idToDelete).then(function () {
      refreshReviews();
    });
  };
  // Get references to page elements
  var $submit = $("#submit");
  var $results = $("#resultBox");
  var $gameInfo = $("#gameInfo");

  $("#submit").on("click", function () {
    event.preventDefault();
    $results.empty();
    console.log("searching for game...");
    console.log($("#game-input").val());
    //take in game search and change to lower case and replace spaces with '-'
    var gameSearch = $("#game-input").val()
    gameSearch = gameSearch.toLowerCase();
    gameSearch = gameSearch.replace(/[^a-zA-Z0-9 ]+/g, "");
    gameSearch = gameSearch.replace(/\s+/g, "-");

    var API_URL = "https://api.rawg.io/api/games/" + gameSearch;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": API_URL,
      "method": "GET",
    };
    console.log(API_URL);
    $.ajax(settings).done(function (response) {
      console.log(response);
      console.log(response.name);
      var newResult = $("<div>");
      var gameName = $("<a>");
      gameName.text(response.name);
      gameName.attr("href", "/game/" + response.id);
      gameName.attr("data-id", response.id);
      gameName.attr("id", "apiNum");
      newResult.append(gameName);
      var gameDescription = $("<p>");
      gameDescription.append(response.description);
      newResult.append(gameDescription);
      $results.append(newResult);
    });

  });

  var clickSearch = [];
  var counter = 0;

  var loadReview = function(){
    $("#reviewCards").empty();

    $.get("/api/review/" + clickSearch[counter - 1], function(data){
      console.log(data);
      for (var i = 0; i < data.length; i++){
        var newResult = $("<div>");
        newResult.attr("class", "reviewCards");
        var gameName = $("<h6>");
        gameName.html("<strong>Author:</strong> " + data[i].author + " <span><strong>Rating:</strong> " + data[i].rating + "</span><hr>");
        gameName.attr("class", "reviewAuthor");
        newResult.append(gameName);
        var gameDescription = $("<p>");
        gameDescription.append(data[i].text);
        newResult.append(gameDescription);
        $("#reviewCards").append(newResult);
      }
    });
  };

  $(document).on("click", "#apiNum", function() {
    event.preventDefault();
    counter++;
    var ewanMcGregor = $(this).data("id");
    console.log(ewanMcGregor);
    clickSearch.push(ewanMcGregor);
    console.log(clickSearch);
    var API_URL = "https://api.rawg.io/api/games/" + clickSearch[counter - 1];
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": API_URL,
      "method": "GET",
    };
    console.log(API_URL);
    $.ajax(settings).done(function(response) {
      $("#gameTitle").empty();
      $("#gameSummary").empty();
      $("#gameImage").empty();
      $("#gameImage").html("<img src='" + response.background_image +"' alt='game image' id='gameImageUrl'>")
      $("#gameTitle").text(response.name);
      $("#gameSummary").html(response.description);
    });

    loadReview();
  });

  var handleFormSubmit = function(event) {
    event.preventDefault();
    console.log(clickSearch);
    console.log("Work plz?");
    var gameInfo = {
      author: author.val().trim(),
      game: parseInt(clickSearch[counter - 1]),
      text: reviewText.val().trim(),
      rating: rating.val()
    };

    if (!(author && reviewText && rating)) {
      alert("You must enter an example text and description!");
      return;
    }
    console.log(gameInfo);
    API.postReview(gameInfo).then(function () {
      loadReview();
    });
    console.log(gameInfo);
    author.val("");
    reviewText.val("");
    rating.val("");
  };

  submitBtn.on("click", handleFormSubmit);
});
