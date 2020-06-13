import React, { useEffect, useCallback, useState } from "react";
import { Layout, Loading } from "../components";
import { useHistory, useLocation, Link } from "react-router-dom";
import kakaoRunning from "../components/icon/kakao_running.png";
import { useEmployeeList } from "../hooks";
import logo from "../components/icon/igo.JPG";
import yoga from "../components/icon/yoga.jpg";
import neck from "../components/icon/forwardNeck.JPG";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import "./page.css";

export default function MainPage() {
  const history = useHistory();
  const [{ employee, isLoading }, startLoading, endLoading] = useEmployeeList();
  const handleClickEmployee = value => {
    startLoading();
    history.push(`/update`, value); // api 미작동
    endLoading();
  };

  const items = [
    {
      src: neck,
      altText: "당신도 혹시 거북목?",
      caption: "<내 자세 진단하기>를 통해 거북목 증상을 실시간으로 확인하세요.",
      header: "Slide 1 Header",
      key: "1"
    },
    {
      src: yoga,
      altText: "자세교정을 통한 몸매 가꾸기",
      caption: "모션인식으로 바른자세를 쉽고 정확하게, 지금 시작하세요!",
      header: "Slide 2 Header",
      key: "2"
    },
    {
      src: kakaoRunning,
      altText: "카카오 프렌즈와 함께 달려볼까?",
      caption:
        "나이키 조이라이드 x 카카오프렌즈 콜라보 한정판 컬렉션 지금보러가기",
      header: "Slide 3 Header",
      key: "3"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          className="d-block w-100"
          src={item.src}
          alt={item.altText}
          style={{ display: "block", filter: "brightness(50%)" }}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.altText}
        />
      </CarouselItem>
    );
  });
  return (
    <Layout>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
      {/* <div style={{ backgroundColor: "white", alignItems: "center" }}>
        <img
          src={kakaoRunning}
          alt="kakao x nike 콜라보 이미지"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%"
          }}
        />
      </div> */}
      {/*       
      <div>
        <strong>회사원 목록</strong>
      </div>
      <div id="div_list">
        <ul id="employee">
          {employee.map(value => {
            return (
              <div
                key={value.id}
                id="list_li"
                onClick={() => handleClickEmployee(value)}
              >
                <li>
                  name: <strong>{value.employee_name}</strong>
                </li>
                <li>age: {value.employee_age}</li>
                <li>salary : {value.employee_salary}</li>
              </div>
            );
          })}
        </ul>
        </div>

      <Loading open={isLoading} />*/}
    </Layout>
  );
}
