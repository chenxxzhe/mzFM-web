export const ACTIONS = {
	START_QUERY : 'start_query',
	QUERY_SUCCESS : 'query_success',
	QUERY_FAIL : 'query_fail',

	CREATE_LIST: 'create_list',
	REMOVE_LIST: 'remove_list',
	CHANGE_LIST: 'change_list',
	ADD_SONG: 'add_song',
	REMOVE_SONG: 'remove_song',

	PLAY_SONG: 'play_song',
	ADD_SONG_TO_PLAY_LIST: 'add_song_to_play_list',
	REMOVE_SONG_FROM_PLAY_LIST: 'remove_song_from_play_list',

	TOGGLE_LIST: 'toggle_list',
	CHANGE_MODE: 'change_mode',
};

/*query*/
export function query(keyword){
	return dispatch => {
		dispatch(startQuery(keyword));
		let request = new XMLHttpRequest();
		request.open('get', `http://121.42.196.190:9001/video/search/?keyword=${keyword}`, true);
		request.onreadystatechange = function(){
			if (request.readyState==4) {
				if (request.status==200) {
					return dispatch(querySuccess(JSON.parse(request.responseText)));
				} else {
					console.log(request.status, request.statusText);
					return dispatch(queryFail());
				}
			}
		};
		request.send();
		
	};
}

function startQuery(keyword){
	return {type: ACTIONS.START_QUERY, keyword};
}

function querySuccess(response){
	return {type: ACTIONS.QUERY_SUCCESS, response: response};
}

function queryFail(){
	return {type: ACTIONS.QUERY_FAIL};
}

/*favourite list*/
export function createList(title){
	return {type: ACTIONS.CREATE_LIST, title};
}

export function removeList(index){
	return {type: ACTIONS.REMOVE_LIST, index};
}

export function changeList(index){
	return {type: ACTIONS.CHANGE_LIST, index};
}

export function addSong(listId, songId){
	return {type: ACTIONS.ADD_SONG, listId, songId};
}

export function removeSong(listId, songId){
	return {type: ACTIONS.REMOVE_SONG, listId, songId};
}

/*playlist*/
// playSong should add to the playlist and the default favourite list
export function playSong(id){
	return {type: ACTIONS.PLAY_SONG, id};
}

export function addSongToPlayList(id){
	return {type: ACTIONS.ADD_SONG_TO_PLAY_LIST, id};
}

export function removeSongFromPlayList(id){
	return {type: ACTIONS.REMOVE_SONG_FROM_PLAY_LIST, id};
}

export function toggleList(){
	return {type:ACTIONS.TOGGLE_LIST};
}

export let changeMode = creatorFactory(ACTIONS.CHANGE_MODE);


function creatorFactory(type, ...params) {
	return function (...value) {
	var o = { type };
	params.map((item, index) => o[item] = value[index]);
	return o;
  };
}
function cf(type, ...params){
	return creatorFactory(type, ...params);
}