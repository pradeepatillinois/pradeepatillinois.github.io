var optiondata = ["None","CO.csv","CA.csv","LA.csv","WI.csv","NM.csv","SC.csv","IA.csv","NJ.csv","UT.csv","AK.csv","KS.csv","VA.csv","NV.csv","MN.csv","MD.csv","WA.csv","MT.csv","MI.csv","ID.csv","AZ.csv","AR.csv","OH.csv","OR.csv","NC.csv","NE.csv","FL.csv","NY.csv","TX.csv","WY.csv","AL.csv","NH.csv","SD.csv","ND.csv","IL.csv","OK.csv","MO.csv","PA.csv","TN.csv","MS.csv","IN.csv","WV.csv","MA.csv","GA.csv","VT.csv","RI.csv","CT.csv","KY.csv","ME.csv","HI.csv","DE.csv"];

var select = d3.select('body')
  .append('select')
  	.attr('class','select')
    .on('change',onchange)

var options = select
  .selectAll('option')
	.data(optiondata).enter()
	.append('option')
		.text(function (d) { return d; });

function onchange() {
  //d3.exit();
filename = d3.select('select').property('value')

var parseDate =d3.timeParse("%Y");
//d3.selectAll("svg > *").remove();
//var filename = "AK.csv";
d3.csv(filename)
  .row(function(d){ return { year:parseDate(d.year),avgprecipitation:d.Precipitation_Average.trim(),maxtemp:d.Max_Temperature_Average.trim(),mintemp:d.Min_Temperature_Average.trim()};})
  .get(function(error,data){
  console.log(data);


var height = 400;
var width = 600;

var maxyear = d3.max(data,function(d){return d.year;})
var minyear = d3.min(data,function(d){return d.year;})
var maxyaxis = d3.max(data,function(d){return d.maxtemp;})
var minyaxis = d3.max(data,function(d){return d.mintemp;})

console.log(maxyear);
console.log(minyear);
console.log(maxyaxis)
console.log(minyaxis);


var y = d3.scaleLinear()
          .domain([-15,30])
          .range([height,0])
var x = d3.scaleTime()
          .domain([minyear,maxyear])
          .range([0,width]);

var yAxis = d3.axisLeft(y);

var xAxis = d3.axisBottom(x);

var svg = d3.select('body').append('svg')
            .attr('height','100%')
            .attr('width','100%');

var chartGroup = svg.append('g')
                    .attr('transform','translate(50,50)');
var line = d3.line()
              .x(function(d){return x(d.year);})
              .y(function(d){return y(d.avgprecipitation);})

var line2 = d3.line()
              .x(function(d){return x(d.year);})
              .y(function(d){return y(d.maxtemp);})

var line3 = d3.line()
              .x(function(d){return x(d.year);})
              .y(function(d){return y(d.mintemp);})

              //.y1(function(d){return y(d.maxtemp);})
chartGroup.append('path').attr('class','line').style('stroke','red').attr('d',line(data));
chartGroup.append('path').attr('class','line').style('stroke','blue').attr('d',line2(data));
chartGroup.append('path').attr('class','line').style('stroke','green').attr('d',line3(data));
chartGroup.append('g').attr('class', 'x axis').attr('transform','translate(0,'+(height-131)+')').call(xAxis);
chartGroup.append('g').attr('class','y axis').call(yAxis);




//console.log(maxDate);
//console.log(minDate);
//console.log(maxPrice);
chartGroup.append("text")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(filename + "Avg Max - Min Temperature & Avg Precipitation line chart");

  chartGroup.append("text")
        		.attr("transform", "translate(" + (width+3) + "," + y( data[data.length-1].avgprecipitation) + ")")
        		.attr("dy", ".35em")
        		.attr("text-anchor", "start")
        		.style("fill", "red")
        		.text("avgprecipitation(in mm)");

  chartGroup.append("text")
              .attr("transform", "translate(" + (width+3) + "," + y( data[data.length-1].maxtemp) + ")")
              .attr("dy", ".35em")
              .attr("text-anchor", "start")
              .style("fill", "steelblue")
              .text("maxtemp( in C)");

              chartGroup.append("text")
                          .attr("transform", "translate(" + (width+3) + "," + y( data[data.length-1].mintemp) + ")")
                          .attr("dy", ".35em")
                          .attr("text-anchor", "start")
                          .style("fill", "Green")
                          .text("mintemp(in C)");


});
};
