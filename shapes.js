var dataArray  =[2,13,15,17,22,24,29];
var dataFruit =["Apple","Orange","Grape","Banana","Kiwi","Melon","Peach"];
var colorscal = d3.scaleSequential(d3.interpolateRainbow).domain([0,10]);
var newcolorscal = d3.scaleSequential(d3.interpolateRainbow).domain([0,3]);

//var x =d3.scaleOrdinal()
//var x = d3.scalePoint()
var x = d3.scaleBand()
          .domain(dataFruit)
          //.range([35,115,195,275,355,435,515]);
          .range([0,550])
          .padding(0,0.109);

var xAxis =d3.axisBottom(x);

var svg  = d3.select("body").append("svg").attr('height','100%').attr('width','100%');

svg.selectAll('rect')
  .data(dataArray)
  .enter().append('rect')
    .attr('height',function (d,i) {return d*10;})
    .attr('width','70')
    .attr('fill',function(d,i){return colorscal(i)})
    .attr('x',function (d,i) {return 80*i;})
    .attr('y',function(d,i){return 350 - (d*10)});

svg.append('g')
    .attr('class','x axis hidden')
    .attr('transform','translate(0,350)')
    .call(xAxis);

var fixedX =600;

svg.selectAll('circle.groupa')
.data(dataArray)
.enter().append('circle')
  .attr('class','groupa')
  .attr('fill',function(d,i){return newcolorscal(i);})
  .attr('cx',function(d,i){fixedX+= (d*4)+(30);return fixedX;})
  .attr('cy','150')
  .attr('r',function(d,i){return d*2});

var fixedX =1200;
svg.selectAll('circle.groupb')
.data(dataArray)
.enter().append('circle')
  .attr('class', 'groupb')
  .attr('cx',function(d,i){fixedX+= (d*4)+(30);return fixedX;})
  .attr('cy','150')
  .attr('r',function(d,i){return d*2});


  var fixedX =0;
  svg.selectAll('line')
  .data(dataArray)
  .enter().append('line')
    .attr('x1', fixedX)

    .attr('y1',function(d,i){return 400 +(i*20);})
    .attr('x2',function(d){return fixedX +(d*20);})
    .attr('y2',function(d,i){return 400 +(i*20);});

var textArray = ['one','two','three'];
var fixedx = 500;
svg.append('text').selectAll('tspan')
  .data(textArray)
  .enter().append('tspan')

  .attr('x',fixedx)
  .attr('stroke','red')
  .attr('text-anchor','start')
  .attr('dominant-baseline','middle')
  .attr('stroke-width','3')
  .attr('y',function(d,i){return 400 + (50*i);})
  .attr('font-size','50')
  .text(function(d){return d;});
