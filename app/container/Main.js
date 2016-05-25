import React, {PropTypes} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actionCreators  from '../actions';

import db from '../components/db';
import SideBar from '../components/SideBar';
import Content from '../components/Content';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Main';
    }

    componentDidUpdate(prevProps, prevState){
        const store = this.context.store;
        console.log('Main:updated state', store.getState());
        const lists = store.getState().lists;
        localStorage.setItem('lists', JSON.stringify(lists));

    }

    createList(){
        let title = prompt('enter your list title:','');
        if (title != null && title !='') {
            this.props.action.createList(title);   
        }

    }

    playSong(vid){
        this.props.action.addSongToPlayList(vid);
        this.props.action.playSong(vid);
    }

    render() {
        // todo: add songs to list (may be use pull-down list)
        // todo: delete songs from list
        // todo: move songs to list
        const {currentList, items} = this.props.lists;
        let include = items[currentList].include;
        console.log('in the main, include:', include);

        let includedSongs = db.getSongsArray(include);
        console.log('in the main, includedSongs:', includedSongs);
        return (
        	<div>
        		<SideBar 
                    lists={items}
                    currentList={currentList}
                    onCreateList={()=>this.createList()}
                    onRemoveList={(index)=>this.props.action.removeList(index)}
                    onChangeList={(index)=>this.props.action.changeList(index)}
                    />
        		<Content 
                    lists={items}
                    currentList={currentList}
                    songs={includedSongs}
                    onClickSong={(vid)=>this.playSong(vid)}
                    onRemoveSong={(id)=>this.props.action.removeSong(currentList, id)}
                    onAddTo={(listId, songId)=>this.props.action.addSong(listId, songId)}
                    />
        	</div>
        );
    }
}
Main.contextTypes = {store: PropTypes.object};
Main.propTypes = {
    lists: PropTypes.shape({currentList: PropTypes.number, items: PropTypes.array}).isRequired,
    action: PropTypes.objectOf(PropTypes.func).isRequired,
};

function s2p(state){
    return {
        lists: state.lists,
        // songs: state.songs,
    };
}

function d2p(dispatch){  
    return {
        action: bindActionCreators(actionCreators, dispatch),
    }; 
}

export default connect(s2p, d2p)(Main);