import React from 'react';

function Colors(props) {
    return(
        <div onChange={props.setColor.bind(this)} className="row">
            <div className="col-md-2"><input type="radio" value="Red" name="color" /> Red</div>
            <div className="col-md-2"><input type="radio" value="Green" name="color" /> Green</div>
            <div className="col-md-2"><input type="radio" value="Blue" name="color" /> Blue</div>
        </div>
    );
}
export default Colors;