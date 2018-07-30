var parseDate =d3.timeParse("%Y");
var filename = "AK.csv";
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
          .domain([minyaxis,maxyaxis])
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
chartGroup.append('g').attr('class', 'x axis').attr('transform','translate(0,'+(height-191)+')').call(xAxis);
chartGroup.append('g').attr('class','y axis').call(yAxis);


//console.log(maxDate);
//console.log(minDate);
//console.log(maxPrice);

});
