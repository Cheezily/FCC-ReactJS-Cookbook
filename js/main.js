localStorage.removeItem('_cheezily_recipes');
$('input').val('');

if (localStorage['_cheezily_recipes']) {
  console.log('local storage used');
  var recipes = JSON.parse(localStorage.getItem('_cheezily_recipes'));
} else {
  console.log('STORAGE SET');
  var recipes = [
    {"name": "PB&J", "ingredients": ["Bread", "Jam", "Peanut Butter"]},
    {"name": "Salad", "ingredients": ["Spinach", "Croutons", "Cheese", "More Cheese"]},
    {"name": "Big Mac", "ingredients": ["Bun", "Horse", "Pickles", "Spiders", "Cheese", "Soap"]}
  ];
  localStorage.setItem('_cheezily_recipes', JSON.stringify(recipes));
}

//grab the first recipe to display
var firstRecipie = recipes[0];
console.log('first ' + firstRecipie['name']);


var Dishes = React.createClass({
  setInitialState: function() {
    return {}
  },
  render: function() {

    //makes sure there are enough items to display to overfill
    //the list so the scroll effect is shown. Doing it here prevents the
    //fake items from being added to the user's local storage
    var outputList = [];

    if (outputList.length < 7) {
      var numDishes = 7;
    } else {
      numDishes = outputList.length;
    }

    for (var i = 0; i < numDishes; i++) {
      outputList.push(this.props.dishes[i] || {"name": "Add Item", "ingredients": []})
      //console.log("PUSHED: " + (this.props.dishes[i]));
    }

    return (
      <div className='recipeList'>
      {outputList.map(function(dish, key) {
        return <div className='dish' key={key}>{dish.name}</div>
      })}
      </div>
    )

  }
});


var IngredientList = React.createClass({
  setInitialState: function() {
    return {}
  },
  render: function() {

    return (
      <div className='ingredientList'>
          <h2>{this.props.dish.name}</h2>
          {this.props.dish.ingredients.map(function(item, key) {
            return <li key={key}>{item}</li>
          })}

      </div>)
    }
  });

// first set of information to render
ReactDOM.render(<IngredientList dish={firstRecipie}/>, document.getElementById('ingredients'));
ReactDOM.render(<Dishes dishes={recipes}/>, document.getElementById('dishes'));
setActive(firstRecipie.name);


$('.addPlus').click(function() {

  var addedInputCount = $('.addedToList').length / 2;

  var html = "<label class='addedToList' for='i" + (addedInputCount + 3) + "'>Ingredient " +
    (addedInputCount + 3) + "</label>" +
    "<input id='i" + (addedInputCount + 3) + "' class='ingredientInput addedToList' type='text' placeholder='Ingredient...'>" +
    "<div class='clear'></div>";

  $('.addIngredients').append(html);

});


$('.cancelDish').click(function() {

  $(".outputContainer").animate({"opacity": "1"}, 400);
  $(".newItem").fadeOut(400, function() {
    $('.addedToList').remove();
    $('.error').text('');
    $('input').val('');
  });
});


$('.submitDish').click(function() {

  var filledOut = true;
  $('input').each(function() {
    if ($(this).val() == '') {
      filledOut = false;
      $('.error').text('Please complete all fields');
    }
  })

  if (filledOut) {
    var newDish = {"name": "", "ingredients": []};

    newDish.name = $('#newName').val();

    $('.ingredientInput').each(function() {
      newDish.ingredients.push($(this).val());
    })

    recipes.push(newDish);
    localStorage.setItem('_cheezily_recipes', JSON.stringify(recipes));

    ReactDOM.render(<Dishes dishes={recipes}/>, document.getElementById('dishes'));
    ReactDOM.render(<IngredientList dish={newDish}/>, document.getElementById('ingredients'));
    setActive(newDish.name);
    console.log(newDish.name);

    $(".outputContainer").animate({"opacity": "1"}, 400);
    $(".newItem").fadeOut(400, function() {
      $('.addedToList').remove();
      $('.error').text('');
      $('input').val('');
    });

    $('input').val('');

  }
})


$('.dish').click(function() {
  var dishName = $(this).text();
  console.log("DISH: " + dishName);
  for (var dish in recipes) {
    if (recipes[dish].name == dishName) {
      ReactDOM.render(<IngredientList dish={recipes[dish]}/>, document.getElementById('ingredients'));
      setActive(recipes[dish].name);
    }
  }
})


$('.addNew').click(function() {
  $(".outputContainer").animate({"opacity": ".3"}, 400);
  $(".newItem").fadeIn(400);
})


function setActive(dish) {

  $('.active').remove();

  $('.dish').each(function() {
    if ($(this).text() == dish) {
      $(this).before('<div class="active"></div>');
    }
  })
}
