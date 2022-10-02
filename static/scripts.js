var temp_canvas = document.getElementById('temperature');
var press_canvas = document.getElementById('pressure');

// canvas.canvas.width = 300;
// canvas.canvas.height = 300;
function primeJSON(){
    var value= $.ajax({ 
       url: 'http://localhost:8000/data', 
       async: false
    }).responseText;
    return JSON.parse(value);
}

function updateChart(){
    $.getJSON("http://localhost:8000/last_tick", 
         function(data) {
            if (json_data.labels[json_data.labels.length - 1] === data.labels) {
            } else {
                tempChart.data.labels.push(data.labels);
                tempChart.data.datasets[0].data.push(data.temp);
                pressChart.data.datasets[0].data.push(data.press);
                tempChart.update();
                pressChart.update();
            }
         }); 
 }

json_data = primeJSON()
var temp_data = {
    labels: json_data.labels,
    datasets: [
        {
            label: "Temperature",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: json_data.temp,
        }
    ]
};

var tempChart = Chart.Line(temp_canvas,{
	data: temp_data,
    options: {
        responsive: false,
        showLines: true
    }
});

var press_data = {
    labels: json_data.labels,
    datasets: [
        {
            label: "Pressure",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: json_data.press,
        }
    ]
};

var pressChart = Chart.Line(press_canvas,{
	data: press_data,
    options: {
        responsive: false,
        showLines: true
    }
});

setInterval(updateChart, 1000);