var recipies = [{'name': 'PB&J', 'ingredients': ['Bread', 'Jam', 'Peanut Butter']}]

var Recipies = React.createClass({
  render: function() {
    {this.props.dishes.map(function(dish) {
      <div>{dish.name}</div>
    })}
  }
});

var IngredientList = React.createClass({
  setInitialState: function() {
    return {}
  },
  render: function() {

    return (<div>
      <ul>
      {this.props.dish.map(function(ingredient, key) {
        return <div key={key}>
        <h3 key={key}>{ingredient.name}</h3>
        {ingredient.ingredients.map(function(item, key) {
          return <li key={key}>{item}</li>
        })}
        </div>
      })}
      </ul>
      </div>)
  }
});



ReactDOM.render(<IngredientList dish={recipies}/>, document.getElementById('output'));
