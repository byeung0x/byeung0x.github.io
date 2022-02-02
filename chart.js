// get GOOG and GOOGL price data from Yahoo finance
let symbol = 'GOOG';
let series = {};

		


fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv',
      {'content-type': 'text/csv;charset=UTF-8',cache: 'force-cache',mode: 'no-cors'})
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		let series = csvToSeries(text);
		renderChart(series);
	})
	.catch(function (error) {
		//Something went wrong
		console.log(error);
	});

function csvToSeries(text,symbol) {
	const price = 'Close';
	let dataAsJson = JSC.csv2Json(text);
	let GOOG = [], GOOGL = [];
	console.log(text);
	console.log(dataAsJson);
	dataAsJson.forEach(function (row) {
		//add either to GOOG, GOOGL arrays, or discard.
		
		GOOG.push({x: row.Date, y: row[price]});
		
		
	});
	return [
		{name: 'GOOG', points: GOOG},
		
	];
}

function renderChart(series) {
	JSC.Chart('chartDiv', {
		title_label_text: 'GOOG v GOOGL spread',
		annotations: [{
			label_text: 'Source: Yahoo Finance',
			position: 'bottom left'
		}],
		legend_visible: false,
		xAxis_crosshair_enabled: true,
		defaultSeries_firstPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
		series: series
	});
}


