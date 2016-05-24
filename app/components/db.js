export default class DB {
	
	/*
	SongId: {
		number video_id, 
		string cid,
		string title, 
		string cover, 
		string intro,
		string type,
		string mp3_link,
		number gk,
		number update_time
	}
	*/
	

	static getJsonFromDb(){
		const stringSongs = localStorage.getItem('songs');
		const songs = JSON.parse(stringSongs);
		return songs;
	}

	static getSong(id){
		console.log('getSong id:',id);
		let songs = this.getJsonFromDb();
		if (songs[id] == null || songs[id] == undefined){
			console.log(`song:${id} does not exist`);
			return null;
		}
		return songs[id];
	}


	static getSongsArray(ids){
		console.log('getSongs ids:', ids);
		let songs =  this.getJsonFromDb();
		const includedSongs = ids.map(vid=>songs[vid]);
		return includedSongs;
	}

	static addSong(song){
		console.log('add song:', song.title);
		let songs = this.getJsonFromDb();
		songs[song.video_id] = song;
		localStorage.setItem('songs', JSON.stringify(songs));
	}
}