import { useState } from "react";
import { DataType, Temperature } from "../../types";
import styles from "./CardWeather.module.scss";

function CardWeather({
  data,
  toggleTemp,
}: {
  data: DataType;
  toggleTemp: boolean;
}) {
  const [temperatureUnit, setTemperatureUnit] = useState(Temperature.Celsius);

  function handleToggleTemp() {
    setTemperatureUnit((prevUnit) =>
      prevUnit === Temperature.Celsius ? Temperature.Fahrenheit : Temperature.Celsius
    );
  }

  return (
    <div className={`${styles["card-weather"]} p-5 rounded-lg mt-10 text-center`}>
      <h2 className="text-4xl font-bold mb-3">{data.location.name}</h2>
      <p className="text-xs mb-5">
        {data.location.region} - {data.location.country}
      </p>
      {toggleTemp ? (
        <>
          <h3 className="text-5xl font-light">
            {temperatureUnit === Temperature.Celsius
              ? data.current.temp_c + "°C"
              : data.current.temp_f + "°F"}
          </h3>
          <button
            onClick={handleToggleTemp}
            className="text-sm p-3 bg-cyan-950 rounded-lg mt-2 mb-2"
          >
            Convert to {temperatureUnit === Temperature.Celsius ? "°F" : "°C"}
          </button>
        </>
      ) : (
        <h3 className="text-5xl font-light">{data.current.temp_c}°C</h3>
      )}

      <div className="flex justify-center items-center">
        <p>{data.current.condition.text}</p>
        <img
          src={`https://${data.current.condition.icon}`}
          alt="Mist"
          width={64}
          height={64}
        />
      </div>
      <div className="flex justify-center gap-5 mt-3">
        <p className="text-xs">Humidity: {data.current.humidity}</p>
        <p className="text-xs">Wind: {data.current.wind_mph}</p>
      </div>
    </div>
  );
}

export default CardWeather;
