import React, { useRef, useState } from 'react'
import './App.css'
const App=()=>{


  const [currentMusicDetails,SetMuiscDetails]=useState({
    songName:'Fire For You',
    songArtist:'Cannon',
    songSrc:'./Assets/Audio/Fire For U.mp3',
    songAvatar:'./Assets/Images/drowning.jpg'
  });

  const [isAudioPlaying,setIsAudioPlaying]=useState(false);


  const currentAudio=useRef();

  const [musicIndex,setMusicIndex]=useState(0);

  const [musicTimeLength,setMusicTimeLength]=useState("00 : 00");
  const [musicCurrentTime,setMusicCurrentTime]=useState("00 : 00")


  const handleAudioPlay=()=>{
    if(currentAudio.current.paused){
      currentAudio.current.play();
      setIsAudioPlaying(true)
    }
    else{
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  }


  const MuiscApi=[
    {
    songName:'Fire For You',
    songArtist:'Cannon',
    songSrc:'./Assets/Audio/Fire For U.mp3',
    songAvatar:'./Assets/Images/drowning.jpg'
    },
    {
      songName:'drowning',
      songArtist:'Vague003',
      songSrc:'./Assets/Audio/Drowning.mp3',
      songAvatar:'./Assets/Images/drowning.jpg'
    }
  ]
  const handeNextSong=()=>{

    if(musicIndex>=MuiscApi.length-1){
      let setNumber=0;
      setMusicIndex(setNumber);
      updateCurrentMuiscDetails(setNumber);

    }
    else{
      let setNumber=musicIndex+1;
      setMusicIndex(setNumber);
      updateCurrentMuiscDetails(setNumber);

    }
  }


  const updateCurrentMuiscDetails=(number)=>{
    let musicObject=MuiscApi[number];
    currentAudio.current.src=musicObject.songSrc;
    currentAudio.current.play();
    SetMuiscDetails({
      songName:musicObject.songName,
      songArtist:musicObject.songArtist,
      songSrc:musicObject.songSrc,
      songAvatar:musicObject.songAvatar
    })
    setIsAudioPlaying(true);
   
  }


  const handlePrevSong=()=>{
    
    if(musicIndex===0){
      let setNumber=MuiscApi.length-1;
      setMusicIndex(setNumber);
      updateCurrentMuiscDetails(setNumber);

    }
    else{
      let setNumber=musicIndex-1;
      setMusicIndex(setNumber);
      updateCurrentMuiscDetails(setNumber);

    }
  }

  const [audioProgress,setAudioProgress]=useState(0)


  const handleAudioProgress=(e)=>{
    setAudioProgress(e.target.value)
    currentAudio.current.currentTime=e.target.value+currentAudio.current.duration/100;
  }


  const handleAudioUpdate=()=>{

    //total duration of  audio
    let mins=Math.floor(currentAudio.current.duration/60);
    let secs=Math.floor(currentAudio.current.duration%60);
    let musicTimeLength=`${mins<10 ? `0${mins}` : mins} : ${secs<10 ? `0${secs}`: secs}`;
    setMusicTimeLength(musicTimeLength);



    //update current time if audio
    //total duration of  audio
    let min=Math.floor(currentAudio.current.currentTime/60);
    let sec=Math.floor(currentAudio.current.currentTime%60);
    let musicCurrentTime=`${min<10 ? `0${min}` : min} : ${sec<10 ? `0${sec}`: sec}`;
    setMusicCurrentTime(musicCurrentTime);



    const progress=parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)?0:progress)

  }

  const vidArray=[
    './Assets/Videos/v1.mp4',
    './Assets/Videos/v2.mp4',
    './Assets/Videos/v3.mp4',
  ]


  const [videoIndex,setVideoIndex]=useState(0)
  const handleBgChange=()=>{
    if(videoIndex>=vidArray.length-1)
    {
      setVideoIndex(0);
    }
    else{
      setVideoIndex(videoIndex+1);
    }
  }

  return (
    <div className='container'>
      <audio src='./Assets/Audio/Fire For U.mp3' ref={currentAudio} onEnded={handeNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} autoPlay muted loop className='backgroundVideo'></video>
      <div className='blackscreen'>
      </div>
      <div className='music-container'>
        <p className='musicPlayer'>Paadal</p>
        <p className='music-head-name'>{currentMusicDetails.songName}</p>
        <p className='music-artist-name'>{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} alt="song img" id="songbanner"></img>

        <div className='musicTimDiv'>
          
          <p className='music-current-time'>{musicCurrentTime}</p>
          <p className='music-length-time'>{musicTimeLength}</p>
        </div>

          <input type='range' name='musicProgressBar' className='musicProgressBar' value={audioProgress}  onChange={handleAudioProgress}/>
        

        <div className='musicControllers'>
          
          <i className='fa fa-backward backward' onClick={handlePrevSong}></i>
          <i className={`${isAudioPlaying? 'fa fa-pause':'fa fa-play'} playbtn`} onClick={handleAudioPlay}></i>
          <i className='fa fa-forward forward' onClick={handeNextSong}></i>
        </div>
      </div>
      <div className='changeBg' onClick={handleBgChange}>
        change background
      </div>
    </div>
  )
}


export default App