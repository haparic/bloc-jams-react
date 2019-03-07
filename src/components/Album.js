import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
      super(props);
  
      const album = albumData.find( album => {
        return album.slug === this.props.match.params.slug
      });
  
      this.state = { //initial state is created here, setting everything at 0 value
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false, 
      isHoverOn: false
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

   componentDidMount() { //used when a component has been added to DOM. used w/ api calls and event handlers
    this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime }); //tells it to display the current time
    
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration }); // tells it to check for duration of song and show current time
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }
    componentWillUnmount() {
      this.audioElement.src = null; //Must unmount or else it will keep going even after scripts stop running
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value; //changes the duration to aspecified point "target value"
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  hoverOn(index) {
    this.setState({isHoverOn: index });
  }
  hoverOff(index) {
    this.setState({isHoverOn: false});
  }
  hovered(song, index) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isHoverOn === index && !isSameSong && !this.state.isPlaying) {
      return <span className="icon ion-md-play" />;
    } else if (this.state.isHoverOn === index && isSameSong && !this.state.isPlaying) {
      return <span className="icon ion-md-play" />;
    } else if (this.state.isPlaying && isSameSong) {
        return <span className="icon ion-md-pause" />;
    } else if(isSameSong) {
      return <span className="icon ion-md-play" />;
    } else {
        return <span className="song-number">{index + 1}</span>;
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
              onMouseEnter={() => this.hoverOn(index)}
              onMouseLeave={()=> this.hoverOff(index)}
              >        
                <td className="song-controls">
                <button>
                    <span className="song-number">{this.hovered(song, index)}</span>
                  </button>
                  </td>
                <td className="song-number">{ song.number }</td>
                <td className="song-title">{ song.title}</td>
                <td className="song-duration">{song.duration }</td>
              </tr>
            )}
          </tbody>
        </table>
        <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
         />
        </section>
    );
  }
}
export default Album;