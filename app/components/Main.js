import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actionCreators  from '../actions';

import db from './db';
import ListOption from './ListOption';

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
};

class Content extends React.Component {
    

    constructor(props) {
        super(props);
        this.displayName = 'Content';
        this.vid = '';
    }

    shouldComponentUpdate(nextProps, nextState){
        let flag = false;
        let listLength = this.props.lists.length;
        if(this.props.songs != nextProps.songs || listLength != nextProps.lists.length){
            flag = true;
        }
        console.log('should update Content? ', flag);
        return flag;
    }

    showMenu(e, vid){
        console.log('show menu');
        let listOption = findDOMNode(this.refs.listOption);
        listOption.style.display = 'block';
        listOption.style.left = e.clientX + 'px';
        listOption.style.top = e.clientY + 'px';
        this.vid = vid;
    }
    onAddTo(listId){
        ;
    }
    
    render() {
    	const list = this.props.lists[this.props.currentList];
    	const songs = this.props.songs;
        // console.log('Content, songs:', songs);

        // TODO: items can be clicked to play song
    	let rows = songs.map((item, index)=>{
    		return (
    			<li key={index} >
    				<span onClick={()=>this.props.onClickSong(item.video_id)}>
                    {index} | {item.title} | time | {item.type}
                    </span>
                    
                    <button className="addTo" onClick={(e)=>this.showMenu(e, item.video_id)}>add to..</button>
                    <button onClick={()=>this.props.onRemoveSong(item.video_id)}>delete</button> 
    			</li>
    		);
    	});
        return (
        	<main className="content">
        		<div className='list-intro'>
	    			<span>{list.title} : {list.include.length}</span>
	    			<p>item.intro</p>
        		</div>
        		<div className='songs-list'>
	        		<ul>
                    {rows}
	        		</ul>
                    <ListOption 
                        ref='listOption'
                        onAddToList={listId=>this.props.onAddTo(listId, this.vid)}
                        lists={this.props.lists}
                        />
        		</div>
        	</main>
        );
    }
}
Content.propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentList: PropTypes.number.isRequired,
    onRemoveSong: PropTypes.func.isRequired,
    onAddTo: PropTypes.func.isRequired,
};



export default connect(s2p, d2p)(Main);
