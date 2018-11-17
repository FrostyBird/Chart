
//script for charts

var chartCanv = document.getElementById("chartCanv");
var ctx = chartCanv.getContext("2d");

var colorCurr = 0;
var colors = ["#ff0000","#00ff00","#0000ff"];

var cWidth = chartCanv.width;
var cHeight = chartCanv.height;

var data = [4,8,15,16,23,42];


//I just made these numbers up out of nowhere because they seemed nice
//TO DO: maybe improve upon them 
var xAxisStart = cWidth/12;
var yAxisStart = cHeight/8;
var xAxisEnd = cWidth-(cWidth/6);
var yAxisEnd = cHeight * .75;

var barWidth = cWidth/12;
//"xAxisStart/3" = some arbitrarily small number to stop heightMax from hitting the exact top of the axis
var heightMax = yAxisEnd-xAxisStart-(xAxisStart/3);
var barStart = cWidth * .1;
var barInterval = cWidth * .1;

function drawAxes(){
    ctx.beginPath();
    ctx.moveTo(xAxisStart,yAxisStart);
    ctx.lineTo(xAxisStart,yAxisEnd);
    ctx.lineTo(xAxisEnd,yAxisEnd);
    ctx.stroke();
}

function chartInfo(aData){
    
  var dataMax = aData.reduce(function(a,b){return Math.max(a,b);});
  var dataMin = aData.reduce(function(a,b){return Math.min(a,b);});
  
  for(i=0;i<aData.length;i++){
      var thisHeight = (yAxisEnd-1)-((aData[i]*heightMax)/dataMax);
      drawRect(thisHeight);
        if(aData[i] === dataMin){
            labelAxes(dataMin,thisHeight);
        } else if (aData[i] === dataMax){
            labelAxes(dataMax,thisHeight);
        }
  }
}

function drawRect(y){
    //in this scale, 299 as height = value of 0
    //50 should be the max
        
    ctx.fillStyle = colors[colorCurr];
    //last argument is 299 because of the 1 px height of the axis line!
    ctx.fillRect(barStart,y,barWidth,(yAxisEnd-1)-y);
    barStart += barInterval;
  
    if(colorCurr < 2){
      colorCurr += 1;
    } else {
      colorCurr = 0;
    }
}

function labelAxes(value,position){
    
    ctx.fillStyle = "#000000";
    ctx.fillText(value,30,position);
    
}



window.onload = function(){

    drawAxes();
    chartInfo(data);
    
};

