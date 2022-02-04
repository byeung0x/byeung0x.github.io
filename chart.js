// get GOOG and GOOGL price data from Yahoo finance
let symbol = 'GOOG';
let series = {};

//		
//Rm93foblBfnsRG23iFqGrjucizAi_Itd
//https://query1.finance.yahoo.com/v7/finance/download/GOOG?period1=1000073600&period2=1999946400&interval=1d&events=history&includeAdjustedClose=true
fetch('https://api.polygon.io/v2/aggs/ticker/GOOG/range/1/day/2020-07-22/2022-07-22?adjusted=false&sort=asc&apiKey=Rm93foblBfnsRG23iFqGrjucizAi_Itd')
	.then(function (response) {
		return response.json();
	})
	.then(function (text) {
		console.log(text);
		let series = csvToSeries(text);
		renderChart(series);
	})
	.catch(function (error) {
		//Something went wrong
		console.log(error);
	});

function csvToSeries(text,symbol) {
	const price = 'c';
	let dataAsJson = text.results;
	let GOOG = [], GOOGL = [];
	dataAsJson.forEach(function (row) {
		//add either to GOOG, GOOGL arrays, or discard.
		
		GOOG.push({x: new Date(dataAsJson[row].t), y: dataAsJson[row][price]});
		
		
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


