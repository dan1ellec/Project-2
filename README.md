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

![ERD](entity_relationship_diagram.png)

## Credits

Data sourced from:

- Australian Electoral Commission: [2016 Federal Election Vote Types by Division](https://results.aec.gov.au/20499/Website/HouseDownloadsMenu-20499-Csv.htm)
- Australian Electoral Commission: [2016 Federal Election Results](https://results.aec.gov.au/20499/Website/HouseDivisionClassifications-20499-NAT.htm)
- Kaggle: Australian Marriage Law Postal Survey [Electorate Results](https://www.kaggle.com/mylesoneill/australian-marriage-law-postal-survey?select=electorate-results.csv)
- Kaggle: Australian Marriage Law Postal Survey [Participant Information](https://www.kaggle.com/mylesoneill/australian-marriage-law-postal-survey?select=participant-information.csv)
- Australian Bureau of Statistics: [Commonwealth Electorate Data](https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/2082.02019?OpenDocument)

## Theme and purpose

Trend analysis on 2016 Federal Elections results and 2017 Marriage Law Postal Survey results from the Australian electoral divisions in each state
This analysis can provide valuable insights for political parties and campaign organisers for future federal elections and surveys when running their campaigns
The following relationships have been analysed:
- Federal Elections results and Marriage Law Postal Survey results
- Federal Elections results, Marriage Law Postal Survey results and socio-economic factors (age and education)
- socio-economic factors and the way of voting (postal or in person)

## Coding approach
The following approach has been used:
- Exploratory data analysis
- Extract
- Transform
- Load
- Set up Flask app
- Connect to database
- Create routes
- Create visualisations

More detailed information on the coding approach can be found here (include link to slides to be uploaded on GitHub).

## Data mungling techniques

The following data mungling techniques have been used:
- Checking datatypes
- Remove NaN values
- Drop irrelevant columns and rename columns
- Set primary key as index
- Merge tables (joining on primary key)
- Perform “group by” functions and aggregates to run calculations 
- Create bins for consistency within all tables


## Visualisations

The following visualisations have been created:
- Pie chart -  This compares the yes and no votes for the Marriage Postal Survey in Australia
- Bubble chart - A state can be selected from the drop down menu. The chart reflects for each electorate within that state the % of liberal votes (x-axis) where the colour is indicative of the succesful party % of higher education completed (y-axis). The size of the bubbles reflect the % of yes votes for the Marriage Postal Survey.
- Bar chart - A state can be selected from the drop down menu. The chart reflects the age demographics of each electorate.
- Map

## Observations

## Proposed enhancements and challenges

## Heroku deployment

The project has been deployed to Heroku and the visualisation is available at: https://xxxxxxx.herokuapp.com/















