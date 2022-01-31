from flask import Blueprint, request
from app.models import Budget, db
from flask_login import current_user, login_required

budget_routes = Blueprint('budgets', __name__)

@budget_routes.route('/')
@login_required
def get_all_budgets():
  budgets = Budget.query.filter(Budget.userId == current_user.get_id()).all()
  return {'all_budgets': [budget.to_dict() for budget in budgets]}

# fetch('/api/budgets/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data));

@budget_routes.route('/<int:budgetId>', methods=['PUT'])
@login_required
def edit_budget(budgetId):
  budget=Budget.query.get(budgetId)
  budget.budget_amount=request.json['budget_amount']
  db.session.commit()

  return budget.to_dict()

# const data = { budget_name: 'Education', budget_amount: 800, categoryId: 7 }

# fetch('/api/budgets/4', {
#   method: 'PUT',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify(data),
# })
# .then(response => response.json())
# .then(data => {
#   console.log('Success:', data);
# })
