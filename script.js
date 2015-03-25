
// graph data
var graphWidth  = 600,
	graphHeight = 400;

// parse dataCSV into json
var dataJSON = d3.csv.parse(data);

// parse out the dates
_.each(dataJSON, function (entry) {
	entry.date = d3.time.format('%m/%Y').parse(entry.Mes);
});

// create a path
var path = d3.select('#graph')
	.append('svg')
	.attr('width', graphWidth)
	.attr('height', graphHeight)
		.append('g')
			.append('path');

function updateGraph(periodicity) {
	// default periodicity 
	periodicity = periodicity || 'Mensal';


	// build a scale for the x axis
	// it uses time
	var xScale = d3.time.scale()
		.domain(d3.extent(dataJSON, function (entry) {
			return entry.date;
		}))
		.range([0, graphWidth]);

	// build a scale for the y axis
	// it uses the value
	var yScale = d3.scale.linear()
		.domain(d3.extent(dataJSON, function (entry) {
			return parseInt(entry[periodicity]);
		}))
		.range([graphHeight, 0]);

	// create a line object
	var line = d3.svg.line()
		.interpolate(false)
		// define x point for each data entry
		.x(function (entry) {
			// return the date, as it is used in our x axis
			return xScale(entry.date);
		})
		.y(function (entry) {
			// return the value, as it is used in our y axis
			return yScale(parseInt(entry[periodicity]));
		});

		console.log(path.datum)

	// apply line object to the path
	path.datum(dataJSON)
		// define a transition
		.transition().duration(400)
		// set the line object to the 'd' attribute of the path
		.attr('d', line);

}


// draw for the first time
updateGraph();
