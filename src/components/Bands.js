import React, { useRef } from 'react';
import Upload from './Upload';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import '../css/Bands.css';
const useStyles = makeStyles(theme => ({
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: '25%'
    }
}));


function Bands(props){
    const classes = useStyles();
    const amplitudeValues = useRef(null);
    function adjustStyle(newData){
        amplitudeValues.current = newData;
        let domElements = props.frequencyBandArray.map((num) => document.getElementById(num));
      props.frequencyBandArray.forEach((num) => {
        domElements[num].style.backgroundColor = `rgb(255, ${amplitudeValues.current[num]}, 255)`
        domElements[num].style.height = `${amplitudeValues.current[num]/1.2}px`
      });
    };

    function runSpectrum(){
        props.getData(adjustStyle);
        requestAnimationFrame(runSpectrum);
    };
    
    function handleStartButton(){
        props.initialize();
        requestAnimationFrame(runSpectrum);
    };


    return(
    <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Upload />
            </div>
            <div className="col-md-4">
              <Tooltip title = "Start" aria-label = "Start" placement = "right">
                  <IconButton id = "startButton" onClick = {() => handleStartButton()} disabled = {!!props.audioData ? true : false}>
                      <PlayCircleOutlineIcon  />
                  </IconButton>
              </Tooltip>
            </div>
          </div>
          
        </div>
        <div className={classes.flexContainer}>
          {props.frequencyBandArray.map((num) =>
            <Paper
              className={'frequencyBands'}
              elevation={4}
              id={num}
              key={num}
            />
          )}
        </div>

    </div>
    );
};
export default Bands;