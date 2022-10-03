import { useState, useRef } from "react";


const trackLists = {
    nameWall: [
        'No Other Side',
        'Dancing in the Sky',
        'Missing You',
        'Hallelujah',
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
        'Missing You',
        'Gone Too Soon',
        'Scars in Heaven',
        'From Where You Are',
        'Miss You All The Time',
        'Brave Soul'
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
        'Brave Soul'
    ]
}

const MusicPlayer = ({playlistName}) => {
    const [audioTrack, setAudio] = useState(0);
    const [audioPlaying, setPlaying] = useState(true);

    const audioRef = useRef(null);
    const activePlaylist = trackLists[playlistName];

    const skipTrack = () => {
        const newIndex = audioTrack === activePlaylist.length - 1 ? 0 : audioTrack + 1;
        setAudio(newIndex);
        audioRef.current.play();
    }

    const togglePlay = () => {
        audioPlaying ? audioRef.current.pause() : audioRef.current.play();

        setPlaying(!audioPlaying);
    }

    return (
        <div style={{position: 'relative'}}>
            <p style={{position: 'absolute', bottom: '100%'}}>{activePlaylist[audioTrack]}</p>
            <div style={{display: 'flex'}}>
                <audio ref={audioRef} src={'https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/' + activePlaylist[audioTrack] + '.mp3'} autoPlay onEnded={skipTrack}/>
                <div className="add-btn" tabIndex={0} onClick={togglePlay}>
                    Pause/Play
                </div>
                <div className="add-btn" tabIndex={0} onClick={skipTrack}>
                    Skip
                </div>

            </div>
        </div>
    )
}

export default MusicPlayer;