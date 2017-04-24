/*globals React render div*/


var exp1 = /[\+\-\*\/]/;

var exp2 = /[^\+|^\-|^\/|^\*]+/;

var total = null;

var displayValueArray = [];
var inputValueArray = ['0'];

var hitEquals = false;
var previousInput = 1;
var inputBegin = true;

class DisplayBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: inputValueArray.join(''),
            value: displayValueArray.join(''),
        };        
    }
    
    componentWillMount(){
        displayValueArray.callback = () => {
            this.setState({
                input: inputValueArray.join(''),
                value: displayValueArray.join(''),
            });
        };
    }
    
    render(){
        return( 
        <div style = {styles.displayBox}>
            <div style = {styles.displayNumContainer}>
                <div style = {styles.inputNum}>
                    {this.state.input} 
                </div>
                <div style = {styles.displayNum}>
                    {this.state.value} 
                </div>
            </div>
        </div>
        );
    }
}

class CalcButton extends React.Component{
    constructor(props){
        super(props);
        this.logNum = this.logNum.bind(this);
    }
 
    render(){
        return(
        < div style = {styles.buttonStyle} 
            id = {"button" + this.props.buttonLabel}
            onClick = {this.logNum} > 
            {this.props.buttonLabel} 
        </div>);
    }
    
    logNum(){
        
        var input = this.props.buttonLabel;
        
        if(displayValueArray.length < 20 ){
            if(inputBegin){
                inputValueArray.length = 0; 
                inputBegin = false;
            }
            var endChar = displayValueArray[displayValueArray.length-1];
            switch(input){
            
                case "AC":
                    displayValueArray.length = 0;
                    inputValueArray.length = 0;
                    inputValueArray.push(0);
                    inputBegin = true;
                    total = 0;
                    break;
                
                case '=':
                    if(typeof(endChar)  === 'string'){
                        break;
                    }
                    this.calcResult();
                    displayValueArray.length = 0;
                    inputValueArray.length = 0;
                    
                    var val = 0;
                    
                    if(total % 1 === 0){
                        val = total.toString().split('');
                    }
                    else{
                        val = total.toFixed(3).toString().split('');
                    }
                    console.log('val = ', val);
                    for (var ie = 0; ie < val.length; ie++){
                        if (val[ie] === '.' || val[ie] === '-'){
                            displayValueArray.push(val[ie]);
                            inputValueArray.push(val[ie]);
                        }
                        else{
                            displayValueArray.push(parseFloat(val[ie]));
                            inputValueArray.push(val[ie]);
                        }

                    }
                    hitEquals = true;
                    break;
                    
                default:
                    console.log( typeof(endChar) );
                    
                    if(displayValueArray.length === 0 ){
                        if(typeof(input) === 'number'){
                            inputValueArray.push(input);
                            displayValueArray.push(input);
                        }
                        else{
                            inputValueArray.push(0);
                            inputBegin = true;
                        }

                    }
                    else if( typeof(endChar)  === 'string' && typeof(input)  === 'string' ){
                        displayValueArray[displayValueArray.length-1] = input;
                    }
                    else{
                        
                        // If equals sign was hit then reset display when number is input.
                        if(hitEquals && typeof(input) === 'number'){
                            displayValueArray.length = 0;
                            displayValueArray.push(input);
                            inputValueArray.length = 0;
                            inputValueArray.push(input);
                            hitEquals = false;
                        }
                        else{
                            if( typeof(previousInput) === 'string' &&
                                typeof(input) === 'number' && 
                                previousInput !== '.' ){
                                inputValueArray.length = 0;
                                inputValueArray.push(input);
                                
                            }
                            else{
                                if(typeof(input) === 'number' || input === '.'){
                                    inputValueArray.push(input);
                                }
                            }
                            displayValueArray.push(input);
                            hitEquals = false;
                        }

                    }
    
                    break;                
            }
            
            previousInput = input;
            displayValueArray.callback(null);
            console.log(displayValueArray);
        }
        else{
            if (input === 'AC'){
                displayValueArray.length = 0;
                displayValueArray.callback(null);
            }
            if(input === '='){
                displayValueArray.length = 0;

                displayValueArray.callback(null);
            }
        }

    }
    
    calcResult(){
        var valueArray = displayValueArray.join('');
        var values = valueArray.split(exp1);
        var ops = valueArray.split(exp2);
        ops.pop();
        if(displayValueArray[0] === '-'){
    	    total = parseFloat(values[0]);
    	    values.shift();
    	    values[0] = (values[0] * -1).toString();
    	    ops[0] = "";

    	}
        
        console.log(values,ops);
        for(var i = 0; i < values.length; i++){          	
          	switch(ops[i]){
                case "":
              	    total = parseFloat(values[0]);
              	    break;
            	case '+':
                  	total += parseFloat(values[i]);
                    break;
                case '-':
                  total -= parseFloat(values[i]);
                  break;
                case '*':
                  	total *= parseFloat(values[i]);
                    break;
                case '/':
                  	total /= parseFloat(values[i]);
                    break;
            }
            console.log(total);
        }
    }
}



class NumberButtons extends React.Component{
    render(){
        return (
        <div>
            <div style = {styles.numRow} >
                <CalcButton buttonLabel = {"AC"}/>
                
            </div>    
            <div style = {styles.numRow} >
                <CalcButton buttonLabel = {7}/>
                <CalcButton buttonLabel = {8}/>
                <CalcButton buttonLabel = {9}/>  
                <CalcButton buttonLabel = {"/"}/>  
            </div>       
            <div style = {styles.numRow} >
                <CalcButton buttonLabel = {4}/>
                <CalcButton buttonLabel = {5}/>
                <CalcButton buttonLabel = {6}/>  
                <CalcButton buttonLabel = {"*"}/>  
            </div>   
            <div style = {styles.numRow} >
                <CalcButton buttonLabel = {1}/>
                <CalcButton buttonLabel = {2}/>
                <CalcButton buttonLabel = {3}/>  
                <CalcButton buttonLabel = {"+"}/>  
            </div>   
            <div style = {styles.numRow} >
                <CalcButton buttonLabel = {0}/>
                <CalcButton buttonLabel = {"."}/>
                <CalcButton buttonLabel = {"="}/>  
                <CalcButton buttonLabel = {"-"}/>  
            </div>   
        </div>
        
        );
    }

}


class CalculatorApp extends React.Component{
    render(){
        return (
            <div>
                <div style = {styles.calc}>
                    <div style={styles.app} >
                        <DisplayBox />
                        <NumberButtons />
                    </div>
                </div>
                <div style = {styles.footer}>
                    Built with ReactJS by <br/>
                    <a href="https://tmattlee.github.io" style={{ textDecoration: 'none' }}>
                        Matt Lee<
                    /a> 
                </div>
            </div>
        );
    }
}


// Style Component
const styles = {
    app:{
        
    },
    inputNum:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      fontSize: '1.1em',
      fontWeight: 'bold',
    },
    displayNum:{
      color: '#555',
      fontSize: '0.9em',
    },
    
    displayNumContainer:{
      display: 'flex',
      flexDirection: 'column',
    },
    
    buttonStyle:{
        display: 'flex',
        backgroundColor: 'grey',
        height: '50px',
        width: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px',
        fontWeight: 'bold',
        border: 'solid 2px black',
        
    },
    
    numRow:{
        display: 'flex',
        flexDirection: 'row',

    },
    
    numGroup:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    
    displayBox:{
        display: 'flex',
        flexDirection: 'row',
        width: '220px',
        height: '40px',
        backgroundColor: 'silver',
        justifyContent: 'flex-end',
        alignItems: 'space-between',
        margin: '5px',
        padding: '5px',
        border: 'solid 2px black',
    },
    
    calc:{
        margin: '70px auto 20px auto',
        height: '390px',
        width: '240px',
        padding: '20px 10px 10px 10px',
        backgroundColor: 'dimgrey',
        border: 'solid 2px black',
    },
    footer:{
        fontSize: '0.8em',
        textAlign: 'center',
        color: '#555',
    }
    
};


ReactDOM.render( <CalculatorApp />, document.getElementById('content') );