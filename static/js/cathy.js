url = "api/bubble";

d3.json(url).then(function(data){ 
    console.log(data);
});



// Creating the drop down with each state as an option/row
function dropdown() {
    var stateSelect = d3.select("#selDataset")
    d3.json(url).then((data => {
            


        // Groupby of states
        const states = data.reduce((acc, value) => {
            // Group initialization
            if (!acc[value.state]) {
              acc[value.state] = [];
            }
           
            // Grouping
            acc[value.state].push(value);
           
            return acc;
    
          }, {});

          console.log(states)

          stateNames = Object.keys(states);
        //   stateNames.push("Australia");



        stateNames.forEach((sample) => {
            // this appends the rows in html with option tag .e.g. <option>NSW</option>
            stateSelect.append("option").text(sample).property("value", sample)
        })
    }))
};
dropdown()


// NEED TO CREATE INITIAL FUNCTION - preferably for all of australia

function buildCharts () {

    d3.json(url).then((data => {

        // Groupby of states
        const states = data.reduce((acc, value) => {
            if (!acc[value.state]) {
                acc[value.state] = [];
            }
            acc[value.state].push(value);
            return acc;
            }, {}
            );
        console.log(states);

        // vic variable
        var vic = states.VIC;
        // setting values for bubble chart
     
        var x_values = [];
        var i;
        for (i = 0; i < vic.length; i++) {
            value = vic[i].labor_percent;
            x_values.push(value);
        }

        var y_values = [];
        var i;
        for (i = 0; i < vic.length; i++) {
            value = vic[i].higher_education_completion_percent;
            y_values.push(value);
        }

        var percent_yes = [];
        var i;
        for (i = 0; i < vic.length; i++) {
            yes_count = vic[i].yes_count;
            total = vic[i].total_responses;
            percent = Math.round((yes_count/total)*100)
            percent_yes.push(percent);
        }

        var electorate_label = [];
        var i;
        for (i = 0; i < vic.length; i++) {
            electorate_name = vic[i].electoral_division;
            yes_count = vic[i].yes_count;
            total = vic[i].total_responses;
            percent = Math.round((yes_count/total)*100);
            electorate_label.push(('Electorate: ' + electorate_name + '<br>' +
                      'Percentage of yes votes: ' + percent + '%'))
        }

        



        // PLOTTING BUBBLE CHART 
        var trace1 = {
            x: x_values, 
            y: y_values,
            type: "scatter",
            text: electorate_label, // can we add yes percentage and some string info here?
            mode: 'markers',
            marker: {
                size: percent_yes,
                color: x_values,
                colorscale: "RdBu"
            }
        };
      
        var data = [trace1];
      
        var layout = {
            title: `Bubble chart`,
            xaxis: {
             title: "Percentage of labor votes in 2016 federal election"
            },
            yaxis: {
                title: "Percentage of population with a higher education"
            },
            showlegend: false,
            height: 600,
            width: 1000
            };
      
        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot('bubble', data, layout);
    
    }));
};

buildCharts()