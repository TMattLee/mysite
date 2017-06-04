import {
  addItem
} from '../actions/index';

function addNewItem(itemId,i,j,item,kind){
  this.props.dispatch(addItem(itemId,i,j,item,kind));
}

export default addNewItem;