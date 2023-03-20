import { useState, useRef, useEffect } from "react";


const trackLists = {
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

const MusicPlayer = ({playlistName, playing = true}) => {
    const [audioTrack, setAudio] = useState(0);
    const [audioPlaying, setPlaying] = useState(playing);

    const audioRef = useRef(null);
    const activePlaylist = trackLists[playlistName] || trackLists['photoWall'];

    const skipTrack = async () => {
        const newIndex = audioTrack === activePlaylist.length - 1 ? 0 : audioTrack + 1;
        setAudio(newIndex);
        audioRef.current.play();
    }

    const togglePlay = (e, playing = audioPlaying) => {
        // console.log('go go', playing)
        playing ? audioRef.current.pause() : audioRef.current.play();
        setPlaying(!playing);

    }

    useEffect(() => {
        togglePlay(!playing)
    }, [playing])



    return (
        <div style={{position: 'relative'}}>
            <p style={{position: 'absolute', bottom: '100%', color: '#ffffff', textTransform: 'uppercase', fontWeight: '700'}}>{activePlaylist[audioTrack]}</p>
            <div style={{display: 'flex'}}>
                <audio ref={audioRef} src={'https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/music/' + activePlaylist[audioTrack].replace(/ /g, '-') + '.mp3'} autoPlay onEnded={skipTrack}/>
                <div className={"add-btn " + (audioPlaying ? 'active' : '')} tabIndex={0} onClick={togglePlay}>
                    {audioPlaying ? 'Pause' : 'Play'}
                </div>
                <div className="add-btn" tabIndex={0} onClick={skipTrack}>
                    Skip
                </div>

            </div>
        </div>
    )
}

export default MusicPlayer;