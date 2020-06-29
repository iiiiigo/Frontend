import { useEffect, useState } from "react";
import move from "../components/icon/move.gif";
import img1 from "../components/icon/111.gif";
import img2 from "../components/icon/222.gif";
import img3 from "../components/icon/333.gif";
import img4 from "../components/icon/4_1.gif";
import img5 from "../components/icon/5_1.gif";
import forward from "../components/icon/forwardNeck.JPG";
import { useHistory } from "react-router-dom";
import { SINGLE_PERSON_INFERENCE_CONFIG } from "@tensorflow-models/posenet/dist/posenet_model";
const axios = require("axios");

const staticData = [
  {
    index: 0,
    postureName: "앞목과 쇄골 스트레칭",
    img: img1,
    discription:
      "두 팔을 들어 120'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔 안쪽이 당기는 느낌을 받습니다. 10초 유지합니다.",
    progressPercent: 20
  },
  {
    index: 1,
    postureName: "날개뼈 근육 스트레칭",
    img: img2,
    discription:
      "두 팔을 위로 쭉 뻗은 후 천천히 팔을 굽히며 90'c 각도를 만들어 유지합니다. 10초 유지합니다. (조금 더 강도를 세게 하고 싶은 경우 가벼운 아령을 들고 자세를 취합니다.)",
    progressPercent: 40
  },
  {
    index: 2,
    postureName: "승모근 스트레칭",
    img: img3,
    discription:
      "한쪽 손바닥을 반대쪽 귀를 덮게 한 후 쭉 늘립니다. 이때 어깨가 딸려가지 않도록 주의합니다. 반대쪽 팔을 아래로 뻗으며 팔 안쪽과 어깨 ,목이 늘어나는 느낌을 느끼며 10초 유지합니다.",
    progressPercent: 60
  },
  {
    index: 3,
    postureName: "소흉근 및 대흉근 스트레칭",
    img: img4,
    discription:
      "두 손을 뒤통수에 대고, 두 팔꿈치과 뒷목이 수평을 이루도록 팔꿈치를 뒤쪽으로 당깁니다. 허리가 말리지 않도록 주의하며 10초 유지합니다.",
    progressPercent: 80
  },
  {
    index: 4,
    postureName: "합장 자세",
    img: img5,
    discription:
      "두 손바닥을 마주한 채 얼굴 앞에 두고 두 팔이 수평이 되도록 마주한 손바닥을 쭉 아래로 내립니다. 손목이 늘어나는 것을 느끼며 10초 유지합니다.",
    progressPercent: 100
  }
];

export const useCorrectPose = () => {
  let history = useHistory();
  const [poseData, setPoseData] = useState({
    start: false,
    color: "primary",
    text: "왼쪽 영상에 맞게 자세를 취해주세요.",
    index: 0,
    postureName: "앞목과 쇄골 스트레칭",
    img: img1,
    discription:
      "두 팔을 들어 120'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔 안쪽이 당기는 느낌을 받습니다. 10초 유지합니다.",
    progressPercent: 20,
    trueStack: 0,
    falseStack: 0
  });
  const [posePosition, setPosePosition] = useState([]);

  //const [isLoading, setIsLoading] = useState(false);
  const goServer = async () => {
    //서버에 요청 보내고 리턴값 받기
    console.log("처음." + poseData.index + " , " + poseData.trueStack);
    let tmp = false;
    if (posePosition.score) {
      console.log(
        "score : " + posePosition.score + " index : " + poseData.index
      );
      const data = await axios.post("http://localhost:3001/data", {
        index: poseData.index,
        ...posePosition
      });
      tmp = data.data.result;
    }
    console.log(tmp);

    //서버와 연동

    if (tmp) {
      setPoseData(value => {
        return {
          ...value,
          trueStack: value.trueStack + 1,
          falseStack: 0,
          color: "primary",
          text: "올바른 동작입니다."
        };
      });
    } else {
      setPoseData(value => {
        return {
          ...value,
          falseStack: value.falseStack + 1,
          color: "danger",
          text: "틀린 자세입니다. 자세를 고쳐주세요."
        };
      });
    }
  };
  const timeTmp = () => {
    setPoseData(value => {
      return {
        ...value,
        start: true
      };
    });
  };
  useEffect(() => {
    if (poseData.index === 4 && poseData.trueStack === 10) {
      history.push("/finish");
    }
    if (poseData.trueStack < 11) {
      const tempVar = setInterval(() => {
        goServer();
      }, 1000);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poseData]);

  console.log(poseData.index);

  const InputPosePosition = (data, score) => {
    setPosePosition(value => {
      return { score: score, ...data };
    });
  };

  return [{ poseData, posePosition }, setPoseData, InputPosePosition];
};
