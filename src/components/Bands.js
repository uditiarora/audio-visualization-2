import React, { useRef, Component } from 'react';
import Upload from './Upload';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import '../css/Bands.css';
import Colors from './Colors';




class Bands extends Component {

    constructor(props){
      super(props);

      const useStyles = makeStyles(theme => ({
        flexContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingTop: '25%'
        }
      }));
      this.classes = useStyles();
      this.amplitudeValues = null;
    }
    
    adjustStyle(newData){
        this.amplitudeValues.current = newData;
        let domElements = this.props.frequencyBandArray.map((num) => document.getElementById(num));
      this.props.frequencyBandArray.forEach((num) => {
        domElements[num].style.backgroundColor = `rgb(255, ${this.amplitudeValues.current[num]}, 0)`
        domElements[num].style.height = `${this.amplitudeValues.current[num]/1.2}px`
      });
    };

    runSpectrum(){
        this.props.getData(this.adjustStyle);
        requestAnimationFrame(this.runSpectrum);
    };
    
    handleStartButton(){
        this.props.initialize();
        requestAnimationFrame(this.staterunSpectrum);
    };

    


    render(){
      
      return(
      <div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Upload />
              </div>
              <div className="col-md-2">
                <Tooltip title = "Start" aria-label = "Start" placement = "right">
                    <IconButton id = "startButton" onClick = {() => this.handleStartButton()} disabled = {!!this.props.audioData ? true : false}>
                        <PlayCircleOutlineIcon  />
                    </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-6">
                <Colors setColor = {this.props.setColor} />
              </div>
            </div>
            
          </div>
          <div className={this.classes.flexContainer}>
            {this.props.frequencyBandArray.map((num) =>
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
    }
};
export default Bands;