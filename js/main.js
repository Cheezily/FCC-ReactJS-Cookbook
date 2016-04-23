//localStorage.removeItem('_cheezily_recipes');
$('input').val('');

if (localStorage['_cheezily_recipes']) {
  console.log('local storage used');
  var recipes = JSON.parse(localStorage.getItem('_cheezily_recipes'));
} else {
  console.log('STORAGE SET');
  var recipes = [
    {"name": "PB&J", "ingredients": ["Bread", "Jam", "Peanut Butter"]},
    {"name": "Salad", "ingredients": ["Spinach", "Croutons", "Cheese", "Tomatoes"]},
    {"name": "Big Mac", "ingredients": ["Bun", "Horse meat", "Pickles", "Spiders", "Cheese", "Soap"]}
  ];
  localStorage.setItem('_cheezily_recipes', JSON.stringify(recipes));
}

//grab the first recipe to display
var firstRecipe = recipes[0];


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


var EditList = React.createClass({
  setInitialState: function() {
    return {}
  },
  render: function() {

    var items = this.props.dish;

    return (
      <div className='editItemContainer'>
          <h2>{items.name}</h2>
          {items.ingredients.map(function(item, key) {
            var removeID = "-" + item;
            return (
              <div>
              <div className="editLabel">Edit/Remove: </div>
              <input id="edit{item}" className="editItem" type="text" defaultValue={item} placeholder={item} />
              <span onClick={removeItem.bind(this, item, items)} className='removeMinus'>-</span>
              <div className='clear'></div>
              </div>
            )
          })}
          <span className='error'></span><div onClick={addEditLine.bind(this, items)} className='editAddPlus'>+</div>
          <div className='clear'></div>
          <button className='cancelEdit'>Cancel</button>
          <button onClick={submitEdit.bind(this, items)} className='submitEdit'>Save!</button><div className='clear'></div>

      </div>)
    }
});

function clickedFunc(i, props) {
  console.log("you clicked " + props);
}

// first set of information to render
ReactDOM.render(<IngredientList dish={firstRecipe}/>, document.getElementById('ingredients'));
ReactDOM.render(<Dishes dishes={recipes}/>, document.getElementById('dishes'));
ReactDOM.render(<EditList dish={firstRecipe}/>, document.getElementById('test'));
setActive(firstRecipe.name);



//*********************************************
//*********code for the new dish section*******
//*********************************************
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
  $('.newItem input').each(function() {
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
  //console.log("DISH: " + dishName);
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



//*********************************************
//***********code for the edit section*********
//*********************************************
function removeItem(item, props) {

  var ingList = [];

  //copy the list
  for (var i in props.ingredients) {
    ingList.push(props.ingredients[i]);
  }

  //remove the passed item from the copied list that will
  //be passed back into React
  for (var ingredient in ingList) {
    if (item == ingList[ingredient]) {
      ingList.splice(ingredient, 1);
      break;
    }
  }

  var passed = {"name": props.name, "ingredients": ingList};
  ReactDOM.render(<EditList dish={passed}/>, document.getElementById('test'));
}


function addEditLine(props) {
  console.log(props);

  var ingList = [];

  //copy the list
  for (var i in props.ingredients) {
    ingList.push(props.ingredients[i]);
  }

  //add blank item
  if (ingList[ingList.length - 1] != "") {
    ingList.push("");
  }

  var passed = {"name": props.name, "ingredients": ingList};
  ReactDOM.render(<EditList dish={passed}/>, document.getElementById('test'));
}


$('.cancelEdit').click(function() {
  console.log('CANCEL HIT');
  $(".outputContainer").animate({"opacity": "1"}, 400);
  $('.editItemContainer').fadeOut(400, function() {
    $('.editItem').val('');
    $('.test').empty();
  });
})


function submitEdit(props) {

  var ingList = [];
  var listItems = [];
  var finalList = [];

  $('.editItemContainer input').each(function() {
    listItems.push($(this).val());
  })

  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i] != "") {
      finalList.push(listItems[i]);
    } else {
      finalList.push(props.ingredients[i]);
    }
  }

  var finalObject = {"name": props.name, "ingredients": finalList};

  console.log("finalName: " + finalObject.name);
  console.log("finalList: " + finalObject.ingredients);

  for (var i = 0; i < recipes.length; i++) {
    if (finalObject.name == recipes[i].name) {
      recipes[i] = finalObject;
    }
  }

  localStorage.setItem('_cheezily_recipes', JSON.stringify(recipes));

  ReactDOM.render(<IngredientList dish={finalObject}/>, document.getElementById('ingredients'));
  setActive(finalObject.name);

  $(".outputContainer").animate({"opacity": "1"}, 400);
  $(".editItemContainer").fadeOut(400);
}


$('.edit').click(function() {
  $(".test").empty();

  var currentDish = $('.ingredients h2').text();

  for (var i = 0; i < recipes.length; i++) {
    if (recipes[i].name == currentDish) {
      ReactDOM.render(<EditList dish={recipes[i]}/>, document.getElementById('test'));
    }
  }
  $('input').val('');

  $(".outputContainer").animate({"opacity": ".3"}, 400);
  $(".editItemContainer").fadeIn(400);
})


function setActive(dish) {

  $('.active').remove();

  $('.dish').each(function() {
    if ($(this).text() == dish) {
      $(this).before('<div class="active"></div>');
    }
  })
}
