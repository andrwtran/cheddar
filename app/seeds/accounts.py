from app.models import db, Account

def seed_accounts():
  bank = Account(account_name='Manchego Community Bank & Trust', userId=1) # 1
  chase = Account(account_name='Chase Feta Unlimited', userId=1) # 2
  capitalOne = Account(account_name='Capital One Gouda Rewards', userId=1) # 3
  citi = Account(account_name='Citi Parmesan Premier', userId=1) # 4
  amex = Account(account_name='American Express Bleu Cheese Preferred', userId=1) # 5

  db.session.add(bank)
  db.session.add(chase)
  db.session.add(capitalOne)
  db.session.add(citi)
  db.session.add(amex)

  db.session.commit()

def undo_accounts():
    db.session.execute('TRUNCATE accounts RESTART IDENTITY CASCADE;')
    db.session.commit()
