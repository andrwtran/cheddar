from .db import db
from datetime import date

class Transaction(db.Model):
  __tablename__ = 'transactions'

  id = db.Column(db.Integer, primary_key=True)
  trans_date = db.Column(db.Date, nullable=False)
  trans_payee = db.Column(db.String(40), nullable=False)
  trans_amount = db.Column(db.Float, nullable=False)
  categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  accountId = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)

  category = db.relationship('Category', back_populates='transactions')
  account = db.relationship('Account', back_populates='transactions')

  def to_dict(self):
    # print("!!!!!!!!!!!!!")
    # print(self.trans_date)
    return {
        'id': self.id,
        # 'trans_date': self.trans_date,
        'trans_date': self.trans_date.isoformat(),
        'trans_payee': self.trans_payee,
        'trans_amount': self.trans_amount,
        'categoryId': self.categoryId,
        'accountId': self.accountId
    }
