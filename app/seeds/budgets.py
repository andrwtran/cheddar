from app.models import db, Budget

def seed_budgets():
  total = Budget(budget_name='Total', budget_amount=2500, categoryId=1, userId=1)
  shopping = Budget(budget_name='Shopping', budget_amount=1000, categoryId=19, userId=1)
  groceries = Budget(budget_name='Groceries', budget_amount=500, categoryId=13, userId=1)
  dining = Budget(budget_name='Dining', budget_amount=1000, categoryId=6, userId=1)

  db.session.add(total)
  db.session.add(shopping)
  db.session.add(groceries)
  db.session.add(dining)

  db.session.commit()

def undo_budgets():
  db.session.execute('TRUNCATE budgets RESTART IDENTITY CASCADE;')
  db.session.commit()
