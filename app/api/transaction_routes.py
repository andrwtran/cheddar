from flask import Blueprint, request
from app.models import Transaction, Account, db
from flask_login import current_user, login_required

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
  transactions = Transaction.query.join(Account).filter(Account.userId == current_user.get_id()).order_by(Transaction.trans_date.desc())
  return {'all_transactions': [transaction.to_dict() for transaction in transactions]}
  # all_transactions = {'all_transactions': [transaction.to_dict() for transaction in transactions]}
  # print("!!!!!!!!!!!!!!")
  # print(all_transactions)
  # return all_transactions

# fetch('/api/transactions/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data));

@transaction_routes.route('/', methods=['POST'])
@login_required
def add_transaction():
  # print("!!!!!!!!!!!!!!!!!!!!!!")
  # print(request.json['trans_date'])
  new_transaction = Transaction(trans_date=request.json['trans_date'],
    trans_payee=request.json['trans_payee'],
    trans_amount=request.json['trans_amount'],
    categoryId=request.json['categoryId'],
    accountId=request.json['accountId'])
  # print("!!!!!!!!!!!!!!!!!!!!!!")
  # print(new_transaction.trans_date)
  db.session.add(new_transaction)
  db.session.commit()

  return new_transaction.to_dict()

# const data = { trans_date: 'Wed Jul 28 2021', trans_payee: 'Test', trans_amount: 0.01, categoryId: 2, accountId: 2 }

# fetch('/api/transactions/', {
#   method: 'POST',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify(data),
# })
# .then(response => response.json())
# .then(data => {
#   console.log('Success:', data);
# })

@transaction_routes.route('/<int:transactionId>',methods=['DELETE'])
@login_required
def delete_transaction(transactionId):
  transaction = Transaction.query.get(transactionId)
  db.session.delete(transaction)
  db.session.commit()

  return transaction.to_dict()

# fetch('/api/transactions/17', {method: 'Delete'}).then(res => res.json()).then(data => console.log(data));

@transaction_routes.route('/<int:transactionId>', methods=['PUT'])
@login_required
def edit_transaction(transactionId):
  transaction=Transaction.query.get(transactionId)
  transaction.trans_payee=request.json['trans_payee']
  transaction.trans_date=request.json['trans_date']
  transaction.trans_amount=request.json['trans_amount']
  transaction.categoryId=request.json['categoryId']
  transaction.accountId=request.json['accountId']

  db.session.commit()

  return transaction.to_dict()

# const data = { trans_date: 'Wed Jul 28 2021', trans_payee: 'Test', trans_amount: 0.01, categoryId: 2, accountId: 2 }

# fetch('/api/transactions/23', {
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
