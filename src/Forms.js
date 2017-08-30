let React=require('react');
require('./App.css');


class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      recipeName:'',
      recipeIngredients:''
    }
    this.handleName=this.handleName.bind(this);
    this.handleIngredients=this.handleIngredients.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleName(event) {
    event.preventDefault();
    let Name=event.target.value;
    this.setState(function() {
      return {
        recipeName:Name
      }
    })

  }

  handleIngredients(event) {
    event.preventDefault();
    let Ingredients=event.target.value;
    this.setState(function() {
      return {
        recipeIngredients:Ingredients
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.getData(
      this.state.recipeName,
      this.state.recipeIngredients
    )

    this.setState(function() {
      return {
        recipeName:'',
        recipeIngredients:''
      }
    }) 
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      
        <label>
          Name:
          <input type='text' name='recipeName' placeholder='Enter the recipe name' value={this.props.rname} onChange={this.handleName}/>
        </label>
        <label>
          Ingredients:
          <input type='text' name='recipeIngredients' placeholder='Enter the ingredients' value={this.state.recipeIngredients} onChange={this.handleIngredients}/>
        </label>
        <button type="submit" >submit</button>
      </form>
    )
  }
}

module.exports= Forms;