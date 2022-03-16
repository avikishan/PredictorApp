import React from "react";
import {SimpleBarChart} from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import {rgb} from 'd3';


const BarChart = ({ data }) => {
    const options = {
      axes: {
        left: { mapsTo: "value" },
        bottom: { mapsTo: "group", scaleType: "labels" },
        resizeable: false,
      },
      height: "440px",
      width: "800px",
    };
    return <SimpleBarChart data={data} options={options}></SimpleBarChart>;
};

export default BarChart;