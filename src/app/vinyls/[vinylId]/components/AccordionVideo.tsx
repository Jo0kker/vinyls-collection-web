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
                        <h3 className="mb-2 text-lg font-semibold">{video.title}</h3>
                        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                            <button
                                onClick={() => handlePlayPause(index)}
                                className="text-2xl play-pause-btn"
                            >
                                <FontAwesomeIcon icon={isPlaying[index] ? faPause : faPlay} />
                            </button>
                            <span className="text-sm current-time">
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
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:mt-[-5px] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-progress]:bg-blue-500 [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-progress-value]:bg-blue-500 [&::-webkit-progress-inner-element]:bg-blue-500 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,#3b82f6_0%,#3b82f6_var(--range-progress),rgb(229,231,235)_var(--range-progress),rgb(229,231,235)_100%)] [&::-webkit-slider-runnable-track]:bg-[length:100%_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat"
                                style={{ '--range-progress': `${(played[index] || 0) * 100}%` } as React.CSSProperties}
                            />
                            <span className="text-sm duration">
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
                                    className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:mt-[-5px] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-progress]:bg-blue-500 [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-progress-value]:bg-blue-500 [&::-webkit-progress-inner-element]:bg-blue-500 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,#3b82f6_0%,#3b82f6_var(--range-progress),rgb(229,231,235)_var(--range-progress),rgb(229,231,235)_100%)] [&::-webkit-slider-runnable-track]:bg-[length:100%_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat"
                                    style={{ '--range-progress': `${(volume[index] || 1) * 100}%` } as React.CSSProperties}
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
