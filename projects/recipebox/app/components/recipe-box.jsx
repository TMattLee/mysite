import React from 'react';
import { render } from 'react-dom';
import { 
  Accordion, 
  Panel, 
  ButtonToolbar,
  Button,
  Modal,
} from 'react-bootstrap';

//import Header from './accordion-header.jsx';
import PanelData from './accordion-panel-data.jsx';
import InputRecipe from './input-recipe.jsx';
import EditRecipe from './edit-recipe.jsx';

class RecipeBox extends React.Component{
  constructor(){
    super();
    this.state = {
      recipeValue: "",
      ingredientsValue: "",
      editRecipeValue:"",
      editIngredientsValue: "",
    }
    
    this.recipeArr =[
      {title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]}, 
      {title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]}, 
      {title: "Onion Pie", ingredients: ["Onion", "Pie Cruzt", "Sounds Yummy right?"]},
    ];
    
    this.parseRecipes = this.parseRecipes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }
  
  parseRecipes(){
    if(this.recipeArr.length > 0){
      return this.recipeArr.map( (item, i) => {
        return (
          <Panel header={item.title} eventKey={i} 
            key={i} style={styles.panelHeader}>
          
            <PanelData panelData={item.ingredients} key={i} />
           
            <EditRecipe 
              
              deleteKey = {i}
              title = {item.title}
              ingredients = {item.ingredients} 
              deleteFunction = {this.deleteRecipe} 
              editFunciton = {this.editRecipe}/>
           
          </Panel>
        );
      });
    }
    else{
      console.log("No recipes to show. ")
    }
  }
  
  handleEdit(val,name){
    
    if(name === 'recipe'){
      this.setState({
        recipeValue: val,
      });
    }
    if(name === 'ingredients'){
      this.setState({
        ingredientsValue: val.split(/\,/),
      });
    }
    //console.log(this.state.recipeValue,this.state.ingredientsValue);
  }
  
  
  handleChange(val,name){
    switch(name){
      case 'recipe':
        this.setState({
          recipeValue: val,
        });
        break;
        
      case 'ingredients':
        this.setState({
          ingredientsValue: val.split(/\,/),
        });
        break;
      case 'editRecipe':
        this.setState({
          editRecipeValue: val
        });
        break;
      case 'editIngredients':
        this.setState({
          editIngredientsValue: val.split(/\,/),
        });
        break;
    }
    

    console.log(this.state.recipeValue,this.state.ingredientsValue);
  }
  
  addRecipe(){
    this.recipeArr.push({
      title: this.state.recipeValue,
      ingredients: this.state.ingredientsValue
    });
    this.setState({
      recipeValue: "",
      ingredientsValue: "",
    });
  }
  
  deleteRecipe(num){
    console.log("deleted ", this.recipeArr[num], num);
    this.recipeArr.splice(num,1);
    this.setState({
      recipeValue: "",
      ingredientsValue: "",
    });
  }
  
  editRecipe(num, rec, ing){
    console.log(num, rec, ing);
    this.recipeArr[num].title = rec;
    this.recipeArr[num].ingredients = ing;
    this.setState({
      editRecipeValue: this.recipeArr[num].title,
      editIngredientsValue: this.recipeArr[num].ingredients,
    });
  }
  
  render(){
    return (
      <div className="accordionContainer" style = {styles.accordionContents}>
        <Accordion>
          
          { this.parseRecipes() }
         
        </Accordion>
        
        <InputRecipe modifyValue = {this.handleChange} 
          addNewRecipe = {this.addRecipe} recipeValue={this.state.recipeValue}
          ingredientsValue={this.state.ingredientsValue} />
      </div>
    );
  }
}

const styles = {
  accordionContents:{
    display:          'flex',
    flexDirection:    'column',
    width:            '650px',
    minHeight:        '40px',
    
  },
  panelHeader:{
   
  }
  
};

export default RecipeBox;