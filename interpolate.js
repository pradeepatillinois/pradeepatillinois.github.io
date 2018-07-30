var dataArray = [{x:4,y:10},{x:7,y:5},{x:9,y:15},{x:13,y:9},{x:15,y:6},{x:20,y:20}]

var svg =d3.select('body')
.append('svg')
.attr('height','100%').attr('width','100%')

var line = d3.line()
              .x(function(d,i){return d.x*10;})
              .y(function(d,i){return d.y*20;})
              .curve(d3.curveCardinal)

svg.append('path')
    .attr('d',line(dataArray))
    .attr('fill','none')
    .attr('stroke','red');
