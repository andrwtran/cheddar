from flask import Blueprint, request
from app.models import Category, db
from flask_login import current_user, login_required

category_routes = Blueprint('categories', __name__)

@category_routes.route('/')
@login_required
def get_all_categories():
  categories = Category.query.all()
  return {'all_categories': [category.to_dict() for category in categories]}

# fetch('/api/categories/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data));
