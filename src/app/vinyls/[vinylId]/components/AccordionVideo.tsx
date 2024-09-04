'use client';

import { useEffect, useState, useRef } from 'react';

import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlay, faPause, faVolumeUp } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';

import { cn } from '@/utils/classNames';

export default function VideoPlayerList({ videos }: { videos: any[] }) {
    const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
    const [played, setPlayed] = useState<{ [key: number]: number }>({});
    const [duration, setDuration] = useState<{ [key: number]: number }>({});
    const [volume, setVolume] = useState<{ [key: number]: number }>({});
    const [isMounted, setIsMounted] = useState(false);
    const playerRefs = useRef<{ [key: number]: ReactPlayer | null }>({});

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handlePlayPause = (index: number) => {
        setIsPlaying(prevState => {
            const newState = Object.keys(prevState).reduce((acc, key) => {
                acc[parseInt(key)] = false;
                return acc;
            }, {} as { [key: number]: boolean });
            newState[index] = !prevState[index];
            return newState;
        });
    };

    const handleProgress = (index: number, state: any) => {
        setPlayed(prevState => ({
            ...prevState,
            [index]: state.played,
        }));
    };

    const handleDuration = (index: number, duration: number) => {
        setDuration(prevState => ({
            ...prevState,
            [index]: duration,
        }));
    };

    const handleVolumeChange = (index: number, value: number) => {
        setVolume(prevState => ({
            ...prevState,
            [index]: value,
        }));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="flex flex-col space-y-4">
            {videos.map((video, index) => {
                if (!video.uri) return null;
                return (
                    <div key={index} className={cn({
                        'p-4 border rounded-lg bg-white shadow-md': true,
                        'hidden': !duration[index],
                    })}>
                        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                            <button
                                onClick={() => handlePlayPause(index)}
                                className="play-pause-btn text-2xl"
                            >
                                <FontAwesomeIcon icon={isPlaying[index] ? faPause : faPlay} />
                            </button>
                            <span className="current-time text-sm">
                                {formatTime((played[index] || 0) * (duration[index] || 0))}
                            </span>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={played[index] || 0}
                                onChange={(e) => {
                                    const newPlayed = parseFloat(e.target.value);
                                    setPlayed(prevState => ({
                                        ...prevState,
                                        [index]: newPlayed,
                                    }));
                                    playerRefs.current[index]?.seekTo(newPlayed);
                                }}
                                className="flex-1"
                            />
                            <span className="duration text-sm">
                                {formatTime(duration[index] || 0)}
                            </span>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faVolumeUp} className="text-xl" />
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step="any"
                                    value={volume[index] || 1}
                                    onChange={(e) => handleVolumeChange(index, parseFloat(e.target.value))}
                                    className="w-24"
                                />
                                <a href={video.uri} target="_blank" rel="noopener noreferrer" className="text-red-500">
                                    <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
                                </a>
                            </div>
                        </div>
                        {isMounted && (
                            <ReactPlayer
                                ref={(el) => {
                                    playerRefs.current[index] = el;
                                }}
                                url={video.uri}
                                playing={isPlaying[index] || false}
                                volume={volume[index] || 1}
                                controls={false} // Pas de contrôles, juste le bouton Play/Pause
                                width="0"
                                height="0"
                                style={{ display: 'none' }} // Masquer l'élément vidéo
                                onProgress={(state) => handleProgress(index, state)}
                                onDuration={(duration) => handleDuration(index, duration)}
                                config={{
                                    file: {
                                        forceAudio: true, // Forcer l'audio seulement
                                    },
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
