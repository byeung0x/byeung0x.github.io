// get GOOG and GOOGL price data from Yahoo finance
let symbol = 'GOOG';
let series = {};
let GOOG = [], GOOGL = [];
//		
//Rm93foblBfnsRG23iFqGrjucizAi_Itd
//https://query1.finance.yahoo.com/v7/finance/download/GOOG?period1=1000073600&period2=1999946400&interval=1d&events=history&includeAdjustedClose=true
fetch('https://api.polygon.io/v2/aggs/ticker/GOOG/range/1/day/2000-07-22/2022-07-22?adjusted=false&sort=asc&apiKey=Rm93foblBfnsRG23iFqGrjucizAi_Itd')
	.then(function (response) {
		return response.json();
	})
	.then(function (text) {
		//console.log(text);
		let series = csvToSeries(text,'GOOG');
		
	})
	.catch(function (error) {
		//Something went wrong
		console.log(error);
	});

fetch('https://api.polygon.io/v2/aggs/ticker/GOOGL/range/1/day/2000-07-22/2022-07-22?adjusted=false&sort=asc&apiKey=Rm93foblBfnsRG23iFqGrjucizAi_Itd')
	.then(function (response) {
		return response.json();
	})
	.then(function (text) {
		//console.log(text);
		let series = csvToSeries(text,'GOOGL');
		renderChart(series);
	})
	.catch(function (error) {
		//Something went wrong
		console.log(error);
	});

function csvToSeries(text,symbol) {
	const date = 't', price = 'c';
	let dataAsJson = text.results;
	
	//console.log(dataAsJson);
	dataAsJson.forEach(function (row) {
		//add either to GOOG, GOOGL arrays, or discard.
		if (symbol=='GOOG'){
		GOOG.push({x: new Date(row[date]), y: row[price]});}
		else{
		GOOGL.push({x: new Date(row[date]), y: row[price]});}
		
		
	});
	return [
		{name: 'GOOG', points: GOOG},
		{name: 'GOOGL', points: GOOGL},
		
	];
}

function renderChart(series) {
	JSC.Chart('chartDiv', {
		title_label_text: 'GOOG v GOOGL spread',
		annotations: [{
			label_text: 'Source: Polygon.io',
			position: 'bottom left'
		}],
		legend_visible: false,
		xAxis_crosshair_enabled: true,
		defaultSeries_firstPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>$%yValue</b>',
		series: series
	});
}


