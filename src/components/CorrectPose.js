import React, { useState } from "react";

import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Progress,
  Alert
} from "reactstrap";
import move from "../components/icon/move.gif";
import { Posemodel } from "./";
import "./component.css";
import { useCorrectPose } from "../hooks";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [
    { poseData, posePosition },
    setPoseData,
    InputPosePosition
  ] = useCorrectPose();

  return (
    <span>
      <hr></hr>
      <Container>
        <Row xs="12">
          <Col xs="7">
            <h1>거북목 교정 스트레칭</h1>
          </Col>
          <Col xs="4">
            <Alert color={poseData.color}>{poseData.text}</Alert>
          </Col>
          <Col>
            <CircularProgressbar
              id="circle"
              value={poseData.trueStack * 10}
              text={`${poseData.trueStack * 10}%`}
              strokeWidth="20"
              styles={buildStyles({
                pathColor: "#ff6464",
                textColor: "#000000",
                trailColor: "#dee2e6",
                backgroundColor: "#3e98c7"
              })}
            />
          </Col>
        </Row>

        <br />
        <Row xs="2">
          <Col>
            <Card>
              <CardBody>
                <CardTitle>{poseData.postureName}</CardTitle>
              </CardBody>
              <img width="538" src={poseData.img} alt="Card image cap" />
              <CardBody></CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>따라해보세요</CardTitle>
              </CardBody>
              <Posemodel
                style={{ width: "100%" }}
                setPosition={InputPosePosition}
              />
              {/* <img width="100%" src={move} alt="Card image cap" /> */}
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <p>{poseData.discription}</p>
        <div>
          <div className="text-center">진행률</div>
          <Progress multi>
            <Progress
              bar
              color="success"
              value={poseData.progressPercent}
            ></Progress>
          </Progress>
        </div>
        <br />
      </Container>

      {/* <Container>
        <h1>거북목 교정 스트레칭</h1>
        <Row xs="2">
          <Col>
            <img src={move} width="600" />
          </Col>
          <Col>
            <p>
              2016년 여름철에 장마와 폭염에 대해 오보를 계속 내어 비판을 샀다.
              7월에는 소나기 예보를 내린 날에는 해가 뜨고, 그렇지 않은 날에는
              오히려 소나기가 내려 '양치기 기상청'이라는 비판을 받았으며, 8월
              11일부터 14일까지 '폭염이 절정에 달할 것'이라고 예보했으나 19일이
              되어도 폭염은 수그러들지 않은 채, 최고기온을 갱신했다. 이후에도
              폭염이 꺾이는 시점에 대한 보도를 16일, 22일, 24일로 계속해서
              미루었는데 이에 대해 기상청은 북태평양 고기압의 영향으로 공기
              흐름이 정체되어 있어 폭염이 끝날 줄 알았으나 계속 이어진다는 등
              대기 예측이 매우 어려웠다고 해명했다. 한편, 기상청이 날씨를
              예측하는 것은 슈퍼컴퓨터를 통한 자료를 예보관들이 분석함으로써
              알려주는 것인데 오보가 나올 때마다 예보관을 교체해서 해당 분야에
              유능한 인재가 머물기 힘들기 때문이라는 지적도
              있다.[27][28][29][30]
            </p>
          </Col>
        </Row>
        <p>
          바른자세로 앉아서 상체를 세우고 오른쪽 팔을 하늘로 뻗은 후 천천히
          상체를 왼쪽으로 숙입니다. 숙인 자세를 10초간 유지합니다.
        </p>
      </Container> */}
    </span>
  );
}
