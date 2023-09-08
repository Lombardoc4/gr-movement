import { useState, useRef, useMemo } from "react";
import { styled } from "styled-components";
// import useMediaQuery from "../../utils/hooks/useMediaQuery";

interface trackListProps {
    nameWall: string[],
    photoWall: string[],
    teenWall: string[]
}

interface MusicPlayerProps {
    playlistName: 'nameWall' | 'teenWall' | 'photoWall',
}

// interface StyledPlayerProps {
//     $open: boolean
// }

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

const StyledPlayer = styled.div`
    background-color: #ffffff;
    box-shadow: 0 0 0 2px #000000, 0 0 0 4px #ffffff;
    color: #000000;

    border-radius: 8px;

    display: flex;
    flex-direction: column;


    .heading {
        display: flex;
        gap: 1em;
        align-items: center;
        padding: 1em;
        font-size: 18px;
        font-weight: 700;

        svg, p {
            margin: 0;
        }
    }

    .buttons {
        padding: 1em;
        display: flex;
        gap: 1em;

        button, .btn {
            width: 100%;
        }
    }

    @media (min-width: 768px) {
        /* position: absolute; */
        /* right: -1em; */
        /* left: unset; */
        /* transform: translateX(0); */
    }

`;


const ProgressBar = styled.div<ProgressProps>`
    background-color: #000000;
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
    // const [playerOpen, setPlayerOpen] = useState(false);
    // const isMobile = useMediaQuery('(max-width: 768px)');



    const audioRef = useRef<HTMLAudioElement>(null);
    const activePlaylist = trackLists[playlistName] || trackLists['photoWall'];
    const audioSrc = useMemo(() => 'https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/music/' + activePlaylist[audioTrack].replace(/ /g, '-') + '.mp3', [audioTrack])

    const skipTrack = async () => {
        setAudio(audioTrack === activePlaylist.length - 1 ? 0 : audioTrack + 1);

        // If music is playing, keep playing on skip
        if (audioPlaying) {

            setTimeout(() => {

                if (audioRef.current) {
                    audioRef.current.play();
                }
            }, 50)
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

    // const openPlayer = () => {
    //     setPlayerOpen(!playerOpen)

    //     // If player was open stop music
    //     // togglePlay(true)
    // }



    return (
        // <div style={{position: 'relative'}}>
        <>
            {/* <div className="btn" onClick={() => openPlayer()} style={{position: 'relative'}}>
                { isMobile ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"viewBox="0 0 16 16">
                        <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                        <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
                        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                        <path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg> :
                    'Music'
                } */}


            <StyledPlayer onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} >
                <div className="heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-music-note-beamed" viewBox="0 0 16 16">
                        <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                        <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                        <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
                    </svg>
                    <p >{activePlaylist[audioTrack]}</p>
                </div>

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

                    <button className="btn__border" onClick={() => audioPlaying ? stopAudio() : playAudio()}>
                        {audioPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button className="btn__border" onClick={skipTrack}>
                        Skip
                    </button>
                </div>
            </StyledPlayer>
            {/* </div> */}

        </>
    )
}

export default MusicPlayer;