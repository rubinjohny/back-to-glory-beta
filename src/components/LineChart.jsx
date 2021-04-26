import React, {useEffect} from 'react'
import * as d3 from "d3";
import Finishes from '../data/finishes.json'

const margin = { top: 30, right: 10, bottom: 50, left: 50 },
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

export const LineChart = props => {

    useEffect(() => {

        const svg = d3.select("#"+props.id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleBand()
            .domain(Finishes["manutd"].map(item => item.season))
            .range([0, width]);

        const xAxis = d3.axisBottom().scale(x);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "myXaxis")

        const setRangeAs = props.invert ? [height, 0] : [0, height]

        var y = d3.scaleLinear().range(setRangeAs);
        var yAxis = d3.axisLeft().scale(y);
        svg.append("g")
            .attr("class", "myYaxis")


        svg.selectAll(".myXaxis").transition()
            .duration(500)
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");
            

        // create the Y axis
        y.domain([1, d3.max(Finishes["manutd"], d => d[props.type])]).nice();
        svg.selectAll(".myYaxis")
            .transition()
            .duration(500)
            .call(yAxis);

        

        const u = svg.selectAll(".lineTest")
            .data([Finishes.manutd], d => d[props.type]);

        u
            .enter()
            .append("path")
            .attr("transform", "translate(14,0)")
            .attr("class", "lineTest")
            .merge(u)
            .transition()
            .duration(3000)
            .attr("d", d3.line()
                .x(d => x(d.season))
                .y(d => y(d[props.type]))
            )
            .attr("fill", "none")
            .attr("stroke","steelblue")
            .attr("stroke-width", 2.5)

        svg
            .append("text")
            .attr("transform", `translate(0,-10)`)
            .text(props.yLabel)
            .style("text-anchor", "middle")
            .style("font-size", "12px")
        
        svg
            .append("text")
            .attr("transform", `translate(${width/2},${height + 50})`)
            .text(props.xLabel)
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        // post era line
        svg
            .append("line")
            .attr("transform", "translate(14,0)")
            .attr("x1", x("12/13"))
            .attr("x2", x("12/13"))
            .attr("y1", 0)
            .attr("y2", height)
            .style("stroke", "lightgrey")
            .style("stroke-width", 2)
            .style("stroke-dasharray", ("3, 3"))

        // post-pre labels
        svg
            .append("text")
            .attr("transform", `translate(${x("12/13") - 20},${150})`)
            .text("Golden Era")
            .style("text-anchor", "end")
            .style("font-size", "14px")
            .style("fill", "green")
        
            svg
            .append("text")
            .attr("transform", `translate(${x("12/13") + 35},${140})`)
            .text("Post Golden Era")
            .style("text-anchor", "start")
            .style("font-size", "14px")
            .style("fill", "red")
        
    }, [])
    
    

   
    
    return(
        <div id={props.id} />
    )
}