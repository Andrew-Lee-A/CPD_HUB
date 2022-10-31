import React from "react";
import './progressbar.scss'

import ProgressBar from "@ramonak/react-progress-bar";

const Example = () => {
  return (
    <div className="progressBar">
        <div>
            <h3>Days to submit - 273 days left</h3>
        </div>
        <ProgressBar completed={79} bgColor='#0b1e47'/>
    </div>
  )
};

export default Example;