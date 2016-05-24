import {expect} from 'chai';
import reducer from '../app/reducers/index.js';
import {ACTIONS} from '../app/actions/index.js';


const initialState = {
	lists: {
		currentList: 0,
		items: [
			{title:'default', include:['152539','1137302','741403']},
		],
	},
	
	playList: {
		currentSong: 0,
		items: [
			'152539',
			'1137302',
		],
	},
	showPlayList: false,
	query: {
		isFetching: false,
		response: null,
	},
};

describe('Test reducer', ()=>{
	it('should return the initial state if nothing happen', ()=>{
		expect(reducer(undefined,{})).to.eql(initialState);
	});

	describe('lists reducer', ()=>{
		const lists = initialState.lists;

		it('can create list', ()=>{
			const createAction = {
				type: ACTIONS.CREATE_LIST,
				title: 'title',

			};
			const expectedLists = Object.assign({}, lists, {items: lists.items.concat({title:'title',include:[]})});
			expect(reducer(undefined, createAction).lists).to.eql(expectedLists);
		});

		it('can not remove default list', ()=>{
			const removeAction = {
				type: ACTIONS.REMOVE_LIST,
				index: 0,
			};
			expect(reducer(undefined, removeAction).lists).to.eql(lists);
		});

		it('can remove others lists', ()=>{
			const removeAction = {
				type: ACTIONS.REMOVE_LIST,
				index: 1,
			};

			const twoListsState = reducer(undefined, {type:ACTIONS.CREATE_LIST, title:'title'});

			expect(reducer(twoListsState, removeAction).lists).to.eql(lists);
		});

		it('can change to show other list', ()=>{
			const changeAction = {
				type: ACTIONS.CHANGE_LIST,
				index: 1,
			};
			const twoListsState = reducer(undefined, {type:ACTIONS.CREATE_LIST, title:'title'});
			const expectedLists = Object.assign({}, twoListsState.lists, {currentList: 1});
			expect(reducer(twoListsState, changeAction).lists).to.eql(expectedLists);

		});
		
	});

	describe('playList reducer', ()=>{
		const playList = initialState.playList;
		it('can add song', ()=>{
			const addSongAction = {
				type: ACTIONS.ADD_SONG_TO_PLAY_LIST,
				id: 123,
			};
			const newItems = playList.items.concat(addSongAction.id);
			const expected = Object.assign({}, playList, {items: newItems});
			expect(reducer(undefined, addSongAction).playList).to.eql(expected);
		});

		it('can play song', ()=>{
			const playSong = {
				type: ACTIONS.PLAY_SONG,
				id: '1137302',
			};
			const expected = Object.assign({}, playList, {currentSong: playSong.id});
			expect(reducer(undefined, playSong).playList).to.eql(expected);
		});

		it('can remove song', ()=>{
			const removeSong = {
				type: ACTIONS.REMOVE_SONG_FROM_PLAY_LIST,
				id:'1137302',
			};
			const index = playList.items.indexOf(removeSong.id);
			const newItems = playList.items.slice();
			newItems.splice(index, 1);
			const expected = Object.assign({}, playList, {items:newItems});
			expect(reducer(undefined,removeSong).playList).to.eql(expected);
		});
	});

	describe('query reducer', ()=>{
		const init = initialState.query;
		it('keep fetching before response', ()=>{
			const queryNothing = {
				type: ACTIONS.START_QUERY,
				keyword: 'nothing',
			};
			const expected = Object.assign({}, init, {isFetching: true});
			expect(reducer(undefined, queryNothing).query).to.eql(expected);
		});

		it('get nothing when fail', ()=>{
			const fail = {
				type: ACTIONS.QUERY_FAIL,
			};
			expect(reducer(undefined, fail).query).to.eql(init);
		});

		it('get the response when success', ()=>{
			const response = {hello: 'world'};
			const success = {
				type: ACTIONS.QUERY_SUCCESS,
				response: response,
			};
			const expected = Object.assign({}, init, {response:response});
			expect(reducer(undefined, success).query).to.eql(expected);
		});

		
	});

	describe('showPlayList reducer', ()=>{
		it('can toggle play list', ()=>{
			const toggle = {
				type: ACTIONS.TOGGLE_LIST,
			};
			const shown = reducer(undefined, toggle);
			expect(reducer(undefined, toggle).showPlayList).to.be.true;
			expect(reducer(shown, toggle).showPlayList).to.be.false;
		});
	});
});