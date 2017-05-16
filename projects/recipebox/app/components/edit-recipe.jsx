import React from 'react';
import { render } from 'react-dom';
import { ButtonToolbar, Button, Modal} from 'react-bootstrap';

export default class EditRecipe extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.recipe = this.props.title;
    this.ingredients = this.props.ingredients;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);

    this.state ={
      showModal: false,
      editRecipe: this.recipe,
      editIngredients: this.ingredients,
    };
  }
  
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  
  handleChange(event){
    let val = event.target.value;
    let name = event.target.name;
    if(name === 'editRecipe'){
      this.setState({
        editRecipe: val,
      });
    }
    if(name === 'editIngredients'){
      this.setState({
        editIngredients: val.split(","),
      });
    }
  }
  
  handleDelete(){
    this.props.deleteFunction(this.props.deleteKey);
  }
  
  submit(){
    this.props.editFunciton(
      this.props.deleteKey,
      this.state.editRecipe,
      this.state.editIngredients
    );
    this.close();
  }
  
  render(){
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <div style = {styles.title}>Edit Recipe</div></Modal.Header>
          <div style = {styles.modal}>
            <div>Recipe: </div>
            <textarea name="editRecipe" onChange={this.handleChange}
              defaultValue={this.props.title} style = {styles.recipeInput} />
              
           
            <div>Ingredients (comma separated): </div>
            <textarea name="editIngredients" onChange={this.handleChange}
              defaultValue={this.props.ingredients} style = {styles.ingredientsInput}/>
              
            <div style = {styles.buttons}  className="buttonBar">
              <ButtonToolbar>
                <Button bsStyle="primary" onClick= {this.submit}>submit</Button>
                <Button onClick={this.close}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </div>
            
          </div>
        </Modal>
        
        <div style = {styles.buttons}  className="buttonBar">
          <ButtonToolbar >
            <Button bsStyle="danger" onClick= {this.handleDelete}>Delete</Button>
            <Button onClick={this.open}>
              Edit
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

/*this.props.editRecipe.bind(this,this.props.deleteKey)*/
const styles ={
  title:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'center',
    justifyContent:   'center',
    fontSize:         '1.5em',
  },
  modal:{
    display:          'flex',
    flexDirection:    'column',
    padding:          '25px',
    
  },
  buttons:{
    marginTop:        '10px',
    float:            'right',
  },
  ingredientsInput:{
    width:            '550px',
    height:           '150px',
    resize:           'none',
    marginTop:        '5px',
  
  },
  recipeInput:{
    width:            '550px',
    height:           '50px',
    resize:           'none',
    marginTop:        '5px',
    marginBottom:     '15px',
  },
}
