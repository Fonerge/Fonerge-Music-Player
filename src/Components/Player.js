import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../Functions/playAudio';


const Player = ({isPlaying, setIsPlaying, currentSong, nextSong, prevSong, buttonStatus, audioRef, songState, setSongState}) => {
    const getNormalTime = (time) => {
        if (time) {
            return(
                Math.floor(time/60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
            );
        } else {
            return'0:00';
        }
    };

    const handlePlayPauseSong = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying((isPlaying) => !isPlaying);
    };

    const handleSeekBarDrag = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongState({ ...songState, currentTime: event.target.value });
    };

    useEffect(() => {
        if (isPlaying) {
            playAudio(isPlaying, audioRef);
        }
    }, [currentSong, isPlaying, audioRef]);

    const trackAnimation = {
        transform: `translateX(${songState.seekbarPercentage})`,
    };

    return(
        <div className="player">
            <div className="time-control">
                <p>{getNormalTime(songState.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradint(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                    }} 
                    className="track"
                >
                    <input
                    type="range"
                    max={songState.duration}
                    value={songState.currentTime}
                    onChange={handleSeekBarDrag}
                    />
                    <div style={trackAnimation} className="animate-track"></div>
                </div>
                <p>{getNormalTime(songState.duration)}</p>
            </div>
            <div className="play-control">
                <button disabled={!buttonStatus.previous}>
                    <FontAwesomeIcon
                        className="skip-back"
                        size="2x"
                        icon={faAngleLeft}
                        onClick={prevSong}
                    />
                </button>
                <button>
                    <FontAwesomeIcon
                        className="play"
                        size="3x"
                        icon={isPlaying ? faPause : faPlay}
                        onClick={handlePlayPauseSong}
                    />
                </button>
                <button disabled={!buttonStatus.next}>
                    <FontAwesomeIcon
                        className="skip-forward"
                        size="2x"
                        icon={faAngleRight}
                        onClick={nextSong}
                    />
                </button>
            </div>
        </div>
    );
}

export default Player;