var d3 = require('d3');
var fs = require('fs');
var jsdom = require('jsdom');

var getChart = function (data) {
	jsdom.env({
	    html:'',
	    features:{ QuerySelector:true }, //you need query selector for D3 to work
	    done:function(errors, window){
	    	window.d3 = d3.select(window.document); //get d3 into the dom

	    	//do yr normal d3 stuff
	    	var margin = {top: 20, right: 20, bottom: 30, left: 50},
    		width = 960 - margin.left - margin.right,
    		height = 500 - margin.top - margin.bottom;

    		var parseDate = d3.timeParse("%a %b %d %Y");

		var x = d3.scaleTime()
		    .range([0, width]);

		var y = d3.scaleLinear()
		    .range([height, 0]);

		var line = d3.line()
		  .x(function(d) { return x(d.date); })
		  .y(function(d) { return y(d.sleptHours); });


		var svg = window.d3.select('body').append('div').attr('class', 'container').append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		//sanitize the data
		data.forEach(function(d) {
		    d.date = parseDate(d.date);
		    d.sleptHours = +d.sleptHours;
		    d.sleptMinutes = +d.sleptMinutes;
		});

	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain([0, d3.max(data, function(d) { return d.sleptHours + d.sleptMinutes / 60; })]);

	  svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line)
	      .attr("fill", "none")
	      .attr("stroke", "steelblue")
	      .attr("stroke-width", "1.5px");

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x));

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(d3.axisLeft(y))
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Time Slept (hours)");

	    	//write out the children of the container div
    		fs.writeFileSync('test.svg', window.d3.select('.container').html()); //using sync to keep the code simple
	    }
	});
};

module.exports = { getChart: getChart };

if (require.main === module) {
    module.exports();
}