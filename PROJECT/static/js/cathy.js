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

          // Checking the groupby is working properly
          console.log("GROUPBY STATES for dropdown");
          console.log(states);

          // Determining the order of the dropdown options
          stateNames = [];
          // AUS
          stateNames.push("AUS");
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
    // var initialIndex = 1;
    // starting_plots(initialIndex);
    // // bar_chart(initialIndex); // this  will become any other functions thast change on drop down
};
init();


////////////////////////////////////////////////////////////////////////////


// // CREATING A FUNCTION FOR THE STARTING PLOTS - bubble, bar and pie
// // Using variable index as this will relate to the selected state in the dropdown menu and reference the index of the object needed from the sampleData array
// function starting_plots(index){





// // Reading in data for bubble chart
// d3.json(url_bubble).then((data) => {

//     // Groupby of states
//     const states = data.reduce((acc, value) => {
//         if (!acc[value.state]) {
//             acc[value.state] = [];
//         }
//         acc[value.state].push(value);
//         return acc;
//         }, {}
//         );
    
//     // Accessing the information for each state
//     stateInfo = Object.values(states)
//     console.log("testing accessing a particular state for bubble")
//     console.log(stateInfo)


//     // need to access the state information section
//     var sampleData = stateInfo; 
//     // obtaining particular section using index
//     var section = sampleData[index];
//     console.log("STARTING SECTION for bubble - SA");
//     console.log(section);


//     // Obtaining the values for the bubble chart 
//     var x_values = [];
//     var i;
//     for (i = 0; i < section.length; i++) {
//         value = section[i].labor_percent;
//         x_values.push(value);
//     }
//     console.log("X VALS");
//     console.log(x_values);

//     var y_values = [];
//     var i;
//     for (i = 0; i < section.length; i++) {
//         value = section[i].higher_education_completion_percent;
//         y_values.push(value);
//     }

//     var percent_yes = [];
//     var i;
//     for (i = 0; i < section.length; i++) {
//         yes_count = section[i].yes_count;
//         total = section[i].total_responses;
//         percent = Math.round((yes_count/total)*100)
//         percent_yes.push(percent);
//     }

//     var electorate_label = [];
//     var i;
//     for (i = 0; i < section.length; i++) {
//         electorate_name = section[i].electoral_division;
//         yes_count = section[i].yes_count;
//         total = section[i].total_responses;
//         percent = Math.round((yes_count/total)*100);
//         electorate_label.push(('Electorate: ' + electorate_name + '<br>' +
//                     'Percentage of yes votes: ' + percent + '%'))
//     }


//     // Plotting the bubble chart
//     var trace1 = {
//         x: x_values, 
//         y: y_values,
//         type: "scatter",
//         text: electorate_label, 
//         mode: 'markers',
//         marker: {
//             size: percent_yes,
//             color: x_values,
//             colorscale: "RdBu",
//             colorbar: {
//                 thickness: 10,
//                 y: 0.5,
//                 ypad: 0,
//                 title: 'Liberal to labor',
//                 titleside: 'bottom',
//                 outlinewidth: 1,
//                 outlinecolor: 'black',
//                 tickfont: {
//                     family: 'Arial',
//                     size: 12,
//                     color: 'black'
//                 }
//                 }
//         }
//     };
    
//     var data = [trace1];
    
//     var layout = {
//         title: `Correlation between federal election results and education for State  Size of bubble represented by percentage of yes votes`,
//         xaxis: {
//             title: "Percentage of labor votes in 2016 federal election as opposed to liberal"
//         },
//         yaxis: {
//             title: "Percentage of population with a higher education"
//         },
//         showlegend: false,
//         height: 600,
//         width: 1000
//         };
    
//     // Render the plot to the div tag with id "bubble"
//     Plotly.newPlot('bubble', data, layout);
    
//     }); // end of reading in data for bubble






// ///////////////////////////////////////////////////////////////////



// Reading in data for bar chart
d3.json(url_bar).then((data) => {
    console.log("BAR DATA")
    console.log(data);

    const dataaa = data.reduce((acc, value) => {
        if (!acc[value.state]) {
            acc[value.state] = [];
        }
        acc[value.state].push(value);
        return acc;
        }, {}
        );
    console.log("Testing groupby of bar data")
    console.log(dataaa);

    stateInfo = Object.values(dataaa);
    console.log("stateInfo")
    console.log(stateInfo)


    // ages_18_34: 20745
    var ages_18_34 = [];
    var i;
    for (i = 0; i < data.length; i++) {
        var value = data[i].ages_18_34;
        var total = data[i].ages_18_34 + data[i].ages_35_49 + data[i].ages_50_64 + data[i].ages_65_79 + data[i].ages_80_plus
        var percent = Math.round((value/total)*100);
        ages_18_34.push(percent);
    }
    

    // ages_35_49: 18667
    var ages_35_49 = [];
    var i;
    for (i = 0; i < data.length; i++) {
        value = data[i].ages_35_49;
        var total = data[i].ages_18_34 + data[i].ages_35_49 + data[i].ages_50_64 + data[i].ages_65_79 + data[i].ages_80_plus
        var percent = Math.round((value/total)*100);
        ages_35_49.push(percent);
    }
    
    // ages_50_64: 21236
    var ages_50_64 = [];
    var i;
    for (i = 0; i < data.length; i++) {
        value = data[i].ages_50_64;
        var total = data[i].ages_18_34 + data[i].ages_35_49 + data[i].ages_50_64 + data[i].ages_65_79 + data[i].ages_80_plus
        var percent = Math.round((value/total)*100);
        ages_50_64.push(percent);
    }
    
    // ages_65_79: 13420
    var ages_65_79 = [];
    var i;
    for (i = 0; i < data.length; i++) {
        value = data[i].ages_65_79;
        var total = data[i].ages_18_34 + data[i].ages_35_49 + data[i].ages_50_64 + data[i].ages_65_79 + data[i].ages_80_plus
        var percent = Math.round((value/total)*100);
        ages_65_79.push(percent);
    }
    
    // ages_80_plus: 3638
    var ages_80_plus = [];
    var i;
    for (i = 0; i < data.length; i++) {
        value = data[i].ages_80_plus;
        var total = data[i].ages_18_34 + data[i].ages_35_49 + data[i].ages_50_64 + data[i].ages_65_79 + data[i].ages_80_plus
        var percent = Math.round((value/total)*100);
        ages_80_plus.push(percent);
    }
    
    // Names
    var electoral_divisions = [];
    var i;
    for (i = 0; i < data.length; i++) {
        value = data[i].electoral_division;
        electoral_divisions.push(value)
    }


    // Plotting bar chart

    var trace1 = {
        y: electoral_divisions,
        x: ages_18_34,
        name: "Ages 18-3",
        orientation: "h",
        marker: {
            color: "LightSteelBlue", 
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
            color: "LightSlateGrey", 
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
            color: "DimGray", 
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
            color: "DarkCyan",
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
            color: "DarkSlateGray",
            width: 1
        }
    };
    var dataa = [trace1, trace2, trace3, trace4, trace5];
    var layout = {
        title: `Survey Respondents by Age`,
        barmode: "stack",
        height: 700,
        width: 600,
        yaxis:{title: "Federal Electorate"},
        xaxis:{title: "Percentage"}
    };
    Plotly.newPlot("bar", dataa, layout);

}); // end of reading in data for bar 


// ///////////////////////////////////////////////////////////////////////////////

    
// Reading in data for pie chart
d3.json(url_pie).then((data) => {
    console.log("PIE DATA")
    console.log(data);


    // Obtaining the values for the pie chart

    var yes_values = [];
    var i;
    for (i = 0; i < data.length; i++) {
        yes_count = data[i].yes_count;
        yes_values.push(yes_count);
    }
    console.log(" PIE yes count for all of AUS")
    console.log(yes_values)

    var no_values = [];
    var i;
    for (i = 0; i < data.length; i++) {
        no_count = data[i].no_count;
        no_values.push(no_count);
    }

    // Need to sum these values in the array together
    var sum_yes = yes_values.reduce(function(a, b){
        return a + b;
    }, 0);
    console.log("SUM OF YES for AUS");
    console.log(sum_yes);

    // Need to sum these values in the array together
    var sum_no = no_values.reduce(function(a, b){
        return a + b;
    }, 0);
    console.log("SUM OF NO for AUS");
    console.log(sum_no);

    // Creating a variable for pie values that pushes yes and no sums into an array
    var pie_values = [];
    pie_values.push(sum_yes)
    pie_values.push(sum_no)
    console.log("VALUES FOR PIE CHART for AUS")
    console.log(pie_values)

    // Creating a variable for labels
    var pie_labels = ["Yes votes", "No votes"];
    
    // Creating a variable for colours
    var pie_colours = ["rgb(50, 55, 60)", "LightGrey"];
    
    
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
        title: `Total Vote Types for AUS`,
        height: 600,
        width: 600
    };
    
    Plotly.newPlot('pie', data, layout);


}); // end of reading in data for pie


// }; //end of starting_plots function
// // starting_plots();


// //////////////////////////////////////////////////////////////////////////////


// // CREATING A FUNCTION FOR OPTION CHANGED
// // Calling optionChanged function when a change takes place to the DOM
// d3.selectAll("body").on("change", optionChanged());

// // This function is called when a dropdown menu item is selected
// function optionChanged(stateSelection) {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assigning the value of the dropdown menu option to a variable idSelection
//     var stateSelection = dropdownMenu.node().value;
//     console.log("STATE SELECTION");
//     console.log(stateSelection);

//     // now need to link the value stateSlection to a index

//     // this is how we reach the actual state 
//     // so the dictionary needs to be accessed through the index
//     // this gets state for index 0?! **

//     d3.json(url_bubble).then((data) => {

        
//         // need to access the state name  
//         var sampleData = stateNames; 
    

//         // looping through each dictionary in sampledata
//         // this is so we can find which particular object/dictionary matches the one selected through the dropdown menu
//         for (var i = 0; i < sampleData.length; i++) {
//             // comparing the id selected in the dropdown menu to the id of each object
//             if(sampleData[i] == stateSelection){

//                 // if they match then the index of the object is obtained
//                 // this will then be used to change the graphs
//                 index = i;
//                 console.log("INDEX OF SELECTED")
//                 console.log(index)

//                 // // selecting the current values in the demographic panel
//                 // var currentInfo = d3.select("#sample-metadata").selectAll("h5");
//                 // // console.log(currentInfo)
//                 // // removing the current values in the demographic panel
//                 // currentInfo.remove();

//                 // Updating the plots with the index value based on the selected state
//                 starting_plots(index);
//                 // // Updating the demographic panel with the index value based on the selected id
//                 // demographic(index);
//                 // // updating the bonus challenge gauge chart
//                 // extra(index);

            
//             }
//         }

//     });

// };
// // optionChanged();





