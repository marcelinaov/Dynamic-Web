$(document).ready(function(){
    //array for topics
    var animal = ["cats", "dogs", "goats",
    "pigs", "rabbits", "ducks", "cows", "horses",
    "sheeps", "bear"];
     //function to re-renders the HTML to display the content
    function displayAnimalShow() {
        console.log()

        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=cute+"+animal+"&api_key=uwry9hLeLN8RzNexcujCokKyltKhLgsp&limit=10";
            console.log(queryURL);

            //ajax call for the specific animal button
            $.ajax({
                url: queryURL,
                method: "GET"
              }).done(function(response){
                $("#giphyview").empty();
      
                var results = response.data;
      
                // retrieves the Rating Data
                console.log(response);
      
                // Loops the animals for a limit of  10
                for(var i = 0; i < results.length; i++) {
      
                  // creates a div to hold the animal gifs
                  var animalDiv = $("<div>");
      
                  // make a class for style.css
                  animalDiv.addClass("animalpictures");
      
                  // creates an element for rating to be displayed
                  var rating = results[i].rating;
                  var p = $("<h2>").text("Rating: " + rating);
      
                  // the Images can still or animate to call the class "animeImage" for click.
                  var animalImage = $("<img>");
                  animalImage.attr("src", results[i].images.fixed_height_still.url);
                  animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                  animalImage.attr("data-animate", results[i].images.fixed_height.url);
                  animalImage.attr("data-state", "still");
                  animalImage.addClass('animalImage');
      
                  // Displays the rating
                  animalDiv.prepend(p);
      
                  // Displays the animal Image
                  animalDiv.prepend(animalImage);
                  $("#giphyview").prepend(animalDiv);
                }
      
        
              });        
            }
      
            // function for displaying animal data
            function renderButtons() {
              
      
              // Deletes the images prior to adding new images
    
              $("#animalbuttons").empty();
      
              for(var i = 0; i < animal.length; i++) {
      
                // then buttons were generated for each topic on the array
               
                var animalAdd = $("<button>");
                console.log(animalAdd);
                // adds a class of animal to our button
                animalAdd.addClass("animal");
      
                // added a data-attribute
                animalAdd.attr("data-animal", animal[i]);
      
                // provided the initial button text
                animalAdd.text(animal[i]);
      
                // added the button to the buttons-view div
                $("#animalbuttons").append(animalAdd);
              }
            }
      
            // this function handles events where the add animal button is clicked
            $("#add-animal").on("click", function(event){
              
              event.preventDefault();
          
              // this line of code will grab the input from the textbox
              var animalInput = $(".animal-input").val().trim();
      
              // the animal from the textbox is added to our array
              animal.push(animalInput);
      
              // calling renderButtons which handles the processing of our animal array
              renderButtons();
            });

            //if the variable state is equal to 'still',
              // then update the src attribute of this image to it's data-animate value,
              // and update the data-state attribute to 'animate'.
              // If state does not equal 'still', then update the src attribute of this
              // image to it's data-animate value and update the data-state attribute to 'still'

            $("#giphyview").on("click", ".animalImage" ,function() {
              var state = $(this).attr("data-state");
              console.log(state);
  
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
            // adding click event listeners to all elements with a class of "animal"
            $(document).on("click", ".animal", displayAnimalShow);
      
            // calling the renderButtons function to display the intial buttons
            renderButtons();
      });