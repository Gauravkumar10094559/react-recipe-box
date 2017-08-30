let React=require('react');
let Forms=require('./Forms');
require('./App.css');


class RecipeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      info:sessionStorage,
      formvisibility:false,
      name:'',
      ingredients:''
    }
      this.handleClick=this.handleClick.bind(this);
      this.deleteAll=this.deleteAll.bind(this);
      this.handleUpdate=this.handleUpdate.bind(this);

      this.entrydelete=this.entrydelete.bind(this);
      this.edit=this.edit.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleUpdate() {
    this.setState(function() {
      return {
        info:sessionStorage
      }
    })
  }

  deleteAll() {
    sessionStorage.clear();
    this.setState(function() {
      return{
        info:{}
      }
    })
  }

  handleClick(key) {
    this.setState(function() {
      return {
        check:key,
        name:key,
        ingredients:sessionStorage.getItem(key)
      }
    })
  }



  entrydelete() {
   
    sessionStorage.removeItem(this.state.name);
    this.setState(function() {
      return {
        info:sessionStorage
      }
    })
    console.log(this.state.info);
  }

  edit() {
    this.setState(function() {
      return {
        formvisibility:!this.state.formvisibility
      }
    })
  }

  handleSubmit(n,i) {
  if(n!==''){
    if(n!==this.state.name){
      console.log(this.state.name);
      sessionStorage.removeItem(this.state.name);
      sessionStorage.setItem(n,i);
      this.setState(function() {
        return {
          formvisibility:false
        }
      })
    }
    else{
      sessionStorage.setItem(n,i);
      this.setState(function() {
        return {
          name:n,
          ingredients:i,
          formvisibility:false,
          info:sessionStorage
        }
      })      
    }    
  }

  }


  componentWillReceiveProps(newProps) {
    
    if(newProps.name && newProps.ingredients)
    {
      sessionStorage.setItem(newProps.name,newProps.ingredients);     
      this.setState(function() {
        return {
          info:sessionStorage
        }
      })     
    }
  }


  render() {
    return (
      <div>
      {
        Object.keys(this.state.info).length>=1
        ?<div>
         <ul>
        {Object.keys(this.state.info).map((key,index) => {
          return (
            <li key={index+1} onClick={()=>this.handleClick(key)}>
            
              <span className='recipeName'>Recipe Name=>{key}</span>
  
                <div>
                { key===this.state.check
                  ?<div className='recipeIngredients'>Ingredients-{this.state.ingredients}
                    <button onClick={()=>this.entrydelete()}>Delete</button>
                    <button onClick={()=>this.edit()}>Edit</button>
                    {
                      this.state.formvisibility
                      ?<Forms getData={this.handleSubmit}/>
                      :null
                    }
                  </div> 
                  :null       
                }
                </div>
 
            </li>
          )
        })}
      </ul>  
      <div className='btn'>
        <button  onClick={()=>this.deleteAll()} >
          Delete All Recipe
        </button>        
      </div>

      </div>    
        :<span>Enter data</span>
      }
      </div>
    )
  }

}




class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visibility:false,
      name:null,
      ingredients:null,
    }
    this.onClick=this.onClick.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
   
  }
  onClick() {
    this.setState(function() {
      return {
        visibility:true
      }
    })
  }
  handleSubmit(n,i) {
    this.setState(function() {
      return {
        name:n,
        ingredients:i,
        visibility:false,
      }
    })
  }
  render() {
    return (
      <div>
        <div className="recipe-shelf">            
            <RecipeInfo 
            name={this.state.name} 
            ingredients={this.state.ingredients}
            />
        </div>
        <div className="all-buttons">
          <button onClick={()=>this.onClick()}>
            Add Recipe
          </button>
        </div>
        {
          this.state.visibility
          ? <Forms getData={this.handleSubmit}/>
          : null
        }
      </div>
    )
  }
}




class App extends React.Component {
  render() {
    return (
      <div className="App">
      <h1>Enter your delicious recipe here</h1>
        <RecipeBox />
      </div>
    );
  }
}

module.exports=App;
