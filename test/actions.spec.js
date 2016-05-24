import {expect} from 'chai';
// import {applyMiddleware} from 'redux';
import * as actions from '../app/actions/index.js';

// function thunk(store){
// 	return store => next => action => {
// 		if (typeof action == 'function') {
// 			action(store.dispatch, store.getState);
// 		} else {
// 			next(action);
// 		}
// 	}
// }


// function mockStore(getState, expectedActions, done){
// 	if (!Array.isArray(expected)) {
// 	    throw new Error('expected should be an array of expected actions.')
// 	  }
//   	if (typeof done !== 'undefined' && typeof done !== 'function') {
//     	throw new Error('done should either be undefined or function.')
//   	}
//   	function withoutMiddleware(){
//   		return {
//   			getState(){
//   				return typeof getState === 'function' ?
// 		          getState() :
// 		          getState 
//   			},

//   			dispatch(action){
//   				const expectedAction = expectedActions.shift();
//   				try{
//   					expect(action).to.eql(expectedAction);
//   					if(done && !expectedActions.length){
//   						done();
//   					}
//   					return action
//   				} catch(e){
//   					done(e)
//   				}
//   			}
//   		}
//   	}

//   	const withMiddleware = applyMiddleware(thunk)(withoutMiddleware);
//   	return withMiddleware();
// }


describe('Test actions', ()=>{
	describe('Fav list', ()=>{
		it('can create list', ()=>{
			const title = 'title';
			const expectedAction = {
				type: 'create_list',
				title,
			};
			expect(actions.createList(title)).to.eql(expectedAction);
		});

		it('can remove list', ()=>{
			const index = 1;
			const expectedAction = {
				type: 'remove_list',
				index,
			};
			expect(actions.removeList(index)).to.eql(expectedAction);
		});
	});

	// describe('Query', ()=>{
	// 	it('query')
	// })
});


