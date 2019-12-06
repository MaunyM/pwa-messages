import React, {useRef, useEffect} from 'react';

function Camera() {

    const playerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
            const player = playerRef.current;
            player.srcObject = stream;
        });
    }, []);

    const captureClicked = function () {
        const player = playerRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(player, 0, 0, (canvas.width)/2, (canvas.height/2))
    };

    return (
        <div>
            <video id="player" controls autoPlay={true} ref={playerRef} width='320' height='240'/>
            <canvas id="canvas" width='320' height='240' ref={canvasRef}/>
            <button id="capture" onClick={captureClicked}>Capture</button>
        </div>
    );
}

export default Camera;
