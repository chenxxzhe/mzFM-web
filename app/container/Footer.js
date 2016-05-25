import React, {PropTypes} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {toggleList, removeSongFromPlayList, playSong, changeMode} from '../actions';
import PlayList from '../components/PlayList';
import db from '../components/db';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Footer';
    }

    componentDidUpdate(prevProps, prevState){
        // save to setting to localStorage for future use
        const store = this.context.store;
        console.log('Footer:updated state', store.getState());
        const playList = store.getState().playList;
        const mode = store.getState().mode;
        localStorage.setItem('playList', JSON.stringify(playList));
        localStorage.setItem('mode', JSON.stringify(mode));
    }

    onCanPlay(){
        console.log('onCanPlay');
        this.refs.audio.play();
    }
    onCanPlayThrough(){
        console.log('onCanPlayThrough');
        this.refs.audio.play();
    }

    onEnded(){
        // items is an array of string.
        console.log('song ended');
        const {currentSong, items} = this.props.playList;
        let next = null;
        let nextSong = null;
        switch(this.props.mode){
            case 0:
                next = items.indexOf(currentSong);
                console.log('items.length', items.length);
                console.log('next:', next);
                nextSong = items.length == next + 1? items[0] : items[next + 1];
                this.props.playSong(nextSong);
                break;
            case 1:
                do {
                    next = Math.floor(Math.random() * items.length);
                } while (next == items.length || items[next] == currentSong);
                nextSong = items[next];
                this.props.playSong(nextSong);
                break;
            case 2:
                this.refs.audio.play();
                break;
            default:
                this.refs.audio.play();
                break;
        }
    }


    render() {
        const {currentSong, items} = this.props.playList;
        const includedSongs = db.getSongsArray(items);
        let currentSongObject = db.getSong(currentSong);
        let src = null;
        if(currentSongObject != null || currentSongObject != undefined){
            src = currentSongObject.mp3_link;
        }
        let mode = '';
        switch(this.props.mode){
            case 0:
                mode = 'sequnce';
                break;
            case 1:
                mode = 'random';
                break;
            case 2:
                mode = 'single';
                break;
            default:
                mode = 'sequnce';
                break;
        }
        return (
        	<footer>
        		<audio ref='audio' 
                    onCanPlayThrough={()=>this.onCanPlayThrough()}
                    onCanPlay={()=>this.onCanPlay()} 
                    onEnded={()=>this.onEnded()}
                    src={src ? src : null} 
                    controls='controls' autoplay="autoplay">
                your browser does not suppor audio tag
                </audio>
                <button
                    onClick={()=>this.props.toggleList()}>
                    play list
                </button>
                <button onClick={this.props.changeMode}>{mode}</button>
                {
                    this.props.showPlayList ? 
                        <PlayList 
                            currentSong={currentSong}
                            list={includedSongs}
                            onRemoveSong={id=>this.props.removeSong(id)}
                            onPlaySong={id=>this.props.playSong(id)}
                            /> 
                        : null
                }
    			
        	</footer>
        );
    }
}
Footer.contextTypes = {store: PropTypes.object};
Footer.propTypes = {
    playList: PropTypes.object.isRequired,
    showPlayList: PropTypes.bool.isRequired,
    removeSong: PropTypes.func.isRequired,
    playSong: PropTypes.func.isRequired,
    mode: PropTypes.number.isRequired,
    changeMode: PropTypes.func.isRequired,
};

function s2p(state){
    return {
        playList: state.playList,
        showPlayList: state.showPlayList,
        mode: state.mode,
    };
}

function d2p(dispatch){
    return {
        toggleList: bindActionCreators(toggleList, dispatch),
        removeSong: bindActionCreators(removeSongFromPlayList, dispatch),
        playSong: bindActionCreators(playSong, dispatch),
        changeMode: bindActionCreators(changeMode, dispatch),
    };
}
export default connect(s2p,d2p)(Footer);