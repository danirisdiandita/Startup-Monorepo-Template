import json 
from pathlib import Path
import sys 
# Add the project root to the Python path
project_root = Path(__file__).resolve().parents[2]
sys.path.append(str(project_root))
from app.db.base import engine 
from app.models.plan import Plan 
from app.models.feature import Feature 
from app.models.plan_feature import PlanFeature 
import os 

with open("./app/models/data/plan.json", "r") as file:
    plan_data = json.load(file)

with open("./app/models/data/features.json", "r") as file:
    feature_data = json.load(file) 


plan_data = [Plan(**plan) for plan in plan_data]
feature_data = [Feature(**feature) for feature in feature_data]


print(plan_data)
print(feature_data)