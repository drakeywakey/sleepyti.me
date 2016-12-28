function getChart() {
	d3.json('../resources/sleepEntries.json', function (err, data) {
		if (err) {
			return console.error(err);
		}

		//mongo should be sorting this for me, but I can't figure out why it's not, so whatevs.
		data = data.sort(function (a,b) { return new Date(a.date) - new Date(b.date); });

		var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    		width = 960 - margin.left - margin.right,
	    		height = 500 - margin.top - margin.bottom;

	    		var parseDate = d3.timeParse("%a %b %d %Y");
	    		var formatTime = d3.timeFormat("%e %b");

			var x = d3.scaleTime()
			    .range([0, width]);

			var y = d3.scaleLinear()
			    .range([height, 0]);

			var line = d3.line()
			  .x(function(d) { return x(d.date); })
			  .y(function(d) { return y(d.sleptHours + d.sleptMinutes / 60); });


			var svg = d3.select('.chart-container').append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			    .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var div = d3.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

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
		      .attr("stroke-width", "1.5px");

		  svg.append("g")
		      .attr("class", "x-axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x).ticks(d3.timeDay.every(1)));

		  svg.append("g")
		      .attr("class", "y-axis")
		      .call(d3.axisLeft(y))
		      .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Time Slept (hours)");

		      var circle = svg.selectAll("circle")
			.data(data, function (d) { return d; });

		circle.enter().append("circle")
			.attr("cy", function (d) { return y(d.sleptHours + d.sleptMinutes / 60); })
			.attr("cx", function (d, i) { return x(d.date); })
			.attr("r", 5)
			.attr("class", "circle")
			.on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0.9);
            div	.html(formatTime(d.date) + "<br/>" + d.sleptHours + " hrs and " + d.sleptMinutes + " mins")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

		  });
}

getChart();
