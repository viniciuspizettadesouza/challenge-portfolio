import {
  comparisonHours,
  type LocationForecast,
  type WeatherCondition,
} from "./weatherLogic";

const symbols: Record<WeatherCondition, string> = {
  Clear: "☀",
  Clouds: "☁",
  Rain: "☂",
  "Partly cloudy": "◐",
};

export default function ForecastTables({
  forecast,
}: {
  forecast: LocationForecast;
}) {
  const comparison = comparisonHours(forecast.hours);

  return (
    <>
      <section className="weather-card" aria-labelledby="comparison-heading">
        <div className="section-heading">
          <div>
            <p>At a glance</p>
            <h3 id="comparison-heading">Next six hours</h3>
          </div>
          <span>Now + five hourly updates</span>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          aria-label="Scrollable six-hour forecast comparison"
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Measurement</th>
                {comparison.map((hour, index) => (
                  <th key={hour.index}>
                    {index === 0 ? "Now" : hour.label.split(" · ").at(-1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Condition</th>
                {comparison.map((hour) => (
                  <td key={`condition-${hour.index}`}>
                    <span className="condition">
                      <i aria-hidden="true">{symbols[hour.condition]}</i>
                      {hour.condition}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <th>Temperature</th>
                {comparison.map((hour) => (
                  <td key={`temp-${hour.index}`}>{hour.temperature}°C</td>
                ))}
              </tr>
              <tr>
                <th>Feels like</th>
                {comparison.map((hour) => (
                  <td key={`feels-${hour.index}`}>{hour.feelsLike}°C</td>
                ))}
              </tr>
              <tr>
                <th>Humidity</th>
                {comparison.map((hour) => (
                  <td key={`humidity-${hour.index}`}>{hour.humidity}%</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="weather-card" aria-labelledby="details-heading">
        <div className="section-heading">
          <div>
            <p>Detailed outlook</p>
            <h3 id="details-heading">48-hour forecast</h3>
          </div>
          <span>{forecast.hours.length} deterministic hourly records</span>
        </div>
        <div
          className="table-scroll detail-scroll"
          tabIndex={0}
          aria-label="Scrollable 48-hour forecast"
        >
          <table className="detail-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Condition</th>
                <th>Temperature</th>
                <th>Feels like</th>
                <th>Humidity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {forecast.hours.map((hour) => (
                <tr key={hour.index}>
                  <td>
                    <strong>{hour.label}</strong>
                  </td>
                  <td>
                    <span className="condition">
                      <i aria-hidden="true">{symbols[hour.condition]}</i>
                      {hour.condition}
                    </span>
                  </td>
                  <td>{hour.temperature}°C</td>
                  <td>{hour.feelsLike}°C</td>
                  <td>{hour.humidity}%</td>
                  <td>{hour.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
