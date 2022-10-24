import React from 'react'
import './cpdrecordinguserguidepage.scss'

var __html = require('./CPDRecordingUserGuide.js');
var template = { __html: __html };

const CPD_Recording_Page = () => {
  return (
    <div className='cpdRecordingUserGuide'>
      <span className="cpdRecordingUserGuide-span" dangerouslySetInnerHTML={template}></span>
    </div>
  )
}

export default CPD_Recording_Page