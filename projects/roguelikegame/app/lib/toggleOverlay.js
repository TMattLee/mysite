import {toggle} from '../actions/index';

function toggleOverlay(){
  this.props.dispatch(toggle());
}

export default toggleOverlay;