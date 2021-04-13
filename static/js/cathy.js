url_bubble = "api/bubble";

// d3.json(url).then(function(data){ 
//     console.log(data);
// });


//////////////////////////////////////////////////////////////////////////////


// CREATING INITIAL FUNCTION 
// Creates dropdown menu and sets bubble chart with an initial value
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
          console.log("GROUPBY STATES");
          console.log(states);

          stateNames = Object.keys(states);
        //   stateNames.push("Australia"); will need to do something like this is we get time!

        stateNames.forEach((function(x) {
            // this appends the rows in html with option tag .e.g. <option>NSW</option>
            dropdownMenu.append("option").text(x).property("value", x)
        }));


           
    }));

    // // Setting an intial index value for the first sample
    // // Running each function with that value
    var initialIndex = 0;
    starting_plots(initialIndex);
    // // bar_chart(initialIndex); // this  will become any other functions thast change on drop down
};
init();


//////////////////////////////////////////////////////////////////////////////


// CREATING A FUNCTION FOR THE STARTING PLOTS - CAN ADD BAR CHART TO THIS
// Using variable index again as this will relate to the selected state in the dropdown menu and reference the index of the object needed from the sampleData array
function starting_plots(index){
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
        console.log("testing accessing a particular state")
        console.log(stateInfo[1])


        // need to access the state information section
        var sampleData = stateInfo; 
        // obtaining particular section using index
        var section = sampleData[index];
        console.log("STARTING SECTION");
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
                colorscale: "RdBu"
            }
        };
      
        var data = [trace1];
      
        var layout = {
            title: `Correlation between federal election results and education, size of bubble represented by percentage of yes votes`,
            xaxis: {
             title: "Percentage of labor votes in 2016 federal election as opposed to liberal"
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


        
        }) // end of reading in data
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

