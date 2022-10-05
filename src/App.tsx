import { useEffect, useReducer, useState } from "react";
import { Clock, CountryInfo } from "./components/";
import { infoReducer, INITIAL_STATE } from "./reducers/infoReducer";
import { ApisServices } from "./services/apisServices";
import "../src/styles/global.style.scss";
import { convertTo24HourFormat } from "./utils/convertTo24HourFormat";

function App() {
  // Get user Ip on load
  const [state, dispatch] = useReducer(infoReducer, INITIAL_STATE);
  const [ip, setIp] = useState<string>("");
  const services = new ApisServices();

  useEffect(() => {
    services.getUserPublicIp(dispatch);
    services.getQuote(dispatch);
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
    <div className='App'>
      {state.locationInfo.loading ? (
        <>Loading...</>
      ) : (
        <>
          <Clock
            time={convertTo24HourFormat(state.time.data?.datetime)}
            country={state.locationInfo.data?.country}
            countryCode={state.locationInfo.data?.countryCode}
            quote={{
              author: state.quote.data.author,
              quote: state.quote.data.en
            }}
          />
        </>
      )}

      {/* {state.quote} */}

      {/* <CountryInfo /> */}
    </div>
  );
}

export default App;
