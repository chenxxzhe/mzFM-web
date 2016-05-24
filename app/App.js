import React, {PropTypes} from 'react';
import Header from './components/Header';
// import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }

    
    render() {
        return (
        	<div>
	        <Header />
	        {this.props.children}
	        <Footer />
	        </div>
        );
        
    }
}
App.contextTypes = {router: PropTypes.object};



// export default App;
export default App;
