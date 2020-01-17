import React from'react';
import Bands from './Bands';
import audio from '../audio/audio.mp3';
import '../css/Container.css';
const numberOfBands = 25;
class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bandColor: "Blue"
        };
        this.frequencyBandArray = [...Array(numberOfBands).keys()];
    }

    initialize = () => {
        const audioFile = new Audio();
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audioFile);
        const analyser = audioContext.createAnalyser();
        audioFile.src = audio;
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

    setColor = (event) => {
        this.setState({bandColor: event.target.value});
    }

    render() {
        return(
            <div>
                <Bands 
                initialize = {this.initialize}
                frequencyBandArray = {this.frequencyBandArray}
                getData = {this.getData}
                audioData = {this.state.audioData}
                setColor = {this.setColor}
                bandColor = {this.state.bandColor}
                />
            </div>
        );
    }
}
export default Container;


