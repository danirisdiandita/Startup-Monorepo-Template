from app.models.plan import Plan
from app.models.feature import Feature
from app.models.plan_feature import PlanFeature
from fastapi import APIRouter 
from app.crud.plan import PlanService
plan_service = PlanService()

router = APIRouter()


@router.get("/plans_and_features")
def get_plans_and_features():
    plans_and_features = plan_service.get_plans_and_features()
    plans_and_features_list = []
    plan_ids_in_monthly_plans = set([])
    plan_ids_in_yearly_plans = set([])

    feature_ids_in_monthly_plans = set([])
    feature_ids_in_yearly_plans = set([])

    features_ids = []

    output_template = {
        "monthly_plans": {
        "tiers": [], 
            "sections": []
        },
        "yearly_plans": {
            "tiers": [], 
            "sections": []
        }
    }

    for plan, feature, plan_feature in plans_and_features:
        if plan.billing_cycle == "monthly":
            if plan.id not in plan_ids_in_monthly_plans: 
                plan_ids_in_monthly_plans.add(plan.id)
                output_template["monthly_plans"]["tiers"].append({"id":plan.id})
        else:
            if plan.id not in plan_ids_in_yearly_plans: 
                plan_ids_in_yearly_plans.add(plan.id)
                output_template["yearly_plans"]["tiers"].append({"id": plan.id})
        
        if feature.id not in feature_ids_in_monthly_plans: 
            feature_ids_in_monthly_plans.add(feature.id)
            output_template["monthly_plans"]["sections"].append({"id": feature.id, "name": feature.name, "tiers": {}})
        else: 
            if feature.id not in feature_ids_in_yearly_plans: 
                feature_ids_in_yearly_plans.add(feature.id)
                output_template["yearly_plans"]["sections"].append({"id": feature.id, "name": feature.name, "tiers": {}})
    
    for plan, feature, plan_feature in plans_and_features:
        description_ = plan_feature.description if plan_feature.description else plan_feature.is_feature_plan_active
        # output_template[plan.billing_cycle]['sections'][feature.id][plan.name] = description_
        if plan.billing_cycle == "monthly":
            output_template["monthly_plans"]["tiers"][plan.id]["name"] = plan.name 
            output_template["monthly_plans"]["tiers"][plan.id]["id"] = plan.id 
            output_template["monthly_plans"]["tiers"][plan.id]["href"] = plan.name.lower().replace(" ", "-") + "_" + "monthly"
            output_template["monthly_plans"]["tiers"][plan.id]["description"] = plan.description
            output_template["monthly_plans"]["tiers"][plan.id]["price"] = plan.price
           
        elif plan.billing_cycle == "yearly":
            output_template["yearly_plans"]["tiers"][plan.id - len(output_template["monthly_plans"]["tiers"])]["name"] = plan.name 
            output_template["yearly_plans"]["tiers"][plan.id - len(output_template["monthly_plans"]["tiers"])]["id"] = plan.id 
            output_template["yearly_plans"]["tiers"][plan.id - len(output_template["monthly_plans"]["tiers"])]["href"] = plan.name.lower().replace(" ", "-") + "_" + "yearly"
            output_template["yearly_plans"]["tiers"][plan.id - len(output_template["monthly_plans"]["tiers"])]["description"] = plan.description
            output_template["yearly_plans"]["tiers"][plan.id - len(output_template["monthly_plans"]["tiers"])]["price"] = plan.price
        
        
        
       
        
        # plans_and_features_list.append({
        #     "plan": {
        #         "id": plan.id,
        #         "name": plan.name,
        #         "description": plan.description,
        #         "price": plan.price,
        #         "billing_cycle": plan.billing_cycle,
        #         "created_at": plan.created_at,
        #     },
        #     "feature": {
        #         "id": feature.id,
        #         "name": feature.name,
        #         "description": feature.description,
        #         "category": feature.category,
        #         "created_at": feature.created_at,
        #     },
        #     "plan_feature": {
        #         "id": plan_feature.id,
        #         "plan_id": plan_feature.plan_id,
        #         "feature_id": plan_feature.feature_id,
        #         "created_at": plan_feature.created_at,
        #         "updated_at": plan_feature.updated_at,
        #         "is_feature_plan_active": plan_feature.is_feature_plan_active,
        #         "description": plan_feature.description,
        #     }
        # })

    

    # initialise the tiers 
 

    
        
    
    

   

    return output_template