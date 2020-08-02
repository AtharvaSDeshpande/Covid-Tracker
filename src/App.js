import React, { useState, useEffect } from 'react';
import { FormControl,MenuItem,Select,Card } from '@material-ui/core';
import './App.css';

import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
function App() {
  const [countries,setCountries] = useState([]  );
  const [country,setCountry] = useState("WorldWide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]  );
  const [mapCenter,setmapCenter] = useState({lat: 34.80746,lng: -40.4796});
  const [mapCountries,setMapCountries] = useState([]);
  const [mapZoom,setMapZoom] = useState(3);
  const [casesType,setCasesType] = useState("cases");
  useEffect(()=>{
    fetch ("https://disease.sh/v3/covid-19/all").then(response => response.json()).then(
      (data) => {
        
        setCountryInfo(data);
      }
    );
  },[]);
  useEffect(()=>{
    const getCountriesData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
        const countries = data.map((country) => (
          {
          name: country.country,
          value: country.countryInfo.iso2
          }
        ));
        setMapCountries(data);
        const sortedData = sortData(data);
        setMapCountries(data);
        setTableData(sortedData);
        setCountries(countries);
        
      })
  
    }
    getCountriesData();
  },[]);
  const onCountryChange = async (event) => {
    const CountryCode = event.target.value;
    //

    const url = (CountryCode === "WorldWide") ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${CountryCode}`;

    await fetch (url).then(response => response.json()).then(
      (data) => {
        setCountry(CountryCode);
        setCountryInfo(data);
        if (CountryCode === "WorldWide")
        {
          setmapCenter({lat: 34.80746,lng: -40.4796});
        }
        else
        {
          setmapCenter([data.countryInfo.lat,data.countryInfo.long]);
        }
      }
    )
  }
  return (
    <div className="app">
        <div  className = "appLeft">
          <div className = "app_header"> 
          <h1>Covid 19 Tracker </h1>
          <FormControl className = "app_dropdown">
          
            <Select variant = "outlined" onChange = {onCountryChange} value = {country}>
            <MenuItem value = "WorldWide">WorldWide</MenuItem>
            {
              
              countries.map((country) => (
              <MenuItem value = {country.value}>{country.name}</MenuItem>
              ))
            }

            </Select>

          </FormControl>
          </div>
          <div className = "app_stats">
            <InfoBox title = "Corona Virus Cases" cases ={prettyPrintStat(countryInfo.todayCases)}  total = {countryInfo.cases} onClick = {(e) => setCasesType("cases") } active = {casesType === "cases"} isred></InfoBox> 
            <InfoBox title = "Recovered" cases = {prettyPrintStat(countryInfo.todayRecovered)}  total = {countryInfo.recovered} onClick = {(e) => setCasesType("recovered")} active = {casesType === "recovered"}></InfoBox> 
            <InfoBox title = "Deaths" cases = {prettyPrintStat(countryInfo.todayDeaths)}  total = {countryInfo.deaths} onClick = {(e) => setCasesType("deaths")} active = {casesType === "deaths"} isred></InfoBox>         
          </div>
          {/* Maps */}
            <Map
            countries = {mapCountries}
            casesType = {casesType}
            center = {mapCenter}
            zoom = {mapZoom}
            ></Map>
        
  
        </div>
        
          
          <Card className="app_right">
          <h4>Live Cases by Country
          </h4>
          <Table countries = {tableData}></Table>
          
          
          </Card>
          {/* {Table} */}
          {/* Graph */}
        
      </div>
  );
}

export default App;