import { useEffect, useState } from "react";
import move from "../components/icon/move.gif";
import forward from "../components/icon/forwardNeck.JPG";
const staticData = [
  {
    postureName: "목 늘리기 자세",
    img: move,
    discription:
      "양 팔을 들어 90'c 각도를 유지한 채로 날개뼈를 모으고 고개를 들면서 팔 안쪽이 당기는 느낌을 받습니다. 10초 유지합니다.",
    progressPercent: 20
  },
  {
    postureName: "예시2",
    img: forward,
    discription: "예시2 설명",
    progressPercent: 40
  },
  { postureName: "", img: "", discription: "", progressPercent: "" },
  { postureName: "", img: "", discription: "", progressPercent: "" },
  { postureName: "", img: "", discription: "", progressPercent: "" }
];

export const useCorrectPoseUpdate = (id, data) => {
  const [employee, setEmployee] = useState({
    postureName: "",
    img: "",
    discription: "",
    progressPercent: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmployee({
      id,
      name: data.employee_name,
      salary: data.employee_salary,
      age: data.employee_age
    });
  }, [data, id]);
};
