import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {playSong, addSong, addSongToPlayList} from '../actions';

import ListOption from './ListOption';
import db from './db';

/*container*/
class Query extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Query';
    }

    addSong(listId, item){
        const {action} =  this.props;
        console.log('add song to list:', listId);
        db.addSong(item);
        action.addSong(listId, item.video_id);
    }
    addSongToPlayList(item){
        const {action} =  this.props;
        console.log('add song to play list');
        db.addSong(item);
        action.addSongToPlayList(item.video_id);
    }

    clickSong(item){
        const {action} =  this.props;
        console.log('click song');
        // new song from network should be also added to localStorage for cache
        db.addSong(item);
        // add to default
        action.addSong(0, item.video_id);
        action.addSongToPlayList(item.video_id);
        action.playSong(item.video_id);
    }

    render() {
        // todo: add songs to list and playlist
        
        return (
	        <div className='query'>
    	        <button 
                    onClick={()=>{this.context.router.push('/');}}>
                    back
                </button>
    	        <p>isFetching&#58; {this.props.isFetching.toString()}</p>
                {
                    this.props.response ? 
                        <Result 
                            lists={this.props.lists}
                            result={this.props.response.result} 
                            onAddTo={(listId, item)=>this.addSong(listId, item)}
                            onAddToPlayList={item=>this.addSongToPlayList(item)}
                            onClickItem={(item)=>this.clickSong(item)} /> 
                        : null
                }
	        </div>
      	);
    }
}

Query.contextTypes = {router: PropTypes.object};
Query.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    response: PropTypes.object,
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    // action: PropTypes.shape(PropTypes.func),
};

function mapStateToProps(state){
    return {
        isFetching: state.query.isFetching,
        response: state.query.response,
        lists: state.lists.items,
    };
        
}
function d2p(dispatch){
    return {
        action: bindActionCreators({playSong, addSong, addSongToPlayList}, dispatch),
    };
}

/*child*/

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


/*export*/
export default connect(mapStateToProps, d2p)(Query);