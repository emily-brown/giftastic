// Create initial show array 
let shows = ["The Office", "Parks and Recreation", "Arrested Development", "Community"];

// Function to display shows and re-loads the HTML to display the correct content
function displayShows() {
    let show = $(this).attr("show-name");
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=nugr7GYR4VLjwLgNMFQPJs6BBgxTVnoP&limit=9";

    // AJAX call for the specific show button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL)

        console.log(response)

        let results = response.data;

        $("#showView").empty();

        for (let i = 0; i < results.length; i++) {
            let showDiv = $("<div>");
            let p = $("<p>").text("Rating: " + results[i].rating);
            let showImg = $("<img>");

            showImg.attr("src", results[i].images.original_still.url);
            showImg.attr("data-still", results[i].images.original_still.url);
            showImg.attr("data-animate", results[i].images.original.url);
            showImg.attr("data-state", "still");
            showImg.attr("class", "gif");
            showDiv.append(p);
            showDiv.append(showImg);
            $("#showView").append(showDiv);
            
        }

    });
}

// Function for dispalying movie data 

function renderButtons() {

    $("#buttonsView").empty();

    for (let i = 0; i < shows.length; i++) {

        let a = $("<button>");

        a.addClass("show-btn");

        a.attr("show-name", shows[i]);

        a.text(shows[i]);

        $("#buttonsView").append(a);
    }
}

// Function for when the buttons are clicked 

$("#addShow").on("click", function (event) {

    event.preventDefault();

    let show = $("#showInput").val().trim();

    shows.push(show);

    renderButtons();
});

// Function to animate gifs once clicked

$("#showView").on("click", ".gif", function () {

    console.log("clicked!")
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    let state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".show-btn", displayShows);

renderButtons();