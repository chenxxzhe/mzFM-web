import React, {PropTypes} from 'react';

class ListOption extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ListOption';
    }
    render() {
    	let rows = this.props.lists.map((item,index)=>{
    		return (
    			<li 
    				key={index} 
    				onClick={()=>this.props.onAddToList(index)}>
    				{item.title}
    			</li>

    		);
    	});
        return (
        	<ul className='list-option'>
        	{rows}
        	</ul>
        );
    }
}

ListOption.propTypes = {
	lists: PropTypes.arrayOf(PropTypes.object).isRequired,
	onAddToList: PropTypes.func.isRequired,
};

export default ListOption;
