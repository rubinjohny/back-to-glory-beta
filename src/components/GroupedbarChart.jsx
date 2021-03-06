import React, { useEffect } from 'react'
import * as d3 from 'd3'
import Manager from '../data/manager.json'

const margin = { top: 50, right: 10, bottom: 50, left: 30 },
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

export const GroupedBarChart = () => {

    useEffect(() => {

        const data = Manager.managers;
        const keys = ["wins", "draws", "loss"]
        const groupKey = "short"

        const svg = d3.select("#grouped-bar-chart")
            .append("svg")
            .attr("class", "grouped-bar-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y))

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x0).tickSizeOuter(0))
            .call(g => g.select(".domain").remove())

        const color = d3.scaleOrdinal()
            .domain(["wins", "draws", "loss"])
            .range(["#105f10", "#ff9800", "#f44336"])

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice()
            .rangeRound([height - margin.bottom, margin.top])

        const x0 = d3.scaleBand()
            .domain(data.map(d => d[groupKey]))
            .rangeRound([margin.left, width - margin.right])
            .paddingInner(0.1)

        const x1 = d3.scaleBand()
            .domain(keys)
            .rangeRound([0, x0.bandwidth()])
            .padding(0.05)

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("g")
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
            .selectAll("rect")
            .data(d => keys.map(key => ({ key, value: d[key] })))
            .join("rect")
            .attr("class","main-bar")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => 0)
            .attr("fill", d => color(d.key))
            .on("mouseover", (event, d) => {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(`${d.value} ${d.key} <br/>`)
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
            .text("Count")
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        svg
            .append("text")
            .attr("transform", `translate(${width / 2},${height})`)
            .text("Managers and Season")
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        const types = ["Win", "Draw", "Loss"];
        types.forEach((type, i) => {
            const fillId = type === "Win" ? "wins" : (type == "Draw" ? "draws" : "loss");
            svg.append("rect")
                .attr("transform", `translate(${width - 300}, 10)`)
                .attr("x", 100 * i)
                .attr("y", -40)
                .attr("height", 20)
                .attr("width", 20)
                .attr("fill", color(fillId))

            svg.append("text")
                .attr("transform", `translate(${width - 300}, 10)`)
                .attr("x", 100 * i + 25)
                .attr("y", -25)
                .text(type)
                .attr("fill", color(fillId))
        })

        svg.selectAll(".main-bar")
            .transition()
            .duration(800)
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return y(0) - y(d.value); })
            .delay(function (d, i) { return (i * 200) })

        // tooltip div -> refered example https://bl.ocks.org/d3noob/180287b6623496dbb5ac4b048813af52
        const div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

    }, [])


    return (
        <div id="grouped-bar-chart" />
    )
}