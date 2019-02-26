import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
    constructor(props) {
      super(props);
  
      const album = albumData.find( album => {
        return album.slug === this.props.match.params.slug
      });
  
      this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false
    };
 
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }   

   setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); } 
      this.play();
    }
  }
  pButton() {
    if (hoverOn= True && isPlaying= False) {
      <ion-icon name="play"></ion-icon>
  }
    else if (isPlaying= True) {
      <ion-icon name="pause"></ion-icon>
    }
    else if (this.pause){
      <ion-icon name="play"></ion-icon>
    }
    else {
      index+1
    }
  }


  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-col" />
            <col id="song-title-col" />
            <col id="song-duration-col" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} 
              onClick={() => this.handleSongClick(song)} 
              onMouseEnter={() => this.hoverOn}
              onMouseLeave={()=> this.hoverOff}
              >        
                <td className="song-controls">
                </td>
                <button>
                    <span className="song-number">{index+1}</span>
                    <span className="ion-play"></span>
                    <span className="ion-pause"></span>
                  </button>
                <td className="song-number">{ song.number }</td>
                <td className="song-title">{ song.title}</td>
                <td className="song-duration">{song.duration }</td>
              </tr>
            )}
          </tbody>
        </table>
        <script src="https://unpkg.com/ionicons@4.2.2/dist/ionicons.js"></script>
         </section>
    );
  }
}
export default Album; 