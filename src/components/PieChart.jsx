import React, {useEffect} from 'react'
import Transfers from '../data/transfers.json'
import * as d3 from 'd3'

const margin = { top: 30, right: 30, bottom: 30, left: 30 },
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

export const PieChart = (props) => {

    useEffect(() => {
        
        let obj = {};
        let data = [];

        Transfers.transfers[props.manager].players.forEach(p => {
            if(obj[p.position])
                obj[p.position] = obj[p.position] + p.cost;
            else
                obj[p.position] = p.cost
        })

        const keys = Object.keys(obj)

        keys.forEach(key => {
            data.push({name:key, value:obj[key]})
        })

        const pie = d3.pie()
            .sort(null)
            .value(d => d.value)

        const arcLabel = () => {
            const radius = Math.min(width, height) / 2 * 0.8;
            return d3.arc().innerRadius(radius).outerRadius(radius);
        }

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1)

        const color = d3.scaleOrdinal()
            .domain(["ATT", "MID", "DEF", "GK"])
            .range(["#AA5042", "#9DDBAD", "steelblue","#FFF689"])

        
        const arcs = pie(data);

        const svg = d3.select(`#pie-chart-${props.manager}`)
            .append("svg")
            .attr("class", `pie-chart-${props.manager}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",`translate(${width/2 + margin.left},${height/2+margin.top})`);

        svg.append("g")
            .attr("stroke", "white")
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", arc)
            .on("mouseover", (event, d) => {
                let finStr = "";
                Transfers.transfers[props.manager].players.forEach(p => {
                    if(p.position === d.data.name)
                        finStr = finStr.concat(p.name, " - " ,p.cost," <br/>")
                        
                })

                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(`Players <br/> ${finStr}`)
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
            .append("title")
            .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`)
            


        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "normal")
                .text(d => d.data.name))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.value.toLocaleString()));

        // tooltip div -> refered example https://bl.ocks.org/d3noob/180287b6623496dbb5ac4b048813af52
        const div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

    },[])

    return(
        <div id={`pie-chart-${props.manager}`} />
    )
}