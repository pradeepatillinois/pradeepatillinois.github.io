//This is for the line A
    var lineGen = d3.svg.line()
                    .x(function(d) {
                      return xScale(d.date);
                    })
                    .y(function(d) {
                      return yScale(d.A);
                    })
                    .interpolate("basis");
//This is for the line B
    var lineGen2 = d3.svg.line()
                     .x(function(d) {
                       return xScale(d.date);
                     })
                     .y(function(d) {
                       return yScale(d.B);
                     })
                     .interpolate("basis");

var data = d3.csv("new_test2.csv", function(data) {
             vis.append('svg:path')
               .attr('d', lineGen(data))  //This is for the line A
               .attr('stroke', 'green')
               .attr('stroke-width', 2)
               .attr('fill', 'none');

             vis.append('svg:path')
                .attr('d', lineGen2(data))  //This is for the line B
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
             });
