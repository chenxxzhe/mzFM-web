import React, {PropTypes} from 'react';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideBar';
    }

    render() {
        // TODO: currentList should be indicated by css
    	let listsArray = this.props.lists.map((item, index)=>{
    		return(
    			<li key={index}>
        			<span><a href='#' onClick={()=>this.props.onChangeList(index)}>{item.title}</a> {item.include.length}</span>
                    {index != 0 ? (<button onClick={()=>{this.props.onRemoveList(index);}}>delete</button>) : null}
    			</li>
    		);
    	});

        return (
        	<aside className='sidebar'>
            	<h3>List</h3>
                <button 
                    onClick={this.props.onCreateList}>
                    new list 
                </button>
            	<p>number: {listsArray.length}</p>
            	<ul>
            	{listsArray}
            	</ul>
        	</aside>

        );
    }
}
SideBar.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentList: PropTypes.number.isRequired,
    onCreateList: PropTypes.func.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRemoveList: PropTypes.func.isRequired,
};

export default SideBar;