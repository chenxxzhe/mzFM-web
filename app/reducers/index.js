import {ACTIONS} from '../actions';

// do not use Array to include Object...
const initialState = {
	lists: {
		currentList: 0,
		items: [{title:'default', include:['152539','1137302','741403']}],
	},
	
	playList: {
		currentSong: 0,
		items: [
			'152539',
			'1137302',
		],
	},
	showPlayList: false,
	mode: 0,
	query: {
		isFetching: false,
		response: null,
	},
};

export default function rootReducer(state = initialState, action) {
	
	return {
		lists: listsReducer(state.lists, action),
		playList: playListReducer(state.playList, action),
		showPlayList: toggleList(state.showPlayList, action),
		mode: changeMode(state.mode, action),
		query: queryReducer(state.query, action),
	};
}

/**/
function listsReducer(lists={}, action){
	switch(action.type){
	case ACTIONS.CREATE_LIST:
		return Object.assign({}, 
				lists, 
				{items: lists.items.concat({title:action.title, include:[]})}
				);
	case ACTIONS.REMOVE_LIST:
		if(action.index == 0){
			return lists;
		}
		const items = lists.items;
		let temp = [];
		if(items.length > action.index+1){
			temp = items.slice(0,action.index).concat(items.slice(action.index+1));
		} else{
			temp = items.slice(0,action.index);
		}
		return Object.assign({}, lists, {items: temp});
	case ACTIONS.CHANGE_LIST:
		return Object.assign({}, lists, {currentList: action.index});

	case ACTIONS.ADD_SONG:
	case ACTIONS.REMOVE_SONG:
		if (action.listId == undefined || action.listId == null) {
			return lists;
		};
		if(action.songId == undefined) {
			return lists;
		}
		console.log('listId', action.listId);
		let itemsCopy = lists.items.slice();
		let index = itemsCopy[action.listId].include.indexOf(action.songId);
		if (action.type == ACTIONS.ADD_SONG) {
			if(index == -1){
				itemsCopy[action.listId].include.push(action.songId);
			}
			return Object.assign({}, lists, {items: itemsCopy});
		} else {
			if(index != -1){
				itemsCopy[action.listId].include.splice(index, 1);
			}
			return Object.assign({}, lists, {items: itemsCopy});
		}
		
	default:
		return lists;
	}
}


/* */
function queryReducer(query={}, action){
	switch(action.type){
	case ACTIONS.START_QUERY:
		return Object.assign({}, query, {isFetching:true});
	case ACTIONS.QUERY_SUCCESS: 
	case ACTIONS.QUERY_FAIL:
		return Object.assign({}, query, {isFetching:false, response: (action.response ? action.response : null)});
	default:
		return Object.assign({}, query, {isFetching:false});
	}
}

/**/
function playListReducer(playList={}, action){
	const items = playList.items;
	
	switch(action.type){
	case ACTIONS.ADD_SONG_TO_PLAY_LIST:
			// repeated song don't need to add to playList
		const newItems = items.indexOf(action.id) != -1 ? items : items.slice().concat(action.id);
		return Object.assign({}, playList, {items: newItems});

	case ACTIONS.PLAY_SONG:
		return Object.assign({}, playList, {currentSong: action.id});

	case ACTIONS.REMOVE_SONG_FROM_PLAY_LIST:
		const index = items.indexOf(action.id);
		if(index != -1){
			const newItems = items.slice();
			newItems.splice(index, 1);
			return Object.assign({}, playList, {items: newItems});
		} else {
			return playList;
		}

	default:
		return playList;
	}
}

/**/
function toggleList(showPlayList=false, action){
	if (action.type == ACTIONS.TOGGLE_LIST) {
		return showPlayList ? false : true;
	} else {
		return showPlayList;
	}
}

/**/
function changeMode(mode=0, action){
	if (action.type == ACTIONS.CHANGE_MODE) {
		return mode < 2 ? (mode + 1) : 0;
	} else {
		return mode;
	}
}

