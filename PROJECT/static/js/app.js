// 3 X CHARTS FOR EACH STATE
// NEED TO TIDY UP CODE

const url_bubble = "api/bubble";

const url_bar = "api/bar";

const url_pie = "api/pie"; 

// d3.json(url_pie).then(function(data){ 
//     console.log("PIE DATA")
//     console.log(data);
// });



//////////////////////////////////////////////////////////////////////////////


// CREATING INITIAL FUNCTION 
// Creates dropdown menu and sets charts with an initial value
function init() {
    // Using D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Using D3 library to read the bubble.json file
    d3.json(url_bubble).then((data => {
        // Checking the data is being read in properly
        console.log("DATA");
        console.log(data);


        // Need to do a groupby of states as we do not have this yet
        const states = data.reduce((acc, value) => {
            // Group initialization
            if (!acc[value.state]) {
              acc[value.state] = [];
            }
           
            // Grouping
            acc[value.state].push(value);
           
            return acc;
    
          }, {});

          // Checking the groupby is working properly
          console.log("GROUPBY STATES for dropdown");
          console.log(states);

          // Determining the order of the dropdown options
          stateNames = [];
          // AUS
        //   stateNames.push("AUS");
          // Index 1 = VIC
          stateNames.push(Object.keys(states)[1]);
          // Index 2 = NSW
          stateNames.push(Object.keys(states)[2]);
          // Index 0 = SA
          stateNames.push(Object.keys(states)[0]);
          stateNames.push(Object.keys(states)[3]);
          stateNames.push(Object.keys(states)[4]);
          stateNames.push(Object.keys(states)[5]);
          stateNames.push(Object.keys(states)[6]);
          stateNames.push(Object.keys(states)[7]);
                      
        // this appends the rows in html with option tag .e.g. <option>NSW</option>
        stateNames.forEach((function(x) {
            dropdownMenu.append("option").text(x).property("value", x)
        }));


           
    }));

    // // Setting an intial index value for the first charts - 1 for VIC
    // // Then running starting plots function with that value
    var initialIndex = 1;
    starting_plots(initialIndex);
    // // bar_chart(initialIndex); // this  will become any other functions thast change on drop down
};
init();


////////////////////////////////////////////////////////////////////////////


// CREATING A FUNCTION FOR THE STARTING PLOTS - bubble, bar and pie
// Using variable index as this will relate to the selected state in the dropdown menu and reference the index of the object needed from the sampleData array
function starting_plots(index){

    // Reading in data for bubble chart
    d3.json(url_bubble).then((data) => {

        // Groupby of states
        const states = data.reduce((acc, value) => {
            if (!acc[value.state]) {
                acc[value.state] = [];
            }
            acc[value.state].push(value);
            return acc;
            }, {}
            );
        
        // Accessing the information for each state
        stateInfo = Object.values(states)
        console.log("testing accessing a particular state for bubble")
        console.log(stateInfo[1])


        // need to access the state information section
        var sampleData = stateInfo; 
        // obtaining particular section using index
        var section = sampleData[index];
        console.log("STARTING SECTION for bubble - SA");
        console.log(section);


        // Obtaining the values for the bubble chart 
        var x_values = [];
        var i;
        for (i = 0; i < section.length; i++) {
            value = section[i].labor_percent;
            x_values.push(value);
        }

        var y_values = [];
        var i;
        for (i = 0; i < section.length; i++) {
            value = section[i].higher_education_completion_percent;
            y_values.push(value);
        }

        var percent_yes = [];
        var i;
        for (i = 0; i < section.length; i++) {
            yes_count = section[i].yes_count;
            total = section[i].total_responses;
            percent = Math.round((yes_count/total)*100)
            percent_yes.push(percent);
        }

        var electorate_label = [];
        var i;
        for (i = 0; i < section.length; i++) {
            electorate_name = section[i].electoral_division;
            yes_count = section[i].yes_count;
            total = section[i].total_responses;
            percent = Math.round((yes_count/total)*100);
            electorate_label.push(('Electorate: ' + electorate_name + '<br>' +
                      'Percentage of yes votes: ' + percent + '%'))
        }


        // Plotting the bubble chart
        var trace1 = {
            x: x_values, 
            y: y_values,
            type: "scatter",
            text: electorate_label, 
            mode: 'markers',
            marker: {
                size: percent_yes,
                color: x_values,
                colorscale: "RdBu",
                colorbar: {
                    thickness: 10,
                    y: 0.5,
                    ypad: 0,
                    title: '% Labor Votes',
                    titleside: 'bottom',
                    outlinewidth: 1,
                    outlinecolor: 'black',
                    tickfont: {
                      family: 'Arial',
                      size: 12,
                      color: 'black'
                    }
                  }
            }
        };
      
        var data = [trace1];
      
        var layout = {
            title: `${stateNames[index]}: Higher Education Percentage vs. 2016 Federal Election Votes <br> Bubble Size Represents Percentage of Yes Votes`,
            xaxis: {
             title: "Labor Votes in 2016 Federal Election (As % of All Labor and Liberal Votes)"
            },
            yaxis: {
                title: "Electorate Population With Higher Education (%)"
            },
            showlegend: false,
            height: 600,
            width: 1100
            };
      
        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot('bubble', data, layout);
        
        }); // end of reading in data for bubble



///////////////////////////////////////////////////////////////////



    // Reading in data for bar chart
    d3.json(url_bar).then((data) => {
        console.log("BAR DATA")
        console.log(data);

        const states = data.reduce((acc, value) => {
            if (!acc[value.state]) {
                acc[value.state] = [];
            }
            acc[value.state].push(value);
            return acc;
            }, {}
            );
        console.log("Testing groupby of bar data")
        console.log(states);

        stateNames = Object.keys(states);
        console.log("Testing state names in bar")
        console.log(stateNames);

        // Accessing the information for each state
        stateInfo = Object.values(states)
        console.log("testing bar state info")
        console.log(stateInfo)


        // need to access the state information section
        var sampleData = stateInfo; 
        // obtaining particular section using index
        var section = sampleData[index];
        console.log("Starting section for bar - SA");
        console.log(section);


        // Obtaining the values for the bar chart 

        // ages_18_34: 20745
        var ages_18_34 = [];
        var i;
        for (i = 0; i < section.length; i++) {
            var value = section[i].ages_18_34;
            var total = section[i].ages_18_34 + section[i].ages_35_49 + section[i].ages_50_64 + section[i].ages_65_79 + section[i].ages_80_plus
            var percent = (value/total)*100;
            ages_18_34.push(percent);
        }
        console.log("ages_18_34");
        console.log(ages_18_34);

        // ages_35_49: 18667
        var ages_35_49 = [];
        var i;
        for (i = 0; i < section.length; i++) {
            value = section[i].ages_35_49;
            var total = section[i].ages_18_34 + section[i].ages_35_49 + section[i].ages_50_64 + section[i].ages_65_79 + section[i].ages_80_plus
            var percent = (value/total)*100;
            ages_35_49.push(percent);
        }
        
        // ages_50_64: 21236
        var ages_50_64 = [];
        var i;
        for (i = 0; i < section.length; i++) {
            value = section[i].ages_50_64;
            var total = section[i].ages_18_34 + section[i].ages_35_49 + section[i].ages_50_64 + section[i].ages_65_79 + section[i].ages_80_plus
            var percent = (value/total)*100;
            ages_50_64.push(percent);
        }
        
        // ages_65_79: 13420
        var ages_65_79 = [];
        var i;
        for (i = 0; i < section.length; i++) {
            value = section[i].ages_65_79;
            var total = section[i].ages_18_34 + section[i].ages_35_49 + section[i].ages_50_64 + section[i].ages_65_79 + section[i].ages_80_plus
            var percent = (value/total)*100;
            ages_65_79.push(percent);
        }
        
        // ages_80_plus: 3638
        var ages_80_plus = [];
        var i;
        for (i = 0; i < section.length; i++) {
            value = section[i].ages_80_plus;
            var total = section[i].ages_18_34 + section[i].ages_35_49 + section[i].ages_50_64 + section[i].ages_65_79 + section[i].ages_80_plus
            var percent = (value/total)*100;
            ages_80_plus.push(percent);
        }
        
        // Names
        var electoral_divisions = [];
        var i;
        for (i = 0; i < section.length; i++) {
            value = section[i].electoral_division;
            electoral_divisions.push(value)
        }


        // Plotting bar chart

        var trace1 = {
            y: electoral_divisions,
            x: ages_18_34,
            name: "Ages 18-34",
            orientation: "h",
            marker: {
                color: "#c5ebb2", 
                width: 1
            },
            type: "bar"
        };
        var trace2 = {
            y: electoral_divisions,
            x: ages_35_49,
            name: "Ages 35-49",
            orientation: "h",
            type: "bar",
            marker: {
                color: "#42bea8", 
                width: 1
            }
        };
        var trace3 = {
            y: electoral_divisions,
            x: ages_50_64,
            name: "Ages 50-64",
            orientation: "h",
            type: "bar",
            marker: {
                color: "#008aad", 
                width: 1
            }
        };
        var trace4 = {
            y: electoral_divisions,
            x: ages_65_79,
            name: "Ages 65-79",
            orientation: "h",
            type: "bar",
            marker: {
                color: "#00509c",
                width: 1
            }
        };
        var trace5 = {
            y: electoral_divisions,
            x: ages_80_plus,
            name: "Ages 80+",
            orientation: "h",
            type: "bar",
            marker: {
                color: "#31005c",
                width: 1
            }
        };
        var data = [trace1, trace2, trace3, trace4, trace5];
        var layout = {
            title: `${stateNames[index]}: Survey Respondents by Age`,
            barmode: "stack",
            height: 700,
            width: 600,
            yaxis:{title: "Federal Electorate"},
            xaxis:{title: "Percentage"}
        };
        Plotly.newPlot("bar", data, layout);

    }); // end of reading in data for bar 


///////////////////////////////////////////////////////////////////////////////

    
    // Reading in data for pie chart
    d3.json(url_pie).then((data) => {
        console.log("PIE DATA")
        console.log(data);

        const states = data.reduce((acc, value) => {
            if (!acc[value.state]) {
                acc[value.state] = [];
            }
            acc[value.state].push(value);
            return acc;
            }, {}
            );
        console.log("Testing groupby of pie data")
        console.log(states);

        stateNames = Object.keys(states);
        console.log("Testing state names for pie")
        console.log(stateNames);

        // Accessing the information for each state
        stateInfo = Object.values(states)
        console.log("testing pie state info")
        console.log(stateInfo)


        // need to access the state information section
        var sampleData = stateInfo; 
        // obtaining particular section using index
        var section = sampleData[index];
        console.log("Starting section for pie - SA");
        console.log(section);


        // Obtaining the values for the pie chart

        var yes_values = [];
        var i;
        for (i = 0; i < section.length; i++) {
            yes_count = section[i].yes_count;
            yes_values.push(yes_count);
        }
        console.log(" PIE yes count for all of selected state")
        console.log(yes_values)

        var no_values = [];
        var i;
        for (i = 0; i < section.length; i++) {
            no_count = section[i].no_count;
            no_values.push(no_count);
        }

        // Need to sum these values in the array together
        var sum_yes = yes_values.reduce(function(a, b){
            return a + b;
        }, 0);
        console.log("SUM OF YES for electorals of selected state");
        console.log(sum_yes);

        // Need to sum these values in the array together
        var sum_no = no_values.reduce(function(a, b){
            return a + b;
        }, 0);
        console.log("SUM OF NO for electorals of selected state");
        console.log(sum_no);

        // Creating a variable for pie values that pushes yes and no sums into an array
        var pie_values = [];
        pie_values.push(sum_yes)
        pie_values.push(sum_no)
        console.log("VALUES FOR PIE CHART for electorals of selected state")
        console.log(pie_values)

        // Creating a variable for labels
        var pie_labels = ["Yes votes", "No votes"];
        
        // Creating a variable for colours
        var pie_colours = ["#58508d", "#bc5090"];
        
        
        // Plotting pie chart

        var data = [{
            values: pie_values,
            labels: pie_labels, 
            type: 'pie',
            marker: {
                colors: pie_colours
              }
        }];
        
        var layout = {
            title: `${stateNames[index]}: Total Vote Types`,
            height: 575,
            width: 575
        };
        
        Plotly.newPlot('pie', data, layout);


    }); // end of reading in data for pie


}; //end of starting_plots function
// starting_plots();


//////////////////////////////////////////////////////////////////////////////


// CREATING A FUNCTION FOR OPTION CHANGED
// Calling optionChanged function when a change takes place to the DOM
d3.selectAll("body").on("change", optionChanged());

// This function is called when a dropdown menu item is selected
function optionChanged(stateSelection) {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assigning the value of the dropdown menu option to a variable idSelection
    var stateSelection = dropdownMenu.node().value;
    console.log("STATE SELECTION");
    console.log(stateSelection);

    // now need to link the value stateSlection to a index

    // this is how we reach the actual state 
    // so the dictionary needs to be accessed through the index
    // this gets state for index 0?! **

    d3.json(url_bubble).then((data) => {

        
        // need to access the state name  
        var sampleData = stateNames; 
    

        // looping through each dictionary in sampledata
        // this is so we can find which particular object/dictionary matches the one selected through the dropdown menu
        for (var i = 0; i < sampleData.length; i++) {
            // comparing the id selected in the dropdown menu to the id of each object
            if(sampleData[i] == stateSelection){

                // if they match then the index of the object is obtained
                // this will then be used to change the graphs
                index = i;
                console.log("INDEX OF SELECTED")
                console.log(index)

                // // selecting the current values in the demographic panel
                // var currentInfo = d3.select("#sample-metadata").selectAll("h5");
                // // console.log(currentInfo)
                // // removing the current values in the demographic panel
                // currentInfo.remove();

                // Updating the plots with the index value based on the selected state
                starting_plots(index);
                // // Updating the demographic panel with the index value based on the selected id
                // demographic(index);
                // // updating the bonus challenge gauge chart
                // extra(index);

            
            }
        }

    });

};
// optionChanged();


























