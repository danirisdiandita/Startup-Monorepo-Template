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
from sqlmodel import SQLModel, Session, create_engine, select, delete
from app.core.config import settings


with open("./app/models/data/plan.json", "r") as file:
    plan_data = json.load(file)

with open("./app/models/data/features.json", "r") as file:
    feature_data = json.load(file)


plan_data_pydanticed = [
    Plan(
        id=plan["id"],
        name=plan["name"],
        price=plan["price"],
        description=plan["description"],
        billing_cycle=plan["billing_cycle"],
        created_at=datetime.now(),
    )
    for plan in plan_data
]

feature_data_pydanticed = [
    Feature(
        id=feature["id"],
        name=feature["name"],
        description=feature["description"],
        plans=feature["plans"],
        category=feature["category"],
        created_at=datetime.now(),
    )
    for feature in feature_data
]

plan_to_feature_is_active = (
    dict()
)  # this is a map of plan id to feature id to is_feature_plan_active
plan_to_feature_description = (
    dict()
)  # this is a map of plan id to feature id to description

feature_to_idx = {feature.name: feature.id for feature in feature_data_pydanticed}
plan_to_idx = {plan.name: plan.id for plan in plan_data_pydanticed}

for plan in plan_data:
    for feature_, value in plan.get("features_description", {}).items():
        print(value)
        if value == True:
            plan_to_feature_is_active[(plan.get("id"), feature_to_idx[feature_])] = True
            plan_to_feature_description[(plan.get("id"), feature_to_idx[feature_])] = (
                None
            )
        elif value == False:
            plan_to_feature_is_active[(plan.get("id"), feature_to_idx[feature_])] = (
                False
            )
            plan_to_feature_description[(plan.get("id"), feature_to_idx[feature_])] = (
                None
            )
        else:
            plan_to_feature_is_active[(plan.get("id"), feature_to_idx[feature_])] = True
            plan_to_feature_description[(plan.get("id"), feature_to_idx[feature_])] = (
                str(value)
            )

plan_feature_data_pydanticed = []
for key, value in plan_to_feature_is_active.items():
    plan_feature_data_pydanticed.append(
        PlanFeature(
            plan_id=key[0],
            feature_id=key[1],
            is_feature_plan_active=value,
            description=plan_to_feature_description[key],
            created_at=datetime.now(),
        )
    )

# Create SQLModel engine
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)

# Create all tables
SQLModel.metadata.create_all(engine)



# Create a session
with Session(engine) as session:
    # remove all data from all tables
    statement = delete(PlanFeature)
    session.exec(statement)
    
    
    statement = delete(Plan)
    session.exec(statement)

    statement = delete(Feature)
    session.exec(statement)

   
    # Seed plans
    for plan in plan_data_pydanticed:
        session.add(plan)

    # Seed features
    for feature in feature_data_pydanticed:
        session.add(feature)

    # Seed plan_features
    for plan_feature in plan_feature_data_pydanticed:
        session.add(plan_feature)

    # Commit the changes
    session.commit()

print("Data seeding completed successfully.")
