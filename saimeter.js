function saimeter(text, completed, maximum, color){
    if (text == ""){
        text = "Saimeter"
    }
    if(color == ""){
        color = '#69C434'
    }else{
        color = "#"+color
    }
    var gauge = {
        title:{text: text},
        data: { y: completed }, //gauge value 
        maximum: maximum
    };
    var chart = new CanvasJS.Chart("saimeter");
    createGauge(chart);
    //Function for gauge
    function createGauge(chart){
    //Caluculation of remaining parameters to render gauge with the help of doughnut
    gauge.unoccupied = {
        y: gauge.maximum - gauge.data.y , 
        color: "#DEDEDE", 
        toolTipContent: null, 
        highlightEnabled: false,
        click : function (){ gauge.unoccupied.exploded = true; }
    }
    gauge.data.click = function (){ gauge.data.exploded = true; };
    if(!gauge.data.color)
        gauge.data.color = color;
    gauge.valueText = {text: gauge.data.y.toString()+'% Complete', verticalAlign :"center"};

    var data = {
        type: "doughnut",
        dataPoints: [
        {
            y: gauge.maximum ,
            color: "transparent",
            toolTipContent: null
        },
        gauge.data,
        gauge.unoccupied
        ],
    };

    if(!chart.options.data)
        chart.options.data = [];
    chart.options.data.push(data);

    if(gauge.title){
        chart.options.title = gauge.title;
    }

    //For showing value
    if(!chart.options.subtitles)
        chart.options.subtitles = [];
    chart.options.subtitles.push(gauge.valueText);

    chart.render();
    var x = document.getElementsByClassName("canvasjs-chart-credit");
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    }
}
