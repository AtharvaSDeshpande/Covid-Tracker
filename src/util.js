import React from "react";
import  { Circle,Popup } from 'react-leaflet';
import numeral from "numeral";

export const casesTypeColor = {
    cases : {
        hex: "#CC1034",
        multiplier:800,
    },
    recovered : {
        hex: "#7dd71d",
        multiplier:1200,
    },
    deaths : {
        hex: "#fb4443",
        multiplier:2000,
    }
}
export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => {
        if (a.cases>b.cases)
        {
            return -1;
        }
        else{
            return 1;
        }
    })
    return sortedData;
};
export const showDataOnMap = (data,casesType="cases" ) => {
    return (

        data.map((country) => (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColor[casesType].hex}
                fillColor={casesTypeColor[casesType].hex}
                radius = {Math.sqrt(country[casesType])*casesTypeColor[casesType].multiplier}

            >
                <Popup>
                    <div className = "infoContainer">
                        <div className = "infoFlag" style = {{backgroundImage: `url(${country.countryInfo.flag})`}}></div>
                        <div className = "infoName">{country.country}</div>
                        <div className = "infoCases">Cases: {numeral(country.cases).format()}</div>
                        <div className = "infoRecovered">Recovered: {numeral(country.recovered).format()}</div>
                        <div className = "infoDeaths">Deaths: {numeral(country.deaths).format()}</div>

                    </div>
                </Popup>
            </Circle>
        ))
    );
};

export const prettyPrintStat = (stat) =>  (
    stat? `+${numeral(stat).format("0.0a")}` : "0"
)
