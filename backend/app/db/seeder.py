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
from datetime import datetime
with open("./app/models/data/plan.json", "r") as file:
    plan_data = json.load(file)

with open("./app/models/data/features.json", "r") as file:
    feature_data = json.load(file) 


plan_data = [Plan(
                    id=idx,
                    name=plan["name"], 
                    price=plan["price"], 
                    description=plan["description"], 
                    billing_cycle=plan["billing_cycle"], 
                  created_at=datetime.now()) 
            for idx, plan in enumerate(plan_data)]

feature_data = [Feature(
                        id=idx,
                        name=feature["name"], 
                        description=feature["description"], 
                        plans=feature["plans"], 
                        category=feature["category"],
                        created_at=datetime.now()) 
                for idx, feature in enumerate(feature_data)]


