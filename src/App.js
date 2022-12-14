import "./App.css";
import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card,
} from "@material-ui/core";
import InfoBoxes from "./Components/InfoBoxes";
import Table from "./Components/Table";

import { sortData, prettyPrintStat } from "./Components/Sort";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //India, United kingdom
            value: country.countryInfo.iso3, //UK USA IN FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);


  // to fetch world wide details when page reloads
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all/")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value;
    console.log("yooooo", countryCode);

    setCountry(countryCode);

    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all/"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log("country info :: ", countryInfo);

  return (
    <div className="App">
      <div className="app__left">
        <div className="header">
          <h1>COVID-19 TRACKER </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onChangeCountry}
              value={country}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* <InfoBoxes
            
            title="Coronavirus Cases"
            cases={countryInfo.active}
            total={countryInfo.cases}
          />
          <InfoBoxes
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBoxes
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          /> */}

          <InfoBoxes
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBoxes
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBoxes
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        
      </div>

      <Card className="app__right">
        <CardContent>
          <h2>Live Cases by Country</h2>
          <Table countries={tableData} />

          {/* <h2>Worldwide New Cases</h2>
          <LineGraph casesType={casesType} /> */}
          
        </CardContent>
      </Card>
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from "react";
// import "./App.css";
// import {
//   MenuItem,
//   FormControl,
//   Select,
//   Card,
//   CardContent,
// } from "@material-ui/core";
// import InfoBox from "./Components/InfoBoxes";
// import LineGraph from "./Components/LineGraph";
// import Table from "./Components/Table";
// import { sortData, prettyPrintStat } from "./Components/Sort";
// import numeral from "numeral";
// // import Map from "./Map";
// import "leaflet/dist/leaflet.css";

// const App = () => {
//   const [country, setInputCountry] = useState("worldwide");
//   const [countryInfo, setCountryInfo] = useState({});
//   const [countries, setCountries] = useState([]);
//   // const [mapCountries, setMapCountries] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [casesType, setCasesType] = useState("cases");
//   // const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
//   // const [mapZoom, setMapZoom] = useState(3);

//   useEffect(() => {
//     fetch("https://disease.sh/v3/covid-19/all")
//       .then((response) => response.json())
//       .then((data) => {
//         setCountryInfo(data);
//       });
//   }, []);

//   useEffect(() => {
//     const getCountriesData = async () => {
//       fetch("https://disease.sh/v3/covid-19/countries")
//         .then((response) => response.json())
//         .then((data) => {
//           const countries = data.map((country) => ({
//             name: country.country,
//             value: country.countryInfo.iso2,
//           }));
//           let sortedData = sortData(data);
//           setCountries(countries);
//           // setMapCountries(data);
//           setTableData(sortedData);
//         });
//     };

//     getCountriesData();
//   }, []);

//   console.log(casesType);

//   const onCountryChange = async (e) => {
//     const countryCode = e.target.value;

//     const url =
//       countryCode === "worldwide"
//         ? "https://disease.sh/v3/covid-19/all"
//         : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
//     await fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setInputCountry(countryCode);
//         setCountryInfo(data);
//         // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
//         // setMapZoom(4);
//       });
//   };

//   return (
//     <div className="app">
//       <div className="app__left">
//         <div className="app__header">
//           <h1>COVID-19 Tracker</h1>
//           <FormControl className="app__dropdown">
//             <Select
//               variant="outlined"
//               value={country}
//               onChange={onCountryChange}
//             >
//               <MenuItem value="worldwide">Worldwide</MenuItem>
//               {countries.map((country) => (
//                 <MenuItem value={country.value}>{country.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//         <div className="app__stats">
//           <InfoBox
//             onClick={(e) => setCasesType("cases")}
//             title="Coronavirus Cases"
//             isRed
//             active={casesType === "cases"}
//             cases={prettyPrintStat(countryInfo.todayCases)}
//             total={numeral(countryInfo.cases).format("0.0a")}
//           />
//           <InfoBox
//             onClick={(e) => setCasesType("recovered")}
//             title="Recovered"
//             active={casesType === "recovered"}
//             cases={prettyPrintStat(countryInfo.todayRecovered)}
//             total={numeral(countryInfo.recovered).format("0.0a")}
//           />
//           <InfoBox
//             onClick={(e) => setCasesType("deaths")}
//             title="Deaths"
//             isRed
//             active={casesType === "deaths"}
//             cases={prettyPrintStat(countryInfo.todayDeaths)}
//             total={numeral(countryInfo.deaths).format("0.0a")}
//           />
//         </div>
//         {/* <Map
//           countries={mapCountries}
//           casesType={casesType}
//           center={mapCenter}
//           zoom={mapZoom}
//         /> */}
//       </div>
//       <Card className="app__right">
//         <CardContent>
//           <div className="app__information">
//             <h3>Live Cases by Country</h3>
//             <Table countries={tableData} />
//             <h3>Worldwide new {casesType}</h3>
//             <LineGraph casesType={casesType} />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default App;