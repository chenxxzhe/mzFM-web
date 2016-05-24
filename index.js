import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';

import App from './app/App';
import Main from './app/components/Main';
import Query from './app/components/Query';
import './app/style.css';

import configureStore from './app/store/configureStore';


if(localStorage.getItem('songs') == null){
	const songs = {
		'152539':{'video_id':'152539','cid':'61694558','title':'【95P】天籁般的声音--栗子花【リツカ】【翻唱合集】','cover':'http://i1.hdslb.com/user/927/92776/131770996367d222af429a7e5a.gif','intro':'sm10501891 新人好难混啊……从这首歌开始，面汤就爱上了这个清澈的声音，不知不觉就整了下这么一个合集。按nico再生数排序（当然这首除外）【リツカ擁有稳定的音程与优美的高音見稱， 即使超高音也能唱得很清楚。而且在唱見之中声音的辨析度算是比較高的, 唱多層和声也很給力.喜歡在做MIXING的時候加比較厚的混響烘托通透的声音(来自敏敏的介绍)】曲包来自于敏敏，谢谢敏敏。栗子花姐是敏敏本命，于是萌妹子都治愈一波=w=','type':'翻唱','mp3_link':'http://oss-cn-shenzhen.aliyuncs.com/animefm-mp3s/bili-mp3s/61694558.mp3','gk':103000,'update_time':1450603247},
		'741403':{'video_id':'741403','cid':'1084891','title':'【钢之炼金术师】Heart of steel- B.ye 兔子','cover':'http://i2.hdslb.com/u_f/bf6043beb7b31d0586c399b11a505730.jpg','intro':'自制 【钢炼】配【YUI-Again】还记得当年看钢炼的那股热血中带有一丝悲伤与感动的记忆吗？原档：http://pan.baidu.com/share/link?shareid=1530938189&uk;=1647044520 有amp;请自行去掉','type':'MAD·AMV','mp3_link':'http://oss-cn-shenzhen.aliyuncs.com/animefm-mp3s/bili-mp3s/1084891.mp3','gk':49053,'update_time':1447566473},
		'1137302':{'video_id':'1137302','cid':'1649550','title':'钢炼-Again【Aumi】','cover':'http://i2.hdslb.com/u_user/87165e4fb382d410906fc1a8dfe2bb56.jpg','intro':'自制 yui大爱！特别喜欢这首again~当时钢炼FA刚播的时候就录过了QWQ平时上YY也经常唱.最近重温钢炼又被燃到于是再录了一遍.不过肯定是比不上原唱而且还口胡了TUT 求轻喷!后期：妖精3000 视频MAD来自av548183 作者：孤月苍华  MP3地址→http://fc.5sing.com/12904629.html','type':'翻唱','mp3_link':'http://oss-cn-shenzhen.aliyuncs.com/animefm-mp3s/bili-mp3s/1649550.mp3','gk':95790,'update_time':1447566333},
	};
	localStorage.setItem('songs', JSON.stringify(songs));
}

let initialState = {
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

let lists = localStorage.getItem('lists');
let playList = localStorage.getItem('playList');
let mode = localStorage.getItem('mode');

if(lists != null){
	let parsedLists =  JSON.parse(lists);
	console.log('init lists:', parsedLists);
	initialState.lists = parsedLists;
}
if(playList != null){
	let parsedPlayList =  JSON.parse(playList);
	console.log('init playlist:', parsedPlayList);
	initialState.playList = parsedPlayList;
}
if (mode != null) {
	let parsedMode =  JSON.parse(mode);
	console.log('init mode:', parsedMode);
	initialState.mode = parsedMode;
}

const store = configureStore(initialState);

// TODO: add 404
render(
	<Provider store={store}>
	<Router history={browserHistory} >
		<Route path='/' component={App}>
			<IndexRoute component={Main}/>
			<Route path='/query/:keyword' component={Query} />
		</Route>
	</Router>
	</Provider>,
	document.getElementById('app-root')
);


// i can only figure out this way to close popmenu when click other position
document.onclick = function(e){
	let listOption = document.querySelector('.list-option');
	if (e.target.className != 'addTo') {
		if(listOption != null){
			listOption.style.display = 'none';
		}
	}
};
