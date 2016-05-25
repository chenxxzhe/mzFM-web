import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import ListOption from './ListOption';

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
                    <p>intro</p>
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

export default Content;
