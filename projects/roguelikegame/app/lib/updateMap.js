import {mapUpdate} from '../actions/index';

function updateMap(i,j,kind){
 this.props.dispatch(mapUpdate(i,j.kind)); 
}
export default updateMap;