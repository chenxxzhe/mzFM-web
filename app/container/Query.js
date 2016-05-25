import React, {PropTypes} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {playSong, addSong, addSongToPlayList} from '../actions';

import Result from '../components/Result';
import db from '../components/db';

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

export default connect(mapStateToProps, d2p)(Query);
