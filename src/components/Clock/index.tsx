import React, { useReducer, useState } from "react";
import { ClockProps } from "../../interfaces";
import { infoReducer, INITIAL_STATE } from "../../reducers/infoReducer";
import Button from "../Button";
import IconArrow from "../../assets/icon-arrow.svg";
import "./style.scss";
import { ApisServices } from "../../services/apisServices";
import Quote from "../Quote";

export function Clock({
  time,
  country,
  countryCode,
  showMoreIsOpen,
  setShowMoreIsOpen
}: ClockProps) {
  const [state, dispatch] = useReducer(infoReducer, INITIAL_STATE);
  const services = new ApisServices();

  return (
    <div
      className={`
      datetime__container  ${
        time && Number(time.split(":")[0]) >= 18 ? "night" : "day"
      } `}
    >
      <Quote />

      <div className='clock__container'>
        <div>
          <div className='clock__greeting-item'>
            {time && time >= "00:00" && time <= "11:59" ? (
              <p>Good Morning</p>
            ) : time && time >= "12:00" && time <= "18:00" ? (
              <p>Good Afternoon</p>
            ) : (
              <p>Good Night</p>
            )}
          </div>

          <p className='clock__time-item'>{time}</p>
          <p className='clock__country-item'>
            {country}, {countryCode}
          </p>
        </div>
        <Button
          text='MORE'
          type={`btn__show-more ${showMoreIsOpen ? "open" : "close"} `}
          action={() => {
            setShowMoreIsOpen(!showMoreIsOpen);
          }}
          icon={IconArrow}
        />
      </div>
    </div>
  );
}
