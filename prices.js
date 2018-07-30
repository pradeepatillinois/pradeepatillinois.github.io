
var parseDate =d3.timeParse("%m/%d/%Y");


d3.csv("prices.csv")
  .row(function(d){ return { date:parseDate(d.date),price:Number(d.price.trim().slice(1))};})
  .get(function(error,data){
  console.log(data);


var height = 400;
var width = 600;

var maxDate = d3.max(data,function(d){return d.date;})
var minDate = d3.min(data,function(d){return d.date;})
var maxPrice = d3.max(data,function(d){return d.price;})

var y = d3.scaleLinear()
          .domain([0,maxPrice])
          .range([height,0])
var x = d3.scaleTime()
          .domain([minDate,maxDate])
          .range([0,width]);
var yAxis = d3.axisLeft(y);

var xAxis = d3.axisBottom(x);

var svg = d3.select('body').append('svg')
            .attr('height','100%')
            .attr('width','100%');

var chartGroup = svg.append('g')
                    .attr('transform','translate(50,50)');
var line = d3.line()
              .x(function(d){return x(d.date);})
              .y(function(d){return y(d.price);})
chartGroup.append('path').attr('d',line(data));
chartGroup.append('g').attr('class', 'x axis').attr('transform','translate(0,'+height+')').call(xAxis);
chartGroup.append('g').attr('class','y axis').call(yAxis);


//console.log(maxDate);
//console.log(minDate);
//console.log(maxPrice);

});
