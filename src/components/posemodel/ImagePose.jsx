import React, { useEffect, useCallback } from "react";
import * as posenet from '@tensorflow-models/posenet';
import dat from 'dat.gui';
import Stats from 'stats.js';
import {drawBoundingBox, drawKeypoints, drawSkeleton, isMobile, toggleLoadingUI, tryResNetButtonName, tryResNetButtonText, updateTryResNetButtonDatGuiCss} from './demo_util';
import "./Vidoe.css";
import yoga from '../icon/fffff.JPG'
import yoga2 from '../icon/yoga2.jpg'

const axios = require('axios');

export default function PosemodelImg(props) {
  const {style} = props;

  
  const estimatePoseOnImage = async(imageElement) => {
    // load the posenet model from a checkpoint
    const net = await posenet.load();
    console.log(imageElement)
    const pose = await net.estimateSinglePose(imageElement, {
      flipHorizontal: false
    });
    return pose;
  }

    const handleClick= async ()=>{
        const imageElement = document.getElementById('cat');
        const pose = await estimatePoseOnImage(imageElement);
        console.log(JSON.stringify(pose));  
    }

  
  return (
    <div style={style}>
          <img src={yoga2} id='cat' alt='123' height="600px" style={{height: '600px'}}>
          </img>
          <button onClick={handleClick} >
              click
          </button>
    </div>
  );
}
