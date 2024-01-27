import { ChangeEvent, FormEventHandler, useState } from "react";
import "./App.css";
import CardWeather from "./components/CardWeather";
import { DataType } from "./types";

function App() {
  const INITIAL_DATA = {
    location: { name: "", region: "", country: "" },
    current: {
      temp_c: 0,
      temp_f: 0,
      humidity: null,
      wind_mph: null,
      condition: { text: "", icon: "" },
    },
  };

  const ERROR_FEEDBACK = { error: { message: "" } };
  const [loading, setLoading] = useState(false);
  
  const [location, setLocation] = useState<string>("");
  const [errorFeedback, setErrorFeedback] = useState(ERROR_FEEDBACK);
  const [data, setData] = useState<DataType>(INITIAL_DATA);

  const handleSearchLocation: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);
    setData(INITIAL_DATA);
    setErrorFeedback(ERROR_FEEDBACK);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=ccc6b26e33fa4b2db0c213608242401&q=${location}&aqi=no`
      );
      if (response.status === 200) {
        setData(await response.json());
        setErrorFeedback(ERROR_FEEDBACK);
        setLocation("");
        return response;
      }
      const message = await response.json();
      setErrorFeedback(message);
      setData(INITIAL_DATA);
    } catch (error) {
      console.error("API error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeLocation = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  

  const renderCardWeather = () => {
    return (
      data.location.name && (
        <CardWeather toggleTemp data={data} />
      )
    );
  };

  const renderMessageElement = () => {
    return (
      errorFeedback && (
        <div className="mt-10">{errorFeedback.error.message}</div>
      )
    );
  };

  const renderLoading = () => {
    return loading && <p>Searching data...</p>;
  };

  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-bold mb-5">Weather App</h1>
        <form action="" onSubmit={handleSearchLocation}>
          <input
            disabled={loading}
            type="text"
            placeholder="Enter a place to search"
            className=" p-2 bg-transparent border-x-cyan-100 border rounded text-xl w-full"
            onChange={handleChangeLocation}
            value={location}
          />
        </form>
        {renderCardWeather()}
        {renderMessageElement()}
        {renderLoading()}
      </div>
    </>
  );
}

export default App;
