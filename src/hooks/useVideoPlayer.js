import { useState, useEffect } from 'react';

const useVideoPlayer = (videoElement) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,
        speed: 1,
        isMuted: false,
        duration: 0,
    });

    const togglePlay = () => {
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying,
        });
    };

    useEffect(() => {
        playerState.isPlaying ? videoElement.current.play() : videoElement.current.pause();
    }, [videoElement, playerState]);

    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setPlayerState({
            ...playerState,
            progress,
        });
    };

    const handleVideoProgress = (event) => {
        const manualChange = Number(event);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange,
        });
    };

    const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setPlayerState({
            ...playerState,
            speed,
        });
    };

    const toggleMute = (value) => {
        setPlayerState({
            ...playerState,
            isMuted: value,
        });
    };

    const onVideoEnded = () => {
        if (playerState.progress === 100) {
            setPlayerState({
                ...playerState,
                isPlaying: false,
                progress: 0,
            });
        }
    };

    const getDuration = () => {
        setPlayerState({
            ...playerState,
            duration: videoElement.current.duration,
        });
    };

    useEffect(() => {
        playerState.isMuted ? (videoElement.current.muted = true) : (videoElement.current.muted = false);
    }, [playerState.isMuted, videoElement]);

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        onVideoEnded,
        getDuration,
    };
};

export default useVideoPlayer;
