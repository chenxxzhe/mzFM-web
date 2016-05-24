import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {query} from '../actions';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
    handleSubmit(e){
        e.preventDefault();
        const keyword = e.target.elements[0].value;
        this.context.router.push(`/query/${keyword}`);
        const {dispatch} = this.props;
        dispatch(query(keyword));
    }

    handleChange(e){
        const text = e.target.value;
        // TODO: input tips
        return;
    }

    render() {
        return (
        	<header>
	        	<span className='logo'>MZFM</span>
	        	<form onSubmit={e=>this.handleSubmit(e)}>
		        	<input 
			        	type='text' 
			        	onChange={e=>this.handleChange(e)}
			        	placeholder='search songs' />
		        </form>
	        </header>
        );
    }
}
Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
Header.contextTypes = {router: React.PropTypes.object};


function s2p(state){
    
    return; 
}
function d2p(dispatch){
    return {query: bindActionCreators(query, dispatch)};
}

export default connect()(Header);
