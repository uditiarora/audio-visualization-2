import React, { Component } from 'react';
import '../css/Upload.css';
import axios from 'axios';
class Upload extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedFile : null
        }
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded:0
        });
    }

    onClickHandler = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        axios.post("http://localhost:8000/upload", data)
       .then(res => {
           console.log(res.statusText)
       });
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className = "col-md-8"> 
                        <form method="post" action="#" id = "#">
                            <div className="form-group">
                                <input type = "file" className= "form-control" multiple="" name="file" onChange={this.onChangeHandler}/>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className="btn btn-primary" onClick={this.onClickHandler}>Upload</button>
                    </div>
                </div>  
            </div>
        );
    }
}
export default Upload;