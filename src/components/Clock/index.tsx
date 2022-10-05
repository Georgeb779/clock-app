import React, { useReducer } from "react";
import { ClockProps } from "../../interfaces";
import { infoReducer, INITIAL_STATE } from "../../reducers/infoReducer";
import "./style.scss";



export function Clock({ time, country, countryCode, quote }: ClockProps) {
  return (
    <div
      className={`datetime__container ${
        time && Number(time.split(":")[0]) >= 18 ? "night" : "day"
      }`}
    >
      <div className='quote__container'>
        <p className='quote__quote-item'>"{quote.quote}"</p>
        <p className='quote__author-item'>{quote.author}</p>
      </div>

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
        <button>More</button>
      </div>
    </div>
  );
}
