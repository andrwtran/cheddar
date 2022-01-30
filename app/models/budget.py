from unicodedata import category
from .db import db

class Budget(db.Model):
  __tablename__ = 'budgets'

  id = db.Column(db.Integer, primary_key=True)
  budget_name = db.Column(db.String(40), nullable=False)
  budget_amount = db.Column(db.Float, nullable=False)
  categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  category = db.relationship('Category', back_populates='budgets')
  user = db.relationship('User', back_populates='budgets')

  def to_dict(self):
    return {
        'id': self.id,
        'budget_name': self.budget_name,
        'budget_amount': self.budget_amount,
        'categoryId': self.categoryId,
        'userId': self.userId
    }
