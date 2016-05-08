import React from 'react';
import {render} from 'react-dom';

init();

function init(){
 	var shell = document.createElement('main');
 	shell.className = 'app-shell';
 	document.body.appendChild(shell);
 	render(<div>tomorrow will be a good day!</div>, shell);
}

//to use hot-loader, you shouldn't have a real index.html.
//instead, you should generate it when building.
