import React,{useEffect} from 'react'
import * as d3 from 'd3'
import Transfers from '../data/transfers.json'

const margin = { top: 50, right: 10, bottom: 50, left: 30 },
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


export const BarChart = () => {

    useEffect(() => {

        const data = [
            {
                name:"David Moyes",
                value:Transfers.transfers["dm"].total
            },
            {
                name:"Louis van Gaal",
                value:Transfers.transfers["lvg"].total
            },
            {
                name:"Jose Mourinho",
                value:Transfers.transfers["jm"].total
            },
        ]

        const svg = d3.select("#bar-chart")
            .append("svg")
            .attr("class", "bar-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, data.format))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(data.y))

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top])

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)


        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d.value))
            .attr("height", d => y(0) - y(d.value))
            .attr("width", x.bandwidth())
            .on("mouseover", (event, d) => {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(`Manager : ${d.name} <br/> Money spent : ${d.value} Million dollars<br/>`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", _ => {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", event => {
                div.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px")
            })

        svg
            .append("text")
            .attr("transform", `translate(30,10)`)
            .text("Dollars in Millions")
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        svg
            .append("text")
            .attr("transform", `translate(${width / 2},${height})`)
            .text("Managers")
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        // tooltip div -> refered example https://bl.ocks.org/d3noob/180287b6623496dbb5ac4b048813af52
        const div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

    }, [])


    return (
        <div id="bar-chart" />
    )
}