import React from "react";
import "./Popup.css"

const Popup=(props)=>{
    return  <>
        <div className="outer-div">
            <div className="inner-div">
                {props.children}
            </div>
        </div>
    </> 
}

export default Popup