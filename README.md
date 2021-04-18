# Project-2

## Project Overview

This project creates a relational database and has been used for trend analysis on the 2016 Federal Election and Marriage Postal Survey results in relation to the Australian electoral divisions. It includes data about the 2016 Australian Federal Elections, the 2017 Australian Marriage Law Postal Survey and the Commonwealth Electorates.

This is a Flask powered visualisation using Plotly and Javascript.


## How is the database sourced?

Data has been retrieved through the use of document downloads and web scraping. Any downloaded files are located in the resources folder. Jupyter notebooks are then used to access, transform and export the data.


## How is the database implemented?

The Jupiter notebooks should be run in the order they are numbered. For example  `01-extracting_transforming_electoral_division.ipynb` should be run first, followed by `02-extracting_transforming_election_results.ipynb` and so on, up to notebook 10.
The schema.sql file should be run in PostgreSQL prior to running notebook `11-Load.ipynb`. 
A `login_details.py` file will need to be created which contains username = “username” and password = “password” with the specific information related to the users PostgreSQL login information.

A PostgreSQL database has been created, as per the ERD below:

![ERD](data/entity_relationship_diagram.png)


## Credits

Data sourced from:

- Australian Electoral Commission: [2016 Federal Election Vote Types by Division](https://results.aec.gov.au/20499/Website/HouseDownloadsMenu-20499-Csv.htm)
- Australian Electoral Commission: [2016 Federal Election Results](https://results.aec.gov.au/20499/Website/HouseDivisionClassifications-20499-NAT.htm)
- Kaggle: Australian Marriage Law Postal Survey [Electorate Results](https://www.kaggle.com/mylesoneill/australian-marriage-law-postal-survey?select=electorate-results.csv)
- Kaggle: Australian Marriage Law Postal Survey [Participant Information](https://www.kaggle.com/mylesoneill/australian-marriage-law-postal-survey?select=participant-information.csv)
- Australian Bureau of Statistics: [Commonwealth Electorate Data](https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/2082.02019?OpenDocument)


## Theme and purpose

Federal elections were held in 2016 in Australia. In 2017, a postal survey was organised to ask respondents whether the law should be changed to allow same-sex couples to marry.
The theme of this project is how is the outcome of the federal elections in 2016 are reflected in the outcome of the Australian Marriage Law Postal Survey (“MPS”). Is there a relationship between these outcomes and socio-economic factors such as age and education?
This can provide valuable insights for political parties and campaign organisers for future federal elections and surveys when running their campaigns
The following relationships can be analysed:
- Do highly educated people tend to vote for same-sex marriage?
- Do young(er) people tend to vote for same-sex marriage?
- Is there a relationship between the above and elected party within the states and electorates? 


## Project overview
- ETL Project
	- Extract, transform and load data related to the federal elections held in Australia 2016 and the MPS held in 2017. 
	- The ETL project generated a database that can be used for trend analysis on federal election and MPS results in states/electoral divisions
- Set up a Flask app that creates routes to underlying data in the created database 
- Create visualisations – upon selection of a state in the dropdown menu:
	- The  bar chart will reflect the MPS respondents classified by age
	- The pie chart will reflect the percentage of votes for a change in law (“yes votes”)
	- The bubble chart will reflect the % of yes votes, the % of votes for the Labor Party and the % of population that with a higher education
	- The map will reflect the electorates within each state, the elected political party, the % of yes votes and the participation rate in the MPS


## Coding approach
The following approach has been used:
- Extract
- Transform
- Load
- Exploratory data analysis
- Set up Flask app
- Create visualisations

More detailed information on the coding approach can be found here (include link to slides to be uploaded on GitHub).


## Data mungling techniques

The following data mungling techniques have been used:
- Checking datatypes
- Remove NaN values and duplicates
- Drop irrelevant columns and rename columns
- Set primary key as index
- Merge tables (joining on primary key)
- Perform “group by” functions and aggregates to run calculations 
- Recreate bins so that all age bins used within all tables are consistent 


## Visualisations

The following visualisations have been created:
- Pie chart -  This compares the yes and no votes for the Marriage Postal Survey in Australia
- Bubble chart - A state can be selected from the drop down menu. The chart reflects for each electorate within that state the % of labor votes (x-axis) where the colour is indicative of the succesful party and the % of higher education completed (y-axis). The size of the bubbles reflects the % of yes votes for the Marriage Postal Survey.
- Bar chart - A state can be selected from the drop down menu. The chart reflects the age demographics (classified in age bins) of the respondents within each electorate.
- Map - The map shoes the percentage of yes votes for each electorate based on colour coding. An electorate can be selected which shows a label with details on the electorate, elected party, % of yes votes and participation rate the Marriage Postal Survey.


## Observations

- For states with a very few electorates, it can be easily observed whether electorates with a higher % of education tend to vote Liberal or Labor, and whether these this depends on the amount of elderly people or younger people. This does not seem to be consistent across states (compare NT/ACT vs. TAS)
- The map shows the elected party within each electorate, as well as the yes votes and participation rate. 
- This allows politicians and campaign runners to target their campaigns to specific electorates based on 
	- voting preferences 
	- participation rate
	- people in specific age categories or with a specific level of education


## Proposed improvements and challenges

Challenges:
- As the dataset did not contain the coordinates of the electorates, the outlining of each of the electorates had to be created using GeoJSON. 
- Opening the app on Australia (and not on state level)
- Various data sources have slightly different names for certain electorates which resulted in a mismatch in number of data entry points

Improvements:
- No colour was shown for certain electorates in the map as some data was missing in part of the data sources
- Trend analysis at a glance whether a similar trend can be identified between age, education and voting behaviour across all states or whether the trend is different within each state


## Heroku deployment

The project has been deployed to Heroku and the visualisation is available at: https://xxxxxxx.herokuapp.com/















