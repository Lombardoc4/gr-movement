const guitar = require("../audio/guitar.mp3");

const allTracks = [
    'Track1',
    'Track2',
    'Track3',
    'Track4',
    'Track5'
]

const MusicPlayer = () => {
    const trackTitle = "Track 1";

    return (
        <div style={{position: 'relative'}}>
            <p style={{position: 'absolute', bottom: '100%'}}>{trackTitle}</p>
            <div style={{display: 'flex'}}>
                <audio src={trackTitle}/>
                <div className="add-btn" tabIndex={0} onClick={() => {}}>
                    Pause/Play
                </div>
                <div className="add-btn" tabIndex={0} onClick={() => {}}>
                    Skip
                </div>

            </div>
        </div>
    )
}

export default MusicPlayer;