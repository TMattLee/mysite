/*globals React render div*/
var breakTime = null;
var workTime = null;


class PomodoroApp extends React.Component{
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
    
};


ReactDOM.render( <PomodoroApp />, document.getElementById('content') );