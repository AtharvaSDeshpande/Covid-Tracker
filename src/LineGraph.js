import React, { useEffect,useState } from 'react'
import {Line} from "react-chartjs-2";
import numeral from "numeral";
const options = {
    legend : {
        display:false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem,data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time : {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
                     },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function(value,index,values) {
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}
function LineGraph({casesType = "cases"}) {
    const [data,setData] = useState ({});

    const buildChartData = (data,casesType = "cases") => {
        const chartData = [];
        let lastDataPoint;
       for (let date in data.cases) {

            if (lastDataPoint)
            {
            const newDataPoint = {
                x:date,
                y:data['cases'][date]-lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data['cases'][date];
        }
       
        
    }
    useEffect(() => {
        const fetchdata = async() => {
        await fetch ("https://disease.sh/v3/covid-19/historical/all?lastdays=120").then(response => {return response.json(); }).then((data)=> {
            let chartData = buildChartData(data,casesType);
            setData(chartData); 
        });};
        fetchdata();
        
    },[casesType]);
    return (
        <div>
                
                {(
                    <Line 
                        options={options}
                        data = {{
                            
                            backgroundColor : "rgba(204,16,52,0)",
                            borderColor: "#CC1034",
                            datasets: [{
                                data: data,
                                        }]
                                }}/>
                )}
                
        </div>
    )
}
export default LineGraph