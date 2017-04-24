/*globals React render div*/


var exp1 = /[\+\-\*\/]/;

var exp2 =/\d+/;

var total = null;

var displayValueArray = []

class DisplayBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: displayValueArray.join(''),
        }        
    }
    
    componentWillMount(){
        displayValueArray.callback = (data) => {
            this.setState({
                value: displayValueArray.join(''),
            })
        }
    }
    
    render(){
        return <div style = {styles.displayBox}> {this.state.value} </div>;
    }
}

class CalcButton extends React.Component{
    constructor(props){
        super(props);
        this.logNum = this.logNum.bind(this);
    }
 
    render(){
        return(< div style = {styles.buttonStyle} 
            id = {"button" + this.props.buttonLabel}
            onClick = {this.logNum} > 
            {this.props.buttonLabel} 
        </div>);
    }
    
    logNum(){
        var input = this.props.buttonLabel;
        var nnnn = 35;
        if(displayValueArray.length <20 ){
            var endChar = displayValueArray[displayValueArray.length-1];
            switch(input){
            
                case "AC":
                    displayValueArray.length = 0;
                    break;
                
                case '=':
                    if(typeof(endChar)  === 'string'){
                        break;
                    }
                    this.calcResult();
                    displayValueArray.length = 0;
                    var val = total.toString().split('');
                    for (var ie = 0; ie < val.length; ie++){
                        displayValueArray.push(parseFloat(val[ie]));
                    }
                    break;
                    
                default:
                    
                    console.log(typeof(endChar));
                    if(typeof(endChar)  === 'string' && typeof(input)  === 'string'  ){
                        displayValueArray[displayValueArray.length-1] = input;
                    }
                    else{
                        displayValueArray.push(this.props.buttonLabel);
                    }
    
                    break;                
            }        

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
        
        console.log(values);
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
            <div style = {styles.calc}>
                <div style={styles.app} >
                    <DisplayBox />
                    <NumberButtons />
                </div>
            </div>
        );
    }
}


// Style Component
const styles = {
    app:{
        
    },
    
    buttonStyle:{
        display: 'flex',
        backgroundColor: 'grey',
        height: '50px',
        width: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px',
        
    },
    
    numRow:{
        display: 'flex',
        flexDirection: 'row',

    },
    
    numGroup:{
        display: 'flex',
        flexDirection: 'column',
    },
    
    displayBox:{
        display: 'flex',
        flexDirection: 'row',
        width: '220px',
        height: '30px',
        backgroundColor: 'silver',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '5px',
        padding: '5px',
    },
    
    calc:{
        margin: '20px auto 20px auto',
        height: '350px',
        width: '240px',
        padding: '20px 10px 10px 10px',
        backgroundColor: 'darkgrey',
    }
    
};


ReactDOM.render( <CalculatorApp />, document.getElementById('content') );