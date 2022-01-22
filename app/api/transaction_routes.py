from flask import Blueprint, request
from app.models import Transaction, Account, db
from flask_login import current_user, login_required
import json

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
  transactions = Transaction.query.join(Account).filter(Account.userId == current_user.get_id())
  return {'all_transactions': [transaction.to_dict() for transaction in transactions]}

# fetch('/api/transactions/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data));
