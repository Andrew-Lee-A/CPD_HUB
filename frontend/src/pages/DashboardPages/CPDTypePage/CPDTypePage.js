import React from 'react'
import './cpdtypepage.scss'

var __html = require('./CpdTypeHtml.js');
var template = { __html: __html };

const CPD_typePage = () => {
  return (
    <div className='cpdType'><span className="cpdTypeSpan" dangerouslySetInnerHTML={template}></span></div>
  )
}

export default CPD_typePage