import React, {useEffect} from 'react'
import * as d3 from "d3";
import Finishes from '../data/finishes.json'


const margin = { top: 30, right: 10, bottom: 50, left: 50 },
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

export const MultipleLineChart = (props) => {


    const drawGraph = () => {
        const svg = d3.select("#" + props.id)
            .append("svg")
            .attr("class", `${props.id}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleBand()
            .domain(Finishes["manutd"].map(item => item.season).filter(s => s.startsWith("1") && parseInt(s[1]) > 2))
            .range([0, width]);

        const colorBand = d3.scaleOrdinal().domain(["manutd", "mancity", "liv"]).range(["#9a0000", "#2196f3","#ff5722"])

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
        y.domain([1, d3.max(Finishes["manutd"].concat(Finishes["liv"]).concat(Finishes["mancity"]), d => d[props.type])]).nice();
        svg.selectAll(".myYaxis")
            .transition()
            .duration(500)
            .call(yAxis);


        const m = svg.selectAll(".lineTest")
            .data([Finishes.manutd.filter(s => s.season.startsWith("1") && parseInt(s.season[1]) > 2)], d => d[props.type]);

        m
            .enter()
            .append("path")
            .attr("transform", `translate(${x.bandwidth() / 2},0)`)
            .attr("class", "lineTest")
            .merge(m)
            .transition()
            .duration(3000)
            .attr("d", d3.line()
                .x(d => x(d.season))
                .y(d => y(d[props.type]))
            )
            .attr("fill", "none")
            .attr("stroke", colorBand("manutd"))
            .attr("stroke-width", 2.5)

        const l = svg.selectAll(".lineTest-liv")
            .data([Finishes.liv.filter(s => s.season.startsWith("1") && parseInt(s.season[1]) > 2)], d => d[props.type]);

        l
            .enter()
            .append("path")
            .attr("transform", `translate(${x.bandwidth() / 2},0)`)
            .attr("class", "lineTest-liv")
            .merge(l)
            .transition()
            .duration(3000)
            .attr("d", d3.line()
                .x(d => x(d.season))
                .y(d => y(d[props.type]))
            )
            .attr("fill", "none")
            .attr("stroke", colorBand("liv"))
            .attr("stroke-width", 2.5)
        
        const mc = svg.selectAll(".lineTest-mc")
            .data([Finishes.mancity.filter(s => s.season.startsWith("1") && parseInt(s.season[1]) > 2)], d => d[props.type]);

        mc
            .enter()
            .append("path")
            .attr("transform", `translate(${x.bandwidth() / 2},0)`)
            .attr("class", "lineTest-mc")
            .merge(mc)
            .transition()
            .duration(3000)
            .attr("d", d3.line()
                .x(d => x(d.season))
                .y(d => y(d[props.type]))
            )
            .attr("fill", "none")
            .attr("stroke", colorBand("mancity"))
            .attr("stroke-width", 2.5)

        svg
            .append("text")
            .attr("transform", `translate(0,-10)`)
            .text(props.yLabel)
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        svg
            .append("text")
            .attr("transform", `translate(${width / 2},${height + 50})`)
            .text(props.xLabel)
            .style("text-anchor", "middle")
            .style("font-size", "12px")

        const teams = ["Man utd", "Man City", "Liverpool"];
        teams.forEach((team,i) => {
            const fillId = team === "Man utd" ? "manutd" : (team == "Man City" ? "mancity" : "liv");
            svg.append("rect")
                .attr("transform", `translate(${width - 300}, 10)`)
                .attr("x", 100 * i)
                .attr("y", -40)
                .attr("height", 20)
                .attr("width", 20)
                .attr("fill", colorBand(fillId))

            svg.append("text")
                .attr("transform", `translate(${width - 300}, 10)`)
                .attr("x", 100 * i + 25)
                .attr("y", -25)
                .text(team)
                .attr("fill", colorBand(fillId))
        })
        
    }

    useEffect(() => {

        if (props.id === "multiple-line-chart-point") {
            d3.select(".multiple-line-chart-finish").remove();
            d3.select(".multiple-line-chart-goalDiff").remove();
        }

        if (props.id === "multiple-line-chart-goalDiff") {
            d3.select(".multiple-line-chart-finish").remove();
            d3.select(".multiple-line-chart-point").remove();
        }

        if (props.id === "multiple-line-chart-finish") {
            d3.select(".multiple-line-chart-goalDiff").remove();
            d3.select(".multiple-line-chart-point").remove();
        }

        drawGraph()
    }, [props.id])


    return(
        <div id={props.id} />
    )
}