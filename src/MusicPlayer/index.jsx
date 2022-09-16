import { useState, useRef } from "react";

// import guitar from `${process.env}/audio/guitar.mp3";
// import sparkleWow from "../audio/sparkleWow.mp3";
// const sparkleWow = re

const allTracks = [
    'Dancing in the Sky',
    'Jealous of the Angels',
    'Hallelujah',
    'Angel',
    'Missing You',
    'Rescue - Instrumental',
    '21 Years',
    'Brave Soul'
]

const trackLists = {
    nameWall: [
        'Dancing in the Sky',
        'Jealous of the Angels',
        'Hallelujah',
        'Angel',
        'Missing You',
        'Rescue - Instrumental',
        '21 Years',
        'Brave Soul'
    ],
    photoWall: [
        'No Other Side',
        'Brave Soul',
        'Dancing in the Sky',
        '21 Years',
        'See You Again',
        'Missing You',
        'Gone Too Soon',
        'Scars in Heaven',
        'From Where You Are'
    ]
}

const MusicPlayer = ({playlistName}) => {
    console.log('playlist', playlistName)
    const [audioTrack, setAudio] = useState(0);
    const [audioPlaying, setPlaying] = useState(true);

    const audioRef = useRef(null);
    const activePlaylist = trackLists[playlistName];
    console.log(activePlaylist)

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