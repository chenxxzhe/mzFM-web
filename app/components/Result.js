import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import ListOption from './ListOption';


class Result extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Result';
        this.songObject = {};
    }
    showMenu(e, item){
        console.log('show menu');
        let listOption = findDOMNode(this.refs.listOption);
        listOption.style.display = 'block';
        listOption.style.left = e.clientX + 'px';
        listOption.style.top = e.clientY + 'px';
        this.songObject = item;
    }

    render() {
        let rows = this.props.result.map((item, index)=>{
            return (
                <li key={index} >
                    <div>
                        <span onClick={()=>this.props.onClickItem(item)}> 
                        title: {item.title} | type:{item.type} | views:{item.gk}
                        </span>
                        <button
                            onClick={()=>this.props.onAddToPlayList(item)} >
                            add to PlayList
                        </button>
                        <button 
                            className='addTo'
                            onClick={(e)=>this.showMenu(e, item)}>
                            add to...
                        </button>
                    </div>
                </li>
            );
        });
        return (
            <div>
                <p>Result: {this.props.result.length}</p>
                <ul className='query-result'>
                    {rows}
                </ul>
                <ListOption 
                    ref='listOption'
                    lists={this.props.lists}
                    onAddToList={(listId)=>this.props.onAddTo(listId, this.songObject)}
                    />
            </div>
        );
       
    }
}
Result.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    result: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickItem: PropTypes.func.isRequired,
    onAddTo: PropTypes.func.isRequired,
    onAddToPlayList: PropTypes.func.isRequired,
};

export default Result;