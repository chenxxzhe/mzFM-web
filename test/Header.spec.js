import {expect} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';

import Header from '../app/components/Header.jsx';



describe('<Header />', ()=>{
	it('can start query', ()=>{
		let header = shallow(<Header />);
		expect(true).to.be.false;
	});

	it('can show tips when inputing some letters', ()=>{
		expect(true).to.be.false;
	});
});