# This creates our flask app

import os
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from sqlalchemy.sql import select, column, text
from sqlalchemy.sql.expression import func
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import simplejson
from flask_sqlalchemy import SQLAlchemy
from login import username
from login import password


# Setting up our Flask application.
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

db = SQLAlchemy(app)

# Connecting to database

rds_connection_string = f"{username}:{password}@localhost:5432/project_2"
engine = create_engine(f'postgresql://{rds_connection_string}')

names = engine.table_names()

# Reflecting existing database into a new model
Base = automap_base()

# Reflecting the tables
Base.prepare(engine, reflect=True)

# Saving references to each table
Division = Base.classes.electoral_division
Results = Base.classes.election_results
Vote_Types = Base.classes.election_vote_types
Turnout = Base.classes.election_turnout
Marriage_Results = Base.classes.marriage_postal_results
Marriage_Turnout = Base.classes.marriage_postal_turnout
Marriage_Participants_Age = Base.classes.marriage_postal_participants_by_age
#Age = Base.classes."2017_population_agedemo"
Cultural_Diversity = Base.classes.cultural_diversity
Education = Base.classes.education
Labor_Liberal = Base.classes.labor_liberal_votes

# Create our session (link) from Python to the DB
session = Session(engine)

# print(names)



# create route that renders index.html template
@app.route("/")
def home():
    
    # Render the index.html template
    return render_template("index.html")

# create route that renders choropleth map
@app.route("/electorates_map")
def electorates_map():
    
    return render_template("map.html")

# create route that renders bar chart data table
@app.route("/bar_table")
def bar_table():
    
    return render_template("bar_table.html")

# create route that renders pie chart data table
@app.route("/pie_table")
def pie_table():
    
    return render_template("pie_table.html")

# create route that renders bubble chart data table
@app.route("/bubble_table")
def bubble_table():
    
    return render_template("bubble_table.html")

# create route that renders map data table
@app.route("/map_table")
def map_table():
    
    return render_template("map_table.html")

# create route that renders about page
@app.route("/about")
def about():
    
    return render_template("about.html")

# create route that renders geoJSON
@app.route("/map_data/ourJson.geojson")
def geojson():
    
    return render_template("map_data/ourJson.geojson")
  

# Function which converts results retieved from database into json
def query_results_to_dicts(results):
   
    # A helper method for converting SQLAlchemy Query objects 
    # (https://docs.sqlalchemy.org/en/13/orm/query.html#sqlalchemy.orm.query.Query)
    # to a format that is json serialisable 
    
    return simplejson.dumps(results)


# map
@app.route("/api/map")
def test():

    results = session.query(Division.division_id, Division.electoral_division, Division.state, Marriage_Results.division_id, Marriage_Results.yes_count, Marriage_Results.no_count, Results.division_id, Results.successful_party, Marriage_Turnout.division_id, Marriage_Turnout.turnout_percent)\
                    .join(Marriage_Results, Marriage_Results.division_id == Division.division_id)\
                    .join(Results, Results.division_id == Division.division_id)\
                    .join(Marriage_Turnout, Marriage_Turnout.division_id == Division.division_id).all()

    return query_results_to_dicts(results)


# bubble
@app.route("/api/bubble")
def bubble():

    results = session.query(Division.division_id, Division.electoral_division, Division.state, Marriage_Results.division_id, Marriage_Results.yes_count, Marriage_Results.total_responses, Labor_Liberal.division_id, Labor_Liberal.liberal_percent, Labor_Liberal.labor_percent, Education.division_id, Education.year_12_completion_percent, Education.higher_education_completion_percent)\
                    .join(Marriage_Results, Marriage_Results.division_id == Division.division_id)\
                    .join(Labor_Liberal, Labor_Liberal.division_id == Division.division_id)\
                    .join(Education, Education.division_id == Division.division_id).all()

    return query_results_to_dicts(results)

# pie
@app.route("/api/pie")
def pie():

    results = session.query(Division.division_id, Division.electoral_division, Division.state, Marriage_Results.division_id, Marriage_Results.yes_count, Marriage_Results.no_count)\
                    .join(Marriage_Results, Marriage_Results.division_id == Division.division_id).all()

    return query_results_to_dicts(results)


# bar
@app.route("/api/bar")
def bar():

    results = session.query(Division.division_id, Division.electoral_division, Division.state, Marriage_Participants_Age.division_id, Marriage_Participants_Age.ages_18_34, Marriage_Participants_Age.ages_35_49, Marriage_Participants_Age.ages_50_64, Marriage_Participants_Age.ages_65_79, Marriage_Participants_Age.ages_80_plus)\
                    .join(Marriage_Participants_Age, Marriage_Participants_Age.division_id == Division.division_id).all()

    return query_results_to_dicts(results)


# THE FOLLOWING READS IN THE INDIVIDUAL TABLES INCASE THEY ARE EVER NEEDED

# electoral_division table
@app.route("/api/division")
def division():

    results = session.query(Division.division_id, Division.electoral_division, Division.state ).all()
   
    return query_results_to_dicts(results)


# election_results table
@app.route("/api/results")
def results():

    results = session.query(Results.division_id, Results.enrolment, Results.demographic, Results.previous_party, Results.previous_seat_status, Results.successful_party, Results.seat_status).all()
   
    return query_results_to_dicts(results)


# election_vote_types table
@app.route("/api/vote_types")
def vote_types():

    results = session.query(Vote_Types.division_id, Vote_Types.ordinary_votes, Vote_Types.absent_votes, Vote_Types.provisional_votes, Vote_Types.prepoll_votes, Vote_Types.postal_votes, Vote_Types.total_votes).all()
   
    return query_results_to_dicts(results)


# election_turnout table
@app.route("/api/turnout")
def turnout():

    results = session.query(Turnout.division_id, Turnout.total_enrolled, Turnout.total_votes, Turnout.turnout_percent).all()
   
    return query_results_to_dicts(results)


# marriage_postal_results table
@app.route("/api/marriage_results")
def marriage_results():

    results = session.query(Marriage_Results.division_id, Marriage_Results.yes_count, Marriage_Results.no_count, Marriage_Results.total_responses, Marriage_Results.response_unclear, Marriage_Results.non_responding).all()
   
    return query_results_to_dicts(results)


# marriage_postal_turnout table
@app.route("/api/marriage_turnout")
def marriage_turnout():

    results = session.query(Marriage_Turnout.division_id, Marriage_Turnout.total_eligible, Marriage_Turnout.total_participants, Marriage_Turnout.turnout_percent).all()
   
    return query_results_to_dicts(results)

# cultural_diversity table
@app.route("/api/cultural_diversity")
def cultural_diversity():

    results = session.query(Cultural_Diversity.division_id, Cultural_Diversity.aboriginal_torres_strait_percent, Cultural_Diversity.born_overseas_percent, Cultural_Diversity.recent_migrants_percent, Cultural_Diversity.different_language_percent).all()
   
    return query_results_to_dicts(results)


 # education table
@app.route("/api/education")
def education():

    results = session.query(Education.division_id, Education.year_12_completion_percent, Education.higher_education_completion_percent).all()
   
    return query_results_to_dicts(results)


# labor_liberal_votes table
@app.route("/api/labour_liberal")
def labour_liberal():

    results = session.query(Labor_Liberal.division_id, Labor_Liberal.liberal_votes, Labor_Liberal.liberal_percent, Labor_Liberal.labor_votes, Labor_Liberal.labor_percent).all()
   
    return query_results_to_dicts(results)


if __name__ == "__main__":
    app.run(debug=True)

