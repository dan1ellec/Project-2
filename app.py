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
from models import create_classes
import simplejson
from flask_sqlalchemy import SQLAlchemy
