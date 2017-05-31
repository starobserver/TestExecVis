
function chart_ModulesExecData_init(){
        
        var outerWidth = 1000;
        var outerHeight = 500;
        var margin = { left: 90, top: 30, right: 30, bottom: 100 };
        var barPadding = 0.2;
        var innerWidth  = outerWidth  - margin.left - margin.right;
        var innerHeight = outerHeight - margin.top  - margin.bottom;
        var svg = d3.select("#module-testNr-barChart").select("svg")
          .attr("width",  outerWidth)
          .attr("height", outerHeight);
        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var xAxisG = g.append("g")
          .attr("class", "xaxis")
          .attr("transform", "translate(0," + innerHeight + ")");
        var yAxisG = g.append("g")
          .attr("class", "yaxis");    


     
    }
    

function render_ModulesExecData(data){
        //console.log(data);
        var outerWidth = 1000;
        var outerHeight = 500;
        var margin = { left: 90, top: 30, right: 30, bottom: 100 };
        var barPadding = 0.2;

        var xColumn = "module_Name";
        var yColumn = "module_nrTestsStarted";

        var innerWidth  = outerWidth  - margin.left - margin.right;
        var innerHeight = outerHeight - margin.top  - margin.bottom;
        var svg = d3.select("#module-testNr-barChart").select("svg")
        var g = svg.select("g")
        var xAxisG = g.select("g.xaxis")          
        var yAxisG = g.select("g.yaxis")

        var xScale = d3.scaleBand().range([0, innerWidth], barPadding);
        var yScale = d3.scaleLinear().range([innerHeight, 0]);
        var selection = null;

        xScale.domain(       data.map( function (d){ return d[xColumn]; }));
        yScale.domain([0, d3.max(data, function (d){ return d[yColumn]; })]);

        

        var bars = g.selectAll(".bar").data(data);
        //console.log(bars);
       
        var bars_enter = bars.enter().append("rect")

        bars.merge(bars_enter)
          .attr("x",      function (d){ return               xScale(d[xColumn]); })
          .attr("width", xScale.bandwidth())
          .attr("y",      function (d){ return               yScale(d[yColumn]); })
          .attr("height", function (d){ return innerHeight - yScale(d[yColumn]); })
          .attr("class", "bar")
          .append("title");
         
        bars.merge(bars_enter)
          .attr("x",      function (d){ return               xScale(d[xColumn]); })
          .attr("width", xScale.bandwidth())
          .attr("y",      function (d){ return               yScale(d[yColumn]); })
          .attr("height", function (d){ return innerHeight - yScale(d[yColumn]); })
          .on('click', function(d, i) {
              //console.log(`clicked on: ${d} (${i})`);
              //remove old selection
              if (selection != null) {
                selection.style('fill', 'steelblue');
              }
              
              selection = d3.select(this); // can't use arrow scoping
              selection.style('fill', 'orange');
            });
        var bars_title = bars.merge(bars_enter).select("title")
        bars_title.text((d) => d[xColumn]);

      bars.exit().remove();
      // add the x Axis     
      xAxisG.call(d3.axisBottom(xScale))
      .selectAll("text")
    	.style("font-size", "10px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );;

      // add the y Axis      
      yAxisG.call(d3.axisLeft(yScale));

      bars.exit().remove();
     
      }

      function type_ModulesExecData(d){
      
        d.module_Name = d.module_Name;
        d.module_nrTestsStarted = +d.module_nrTestsStarted;
        //define timestampFormat; example: 20.04.2017 17:27:43
        var parseTimestamp = d3.timeParse("%d.%m.%Y %H:%M:%S");        
        d.module_startTimestamp = parseTimestamp(d.module_startTimestamp);
        //console.log("type_ModulesExecData end:");
        //console.log(d);
        return d;
      }