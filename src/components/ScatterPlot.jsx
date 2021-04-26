import React,{useEffect} from 'react'
import * as d3 from 'd3'

const margin = { top: 50, right: 10, bottom: 50, left: 30 },
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

export const ScatterPlot = (props) => {
    const drawScatterplot = () => {
        var data = props.data;

        data.forEach(d => {
            d.y = d.goals
            d.x = d.assists
        })

        const svg = d3.select("#scatterplot")
            .append("svg")
            .attr("class", "scatterplot")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(data.y))

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", width)
                .attr("y", margin.bottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text(data.x))

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y)).nice()
            .range([height - margin.bottom, margin.top])

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x)).nice()
            .range([margin.left, width - margin.right])

        const grid = g => g
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1)
            .call(g => g.append("g")
                .selectAll("line")
                .data(x.ticks())
                .join("line")
                .attr("x1", d => 0.5 + x(d))
                .attr("x2", d => 0.5 + x(d))
                .attr("y1", margin.top)
                .attr("y2", height - margin.bottom))
            .call(g => g.append("g")
                .selectAll("line")
                .data(y.ticks())
                .join("line")
                .attr("y1", d => 0.5 + y(d))
                .attr("y2", d => 0.5 + y(d))
                .attr("x1", margin.left)
                .attr("x2", width - margin.right));


        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("g")
            .call(grid);

        svg.append("g")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("fill", "none")
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 5)
            .on("mouseover", (event, d) => {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(`Name : ${d.name} <br/> Team : ${d.team} <br/> Rating : ${d.rating} <br/> Goals : ${d.goals} <br /> Assists : ${d.assists} <br/>`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", _ => {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", event => {
                div.style("left", (event.pageX ) + "px")
                    .style("top", (event.pageY ) + "px")
            })

        svg
            .append("text")
            .attr("transform", `translate(20,30)`)
            .text("Goals")
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        svg
            .append("text")
            .attr("transform", `translate(${width / 2},${height})`)
            .text("Assists")
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        // tooltip div -> refered example https://bl.ocks.org/d3noob/180287b6623496dbb5ac4b048813af52
        const div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    }
    
    useEffect(() => {
        d3.select(".scatterplot").remove();
        drawScatterplot()
    }, [props.data])


    return (
        <div id="scatterplot" />
    )
}