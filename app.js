const express = require('express');
const config = require('./config').config; // dodając tę linię, trzeba pamiętać o stworzeniu pliku config.js
const service = require('./service');

const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

let chart1 = '{"type":"line","data":{"labels":["January","February","March","April","May","June"],"datasets":[{"label":"My First dataset","backgroundColor":"rgb(255, 99, 132)","borderColor":"rgb(255, 99, 132)","data":[0,10,5,2,20,30,45]}]},"options":{}}';

const temp = `Czas,Temperatura
2021-10-29 10:00:00,10
2021-10-29 11:00:00,13
2021-10-29 12:00:00,16
2021-10-29 13:00:00,18
2021-10-29 14:00:00,19
2021-10-29 15:00:00,19
2021-10-29 16:00:00,17`;

const dataChart2 = service.convertData(temp);

const chart2 = JSON.stringify(dataChart2);


app.get('/', (request, response) => {
   response.render(__dirname + '/index.html', {subject: 'Technologie webowe w aplikacjach Internetu', chart1: chart1, chart2: chart2})
})

app.listen(config.port, function () {
   console.info(`Server is running at port 3000`);
});
