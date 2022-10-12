import { useEffect, useReducer, useState } from "react";
import { Clock, CountryInfo } from "./components/";
import { infoReducer, INITIAL_STATE } from "./reducers/infoReducer";
import { ApisServices } from "./services/apisServices";
import "../src/styles/global.style.scss";
import { convertTo24HourFormat } from "./utils/convertTo24HourFormat";

function App() {
  const [state, dispatch] = useReducer(infoReducer, INITIAL_STATE);
  const [showMoreIsOpen, setShowMoreIsOpen] = useState(false);

  const [ip, setIp] = useState<string>("");
  const services = new ApisServices();

  useEffect(() => {
    services.getUserPublicIp(dispatch);
  }, []);

  useEffect(() => {
    setIp(state.ipNumber.data);
  }, [state.ipNumber.data]);

  useEffect(() => {
    services.getTime(ip, dispatch);
    services.getLocationWithIp(ip, dispatch);

    const interval = setInterval(() => {
      services.getTime(ip, dispatch);
    }, 20000);

    return () => clearInterval(interval);
  }, [ip]);

  return (
    <>
      {state.time.data === "" ? (
        <>Loading...</>
      ) : (
        <div
          className={`app-container ${
            state.time.data?.datetime &&
            Number(state.time.data?.datetime.split(":")[0]) >= 18
              ? "night"
              : "night"
          }`}
        >
          <div className={`show-more ${showMoreIsOpen ? "open" : "close"}`}>
            <Clock
              time={convertTo24HourFormat(state.time.data?.datetime)}
              country={state.locationInfo.data?.country}
              countryCode={state.locationInfo.data?.countryCode}
              showMoreIsOpen={showMoreIsOpen}
              setShowMoreIsOpen={setShowMoreIsOpen}
            />
            <CountryInfo
              time={convertTo24HourFormat(state.time.data?.datetime)}
              timeZone={state.locationInfo.data.timezone}
              dayOfTheYear={state.time.data.day_of_year}
              dayOfTheWeek={state.time.data.day_of_week}
              weekNumber={state.time.data.week_number}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
