from app.models import db, Transaction
from datetime import date

def seed_transactions():

  philz_one = Transaction(trans_date=date(2022, 1, 17), trans_payee='Philz Coffee', trans_amount=6.02, categoryId=6, accountId=2)
  philz_two = Transaction(trans_date=date(2022, 1, 7), trans_payee='Philz Coffee', trans_amount=6.02, categoryId=6, accountId=2)
  philz_three = Transaction(trans_date=date(2022, 1, 9), trans_payee='Philz Coffee', trans_amount=5.27, categoryId=6, accountId=3)

  chipotle_one = Transaction(trans_date=date(2022, 1, 13), trans_payee='Chipotle', trans_amount=8.59, categoryId=6, accountId=2)
  chipotle_two = Transaction(trans_date=date(2022, 1, 18), trans_payee='Chipotle', trans_amount=10.46, categoryId=6, accountId=4)

  trader_joes = Transaction(trans_date=date(2022, 1, 13), trans_payee='Trader Joes', trans_amount=20.56, categoryId=13, accountId=2)
  whole_foods = Transaction(trans_date=date(2022, 1, 1), trans_payee='Whole Foods', trans_amount=23.40, categoryId=13, accountId=3)

  chewy_one = Transaction(trans_date=date(2022, 1, 6), trans_payee='Chewy.com', trans_amount=30.98, categoryId=18, accountId=2)
  chewy_two = Transaction(trans_date=date(2022, 1, 12), trans_payee='Chewy.com', trans_amount=10.23, categoryId=18, accountId=2)

  amazon_one = Transaction(trans_date=date(2022, 1, 8), trans_payee='Amazon.com', trans_amount=50.51, categoryId=19, accountId=2)
  amazon_two = Transaction(trans_date=date(2022, 1, 11), trans_payee='Amazon.com', trans_amount=12.80, categoryId=19, accountId=2)
  taylor_stitch = Transaction(trans_date=date(2022, 1, 8), trans_payee='Taylor Stitch', trans_amount=35.06, categoryId=19, accountId=5)
  drop = Transaction(trans_date=date(2022, 1, 19), trans_payee='Drop', trans_amount=23.57, categoryId=19, accountId=2)
  grailed = Transaction(trans_date=date(2022, 1, 14), trans_payee='Grailed', trans_amount=28.01, categoryId=19, accountId=3)

  uber = Transaction(trans_date=date(2022, 1, 10), trans_payee='Uber', trans_amount=15.80, categoryId=21, accountId=3)
  lyft = Transaction(trans_date=date(2022, 1, 2), trans_payee='Lyft', trans_amount=12.61, categoryId=21, accountId=3)

  db.session.add(philz_one)
  db.session.add(philz_two)
  db.session.add(philz_three)
  db.session.add(chipotle_one)
  db.session.add(chipotle_two)
  db.session.add(trader_joes)
  db.session.add(whole_foods)
  db.session.add(chewy_one)
  db.session.add(chewy_two)
  db.session.add(amazon_one)
  db.session.add(amazon_two)
  db.session.add(taylor_stitch)
  db.session.add(drop)
  db.session.add(grailed)
  db.session.add(uber)
  db.session.add(lyft)

  db.session.commit()

def undo_transactions():
  db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
  db.session.commit()
