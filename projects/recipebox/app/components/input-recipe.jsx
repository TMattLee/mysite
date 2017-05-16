import React from 'react';
import { render } from 'react-dom';
import { ButtonToolbar, Button, Modal} from 'react-bootstrap';

export default class InputRecipe extends React.Component{
  constructor(){
    super();
    this.state ={
      showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
  }
  
  handleChange(event){
    let val = event.target.value;
    let name = event.target.name;
    this.props.modifyValue(val,name);
  }
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  
  submit(){
    this.props.addNewRecipe();
    this.close();
  }
  
  
  render(){
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <div style = {styles.title}>Add Recipe</div>
          </Modal.Header>
          <div style = {styles.modal}>
            <div>Recipe: </div>
            <textarea name="recipe" onChange={this.handleChange}
              value={this.props.recipeValue} style = {styles.recipeInput}/>
            <div>Ingredients: </div>
            <textarea name="ingredients" onChange={this.handleChange}
              value={this.props.ingredientsValue} style = {styles.ingredientsInput}/>
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
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" onClick={this.open}>
              Add Recipe
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

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