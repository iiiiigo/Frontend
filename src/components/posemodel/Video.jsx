import React, { useEffect, useCallback } from "react";
import * as posenet from '@tensorflow-models/posenet';
import dat from 'dat.gui';
import Stats from 'stats.js';
import {drawBoundingBox, drawKeypoints, drawSkeleton, isMobile, toggleLoadingUI, tryResNetButtonName, tryResNetButtonText, updateTryResNetButtonDatGuiCss} from './demo_util';
import "./Vidoe.css";

const axios = require('axios');

const videoWidth = 600;
const videoHeight = 500;
const stats = new Stats();

export default function Posemodel(props) {
  const {posePosition, setPosition} = props;
  async function setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
          'Browser API navigator.mediaDevices.getUserMedia not available');
    }
  
    const video = document.getElementById('video');
    video.width = videoWidth;
    video.height = videoHeight;
  
    const mobile = isMobile();
    const stream = await navigator.mediaDevices.getUserMedia({
      'audio': false,
      'video': {
        facingMode: 'user',
        width: mobile ? undefined : videoWidth,
        height: mobile ? undefined : videoHeight,
      },
    });
    video.srcObject = stream;
  
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }
  
  async function loadVideo() {
    const video = await setupCamera();
    video.play();
  
    return video;
  }
  
  const defaultQuantBytes = 2;
  
  const defaultMobileNetMultiplier = isMobile() ? 0.50 : 0.75;
  const defaultMobileNetStride = 16;
  const defaultMobileNetInputResolution = 500;
  
  const defaultResNetMultiplier = 1.0;
  const defaultResNetStride = 32;
  const defaultResNetInputResolution = 250;
  
  const guiState = {
    algorithm: 'multi-pose',
    input: {
      architecture: 'MobileNetV1',
      outputStride: defaultMobileNetStride,
      inputResolution: defaultMobileNetInputResolution,
      multiplier: defaultMobileNetMultiplier,
      quantBytes: defaultQuantBytes
    },
    singlePoseDetection: {
      minPoseConfidence: 0.1,
      minPartConfidence: 0.5,
    },
    multiPoseDetection: {
      maxPoseDetections: 5,
      minPoseConfidence: 0.15,
      minPartConfidence: 0.1,
      nmsRadius: 30.0,
    },
    output: {
      showVideo: true,
      showSkeleton: true,
      showPoints: true,
      showBoundingBox: false,
    },
    net: null,
  };
  
  /**
   * Sets up dat.gui controller on the top-right of the window
   */
  function setupGui(cameras, net) {
    guiState.net = net;
  
    if (cameras.length > 0) {
      guiState.camera = cameras[0].deviceId;
    }
  
    // const gui = new dat.GUI({width: 0});
    // dat.GUI.toggleHide();
    // let architectureController = null;
    // guiState[tryResNetButtonName] = function() {
    //   architectureController.setValue('ResNet50')
    // };
    // gui.add(guiState, tryResNetButtonName).name(tryResNetButtonText);
    // updateTryResNetButtonDatGuiCss();
  
    // The single-pose algorithm is faster and simpler but requires only one
    // person to be in the frame or results will be innaccurate. Multi-pose works
    // for more than 1 person
  
    // The input parameters have the most effect on accuracy and speed of the
    // network
    // Architecture: there are a few PoseNet models varying in size and
    // accuracy. 1.01 is the largest, but will be the slowest. 0.50 is the
    // fastest, but least accurate.
    guiState.architecture = guiState.input.architecture;

  }
  
  /**
   * Sets up a frames per second panel on the top-left of the window
   */
  function setupFPS() {
    stats.showPanel(0);  // 0: fps, 1: ms, 2: mb, 3+: custom
    document.getElementById('main').appendChild(stats.dom);
  }
  
  /**
   * Feeds an image to posenet to estimate poses - this is where the magic
   * happens. This function loops with a requestAnimationFrame method.
   */
  function detectPoseInRealTime(video, net) {
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');
  
    // since images are being fed from a webcam, we want to feed in the
    // original image and then just flip the keypoints' x coordinates. If instead
    // we flip the image, then correcting left-right keypoint pairs requires a
    // permutation on all the keypoints.
    const flipPoseHorizontal = true;
  
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  
    async function poseDetectionFrame() {
      if (guiState.changeToArchitecture) {
        // Important to purge variables and free up GPU memory
        guiState.net.dispose();
        toggleLoadingUI(true);
        guiState.net = await posenet.load({
          architecture: guiState.changeToArchitecture,
          outputStride: guiState.outputStride,
          inputResolution: guiState.inputResolution,
          multiplier: guiState.multiplier,
        });
        toggleLoadingUI(false);
        guiState.architecture = guiState.changeToArchitecture;
        guiState.changeToArchitecture = null;
      }
  
      if (guiState.changeToMultiplier) {
        guiState.net.dispose();
        toggleLoadingUI(true);
        guiState.net = await posenet.load({
          architecture: guiState.architecture,
          outputStride: guiState.outputStride,
          inputResolution: guiState.inputResolution,
          multiplier: +guiState.changeToMultiplier,
          quantBytes: guiState.quantBytes
        });
        toggleLoadingUI(false);
        guiState.multiplier = +guiState.changeToMultiplier;
        guiState.changeToMultiplier = null;
      }
  
      if (guiState.changeToOutputStride) {
        // Important to purge variables and free up GPU memory
        guiState.net.dispose();
        toggleLoadingUI(true);
        guiState.net = await posenet.load({
          architecture: guiState.architecture,
          outputStride: +guiState.changeToOutputStride,
          inputResolution: guiState.inputResolution,
          multiplier: guiState.multiplier,
          quantBytes: guiState.quantBytes
        });
        toggleLoadingUI(false);
        guiState.outputStride = +guiState.changeToOutputStride;
        guiState.changeToOutputStride = null;
      }
  
      if (guiState.changeToInputResolution) {
        // Important to purge variables and free up GPU memory
        guiState.net.dispose();
        toggleLoadingUI(true);
        guiState.net = await posenet.load({
          architecture: guiState.architecture,
          outputStride: guiState.outputStride,
          inputResolution: +guiState.changeToInputResolution,
          multiplier: guiState.multiplier,
          quantBytes: guiState.quantBytes
        });
        toggleLoadingUI(false);
        guiState.inputResolution = +guiState.changeToInputResolution;
        guiState.changeToInputResolution = null;
      }
  
      if (guiState.changeToQuantBytes) {
        // Important to purge variables and free up GPU memory
        guiState.net.dispose();
        toggleLoadingUI(true);
        guiState.net = await posenet.load({
          architecture: guiState.architecture,
          outputStride: guiState.outputStride,
          inputResolution: guiState.inputResolution,
          multiplier: guiState.multiplier,
          quantBytes: guiState.changeToQuantBytes
        });
        toggleLoadingUI(false);
        guiState.quantBytes = guiState.changeToQuantBytes;
        guiState.changeToQuantBytes = null;
      }
  
      // Begin monitoring code for frames per second
      stats.begin();
  
      let poses = [];
      let minPoseConfidence;
      let minPartConfidence;
      switch (guiState.algorithm) {
        case 'single-pose':
          const pose = await guiState.net.estimatePoses(video, {
            flipHorizontal: flipPoseHorizontal,
            decodingMethod: 'single-person'
          });
          poses = poses.concat(pose);
          minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
          minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;
          break;
        case 'multi-pose':
          let all_poses = await guiState.net.estimatePoses(video, {
            flipHorizontal: flipPoseHorizontal,
            decodingMethod: 'multi-person',
            maxDetections: guiState.multiPoseDetection.maxPoseDetections,
            scoreThreshold: guiState.multiPoseDetection.minPartConfidence,
            nmsRadius: guiState.multiPoseDetection.nmsRadius
          });
  
          poses = poses.concat(all_poses);
          minPoseConfidence = +guiState.multiPoseDetection.minPoseConfidence;
          minPartConfidence = +guiState.multiPoseDetection.minPartConfidence;
          break;
          default :
            break;
      }
      try{
        setPosition(poses[0].keypoints, poses[0].score);
      }catch{}


      ctx.clearRect(0, 0, videoWidth, videoHeight);
      if (guiState.output.showVideo) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();
      }
  
      // For each pose (i.e. person) detected in an image, loop through the poses
      // and draw the resulting skeleton and keypoints if over certain confidence
      // scores
      poses.forEach(({score, keypoints}) => {
        if (score >= minPoseConfidence) {
          if (guiState.output.showPoints) {
            drawKeypoints(keypoints, minPartConfidence, ctx);
          }
          if (guiState.output.showSkeleton) {
            drawSkeleton(keypoints, minPartConfidence, ctx);
          }
          if (guiState.output.showBoundingBox) {
            drawBoundingBox(keypoints, ctx);
          }
        }
      });
  
      // End monitoring code for frames per second
      stats.end();
  
      requestAnimationFrame(poseDetectionFrame);
    }
  
    poseDetectionFrame();
  }
  
  /**
   * Kicks off the demo by loading the posenet model, finding and loading
   * available camera devices, and setting off the detectPoseInRealTime function.
   */
  async function bindPage() {
    toggleLoadingUI(true);
    const net = await posenet.load({
      architecture: guiState.input.architecture,
      outputStride: guiState.input.outputStride,
      inputResolution: guiState.input.inputResolution,
      multiplier: guiState.input.multiplier,
      quantBytes: guiState.input.quantBytes
    });
    toggleLoadingUI(false);
  
    let video;
  
    try {
      video = await loadVideo();
    } catch (e) {
      let info = document.getElementById('info');
      info.textContent = 'this browser does not support video capture,' +
          'or this device does not have a camera';
      info.style.display = 'block';
      throw e;
    }
    setupGui([], net);
    // setupFPS();
    detectPoseInRealTime(video, net);
  }
  
  navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  // kick off the demo

  useEffect(()=>{
    bindPage();
  }, [])
  
  // const handleClickSendData = async () => {
  //   console.log(tempData)
  //   await axios.post('http://localhost:3001/data', tempData).then(value => {
  //     console.log(value);
  //   })
  // }

  return (
    <div style={{width: '100%'}}>
          <div id="loading" style={{display:'flex'}}>
            <div class="sk-spinner sk-spinner-pulse">
            </div>
          </div>
          <div id='main' style={{display: 'none', width: '100%'}}>
              <video id="video" playsinline style={{display: 'none', width: '320px'}}>
              </video>
              <canvas id="output" style={{width: '100%'}}/>
          </div>
          {/* <button onClick={handleClickSendData} >데이터 전송</button> */}
    </div>
  );
}
