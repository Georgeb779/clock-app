import { useEffect, useState } from "react";
import { Clock, CountryInfo } from "./components/";
import "../src/styles/global.style.scss";

function App() {
  // Get user Ip on load
  const [ip, setIp] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const getUserPublicIp = async () => {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
    };
    getUserPublicIp();
  }, []);

  useEffect(() => {
    const getTime = async () => {
      const response = await fetch(`http://worldtimeapi.org/api/ip/${ip}`);
      const data = await response.json();
      console.log(data.datetime);
      const localTime = new Date(data.datetime).toLocaleTimeString();
      setTime(localTime);
    };
    getTime();

    const getLocationWithIp = async () => {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      console.log(data);
      setLocation(data.city);
    };
    getLocationWithIp();
  }, [ip, location]);

  return (
    <div className='App'>
      <Clock />
      <CountryInfo />
    </div>
  );
}

export default App;
