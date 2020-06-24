import { useEffect, useState } from "react";
import move from "../components/icon/move.gif";
import img1 from "../components/icon/111.gif";
import img2 from "../components/icon/222.gif";
import img3 from "../components/icon/333.gif";
import img4 from "../components/icon/444.gif";
import img5 from "../components/icon/555.gif";
import forward from "../components/icon/forwardNeck.JPG";
import { useHistory } from "react-router-dom";
import { SINGLE_PERSON_INFERENCE_CONFIG } from "@tensorflow-models/posenet/dist/posenet_model";
const axios = require('axios');


const staticData = [
  {
    index: 0,
    postureName: "목 늘리기 자세",
    img: img1,
    discription:
      "양 팔을 들어 90'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔 안쪽이 당기는 느낌을 받습니다. 10초 유지합니다.",
    progressPercent: 20
  },
  {
    index: 1,
    postureName: "예시2",
    img: img2,
    discription: "예시2 설명",
    progressPercent: 40
  },
  {
    index: 2,
    postureName: "예시3",
    img: img3,
    discription: "예시3 설명",
    progressPercent: 60
  },
  {
    index: 3,
    postureName: "예시4",
    img: img4,
    discription: "예시4 설명",
    progressPercent: 80
  },
  {
    index: 4,
    postureName: "예시5",
    img: img5,
    discription: "예시5 설명",
    progressPercent: 100
  }
];

export const useCorrectPose = () => {
  let history = useHistory();
  const [poseData, setPoseData] = useState({
    start: false,
    index: 0,
    postureName: "목 늘리기 자세",
    img: img1,
    discription:
      "양 팔을 들어 90'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔 안쪽이 당기는 느낌을 받습니다. 10초 유지합니다.",
    progressPercent: 20,
    trueStack: 0,
    falseStack: 0
  });
  const [posePosition, setPosePosition] = useState([]);

  //const [isLoading, setIsLoading] = useState(false);
  const goServer = async () => {
    //서버에 요청 보내고 리턴값 받기
    console.log(posePosition)
    console.log("처음." + poseData.index + " , " + poseData.trueStack);
    const tmp = await axios.post('http://localhost:3001/data', posePosition)
    //서버와 연동
    if (tmp) {
      setPoseData(value => {
        return {
          ...value,
          trueStack: value.trueStack + 1
        };
      });
    } else {
      setPoseData(value => {
        return {
          ...value,
          falseStack: value.falseStack + 1
        };
      });
    }
  };
  const timeTmp = () => {setPoseData(value => {
    return{
      ...value, 
      start: true
    }
  })};
  useEffect(() => {
    if (poseData.start === false) {
      setInterval(timeTmp, 5000);
    }else{
      if (poseData.index === 4 && poseData.trueStack === 5) {
        history.push("/");
      }
      if (poseData.trueStack < 6) {
        const tempVar = setInterval(() => {
          goServer();
        }, 2000);
  
        return function cleanup() {
          clearInterval(tempVar);
        };
      } else {
        let currentIndex = poseData.index;
        currentIndex += 1;
        setPoseData({
          ...staticData[currentIndex],
          trueStack: 0,
          falseStack: 0
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poseData]);

  const InputPosePosition = (data) => {
    setPosePosition({index : poseData.index,...data});
  }

  return [{ poseData, posePosition }, setPoseData, InputPosePosition];
};
