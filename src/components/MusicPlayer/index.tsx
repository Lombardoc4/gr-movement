import { useState, useRef, useMemo } from "react";
import { styled } from "styled-components";

interface trackListProps {
    nameWall: string[],
    photoWall: string[],
    teenWall: string[]
}

interface MusicPlayerProps {
    playlistName: 'nameWall' | 'teenWall' | 'photoWall',
}

interface StyledPlayerProps {
    $open: boolean
}

interface ProgressProps {
    $progress : number
}

const trackLists: trackListProps = {
    nameWall: [
        'No Other Side',
        'Dancing in the Sky',
        'Missing You',
        'Hallelujah',
        'Silent Screams',
        'Angel',
        '21 Years',
        'Jealous of the Angels',
        'Rescue - Instrumental',
        'Miss You All The Time'

    ],
    photoWall: [
        'No Other Side',
        'Dancing in the Sky',
        '21 Years',
        'See You Again',
        'Silent Screams',
        'Missing You',
        'Gone Too Soon',
        'Scars in Heaven',
        'From Where You Are',
        'Miss You All The Time',
    ],
    teenWall: [
        'No Other Side',
        'Dancing in the Sky',
        '21 Years',
        'Forever Young',
        'Epidemic',
        'Sailing',
        'Silent Screams',
        'Hero',
        'See You Again',
        'Fly',
        'I Hope You Dance',
        'As It Was',
        'Memories',
        'Photograph',
    ]
}

const StyledPlayer = styled.div<StyledPlayerProps>`
    position: absolute;
    top: calc(100% + 3em);
    right: -1em;
    background-color: #ffffff;

    opacity: ${({ $open }) => $open ? '1' : 0};
    transition: opacity 0.3s;

    min-width: 250px;
    border-radius: 8px;


    p {
        padding: 1em;
        font-size: 18px;
        font-weight: 700;
    }

    .buttons {
        padding: 1em;
        display: flex;
        gap: 1em;

        button {
            width: 100%;
        }
    }
`;


const ProgressBar = styled.div<ProgressProps>`
    background-color: #4d4d4d;
    height: 4px;
    width: 100%;

    .progress {
        background-color: #f1f1f1;
        height: 4px;
        width: 100%;
        transform-origin: left;
        transform: scaleX(${({$progress}) => $progress});
        transition: transform 0.01s;
    }
`;

const MusicPlayer = ({playlistName} : MusicPlayerProps) => {
    const [audioTrack, setAudio] = useState(0);
    const [audioProgress, setAudioProgress] = useState(0);
    const [audioPlaying, setPlaying] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);


    const audioRef = useRef<HTMLAudioElement>(null);
    const activePlaylist = trackLists[playlistName] || trackLists['photoWall'];
    const audioSrc = useMemo(() => 'https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/music/' + activePlaylist[audioTrack].replace(/ /g, '-') + '.mp3', [audioTrack])

    const skipTrack = async () => {
        setAudio(audioTrack === activePlaylist.length - 1 ? 0 : audioTrack + 1);
        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    // Toggle music from its current state
    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlaying(false);
        }
    }

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlaying(true);
        }
    }

    const updateProgress = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        setAudioProgress(Math.floor(((e.currentTarget.currentTime / e.currentTarget.duration) * 1000)) / 1000);
    }

    const openPlayer = () => {
        setPlayerOpen(!playerOpen)

        // If player was open stop music
        // togglePlay(true)
    }



    return (
        <div style={{position: 'relative'}}>
            <button onClick={() => openPlayer()}>{ playerOpen ? 'Hide Player' : 'Music Player' }</button>

            <StyledPlayer $open={playerOpen} >
                <p >{activePlaylist[audioTrack]}</p>

                <ProgressBar $progress={audioProgress}>
                    <div className="progress"/>
                </ProgressBar>

                <div className="buttons">
                    <audio
                    ref={audioRef}
                    src={audioSrc}
                    // autoPlay
                    onTimeUpdate={updateProgress}
                    onEnded={skipTrack}/>

                    <button onClick={() => audioPlaying ? stopAudio() : playAudio()}>
                        {audioPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={skipTrack}>
                        Skip
                    </button>
                </div>
            </StyledPlayer>

        </div>
    )
}

export default MusicPlayer;