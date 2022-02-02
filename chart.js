// get GOOG and GOOGL price data from Yahoo finance
let symbol = 'GOOG'
fetch('https://query1.finance.yahoo.com/v7/finance/download/' & symbol & '?period1=1000073600&period2=1999960000&interval=1d&events=history&includeAdjustedClose=true')
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		let series.symbol = csvToSeries(text,symbol);});
		


fetch('https://query1.finance.yahoo.com/v7/finance/download/GOOGL?period1=1000073600&period2=1999960000&interval=1d&events=history&includeAdjustedClose=true')
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


