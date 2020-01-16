import React from'react';
import Bands from './Bands';
import audio from '../audio/audio.mp3';
import '../css/Container.css';
const numberOfBands = 25;
class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.frequencyBandArray = [...Array(numberOfBands).keys()];
    }

    initialize = () => {
        const audioFile = new Audio();
        audioFile.crossOrigin = "anonymous";
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audioFile);
        const analyser = audioContext.createAnalyser();
        audioFile.src = "https://drive.google.com/open?id=1k6ftsQupYbyoHiA8XUn93ngqURgiYCNT";
        analyser.fftSize = 64;
        source.connect(audioContext.destination);
        source.connect(analyser);
        audioFile.play();
        this.setState({
            audioData: analyser
        });
    }

    getData = (changeStyle) => {
        const bufferLength = this.state.audioData.frequencyBinCount;
        const amplitudeArray = new Uint8Array(bufferLength);
        this.state.audioData.getByteFrequencyData(amplitudeArray);
        changeStyle(amplitudeArray);
    }

    render() {
        return(
            <div>
                <Bands 
                initialize = {this.initialize}
                frequencyBandArray = {this.frequencyBandArray}
                getData = {this.getData}
                audioData = {this.state.audioData}
                />
            </div>
        );
    }
}
export default Container;


