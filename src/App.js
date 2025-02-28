import React, { useState, useRef } from 'react';
import Data from './Data';
import Navbar from './Components/Navbar';
import Song from './Components/Song';
import Player from './Components/Player';
import Library from './Components/Library';
import './CSS/app.css';

function App() {
    const audioRef = useRef(null);
    const [songs] = useState(Data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLibOpen, setIsLibOpen] = useState(false);
    const [isPlaylistRepeat, setIsPlaylistRepeat] = useState(false);
    const [songState, setSongState] = useState({
        currentTime: 0,
        duration: 0,
        seekbarPercentage: 0,
    });
    const [buttonStatus, setButtonStatus] = useState({
        next: true,
        previous: false,
    });

    const handleSongTimer = (event) => {
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;
        const percentage = Math.round((100 * currentTime) / duration);

        setSongState({
            ...songState,
            currentTime: currentTime,
            duration: duration,
            seekbarPercentage: percentage,
        });
    };

    const handleChangeSong = (direction) => {
        let index = songs.findIndex((song) => song.id === currentSong.id);

        switch (direction) {
            case 'next':
                if (isPlaylistRepeat) {
                    if (index === songs.length - 1) {
                        setCurrentSong(songs[0]);
                    } else {
                        setCurrentSong(songs[index + 1]);
                    }
                    setButtonStatus({ next: true, previous: true });
                } else {
                    if (index === songs.length - 1) {
                        setButtonStatus({ next: false, previous: true });
                    } else {
                        setCurrentSong(songs[index + 1]);
                        setButtonStatus({ next: true, previous: true });
                    }
                }
                break;
            case 'previous':
                if (isPlaylistRepeat) {
                    if (index === 0) {
                        setCurrentSong(songs[songs.length - 1]);
                    } else {
                        setCurrentSong(songs[index - 1]);
                    }
                    setButtonStatus({ next: true, previous: true });
                } else {
                    if (index === 0) {
                        setButtonStatus({ next: true, previous: false });
                    } else {
                        setCurrentSong(songs[index - 1]);
                        setButtonStatus({ next: true, previous: true });
                    }
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className={`App ${isLibOpen ? 'library-active' : ''}`}>
            <Navbar isLibOpen={isLibOpen} setIsLibOpen={setIsLibOpen} />
            <Song currentSong={currentSong} />
            <Player
                audioRef={audioRef}
                songs={songs}
                currentSong={currentSong}
                songState={songState}
                setSongState={setSongState}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                nextSong={() => handleChangeSong('next')}
                prevSong={() => handleChangeSong('previous')}
                buttonStatus={buttonStatus}
                isPlaylistRepeat={isPlaylistRepeat}
                setIsPlaylistRepeat={setIsPlaylistRepeat}
            />
            <Library
                songs={songs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                setIsPlaying={setIsPlaying}
                isLibOpen={isLibOpen}
                setIsLibOpen={setIsLibOpen}
            />
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onTimeUpdate={handleSongTimer}
                onLoadedMetadata={handleSongTimer}
                onEnded={() => handleChangeSong('next')}
            ></audio>
        </div>
    );
}

export default App;