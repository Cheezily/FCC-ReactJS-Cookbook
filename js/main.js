//localStorage.removeItem('_cheezily_recipes');

if (localStorage['_cheezily_recipes']) {
  console.log('local storage used');
  var recipes = JSON.parse(localStorage.getItem('_cheezily_recipes'));
} else {
  console.log('STORAGE SET');
  var recipes = [
    {"name": "PB&J", "ingredients": ["Bread", "Jam", "Peanut Butter"]},
    {"name": "Salad", "ingredients": ["Spinach", "Croutons", "Cheese", "More Cheese"]},
    {"name": "Cheeseburger", "ingredients": ["Bun", "Burger Meat", "Cheese", "More Cheese", "Lettuce", "Mayo"]}
  ];
  localStorage.setItem('_cheezily_recipes', JSON.stringify(recipes));
}


var firstRecipie = recipes[0];
console.log('first ' + firstRecipie['name']);


var Dishes = React.createClass({
  setInitialState: function() {
    return {}
  },
  render: function() {

    if (this.props.dishes.length < 7) {
      while (this.props.dishes.length < 7) {
        this.props.dishes.push({"name": "Add Item", "ingredients": []});
      }
    }

    return (
      <div className='recipeList'>
      {this.props.dishes.map(function(dish, key) {
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
          <h3>{this.props.dish.name}</h3>
          {this.props.dish.ingredients.map(function(item, key) {
            return <li key={key}>{item}</li>
          })}

      </div>)
    }
  });



ReactDOM.render(<IngredientList dish={firstRecipie}/>, document.getElementById('ingredients'));
ReactDOM.render(<Dishes dishes={recipes}/>, document.getElementById('dishes'));
