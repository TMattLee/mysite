import { deleteEnemy,deleteItem } from '../actions/index'

function deleteEntities (id,kind){
    this.props.dispatch(deleteItem(id));
}

export default deleteEntities;