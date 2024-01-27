export type DataType = {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number | null;
    wind_mph: number | null;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export enum Temperature {
  Fahrenheit = "Fahrenheit",
  Celsius = "Celsius"
}