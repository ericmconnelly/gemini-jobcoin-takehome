import { useEffect } from "react";
import "../TransactionGraph.css";
import * as d3 from "d3";

const drawGraph = (data) => {
  const margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  const formatTime = d3.time.format("%e %B");
  const x = d3.time.scale().range([0, width]);
  const y = d3.scale.linear().range([height, 0]);
  const xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
  const yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

  const valueline = d3.svg
    .line()
    .x((d) => {
      return x(d.date);
    })
    .y((d) => {
      return y(d.balance);
    });

  var div = d3
    .select("#graph")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(
    d3.extent(data, function (d) {
      return d.date;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.balance;
    }),
  ]);

  svg.append("path").attr("class", "line").attr("d", valueline(data));

  svg
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", (d) => {
      return x(d.date);
    })
    .attr("cy", (d) => {
      return y(d.balance);
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(formatTime(d.date) + "<br/>" + d.balance)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", (d) => {
      div.transition().duration(500).style("opacity", 0);
    });

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Balance");
};

export const TransactionGraph = ({ transactions, balance }) => {
  useEffect(() => {
    d3.selectAll("svg").remove();
    drawGraph(transactions);
  }, [JSON.stringify(transactions)]);

  return <div id="graph" />;
};
