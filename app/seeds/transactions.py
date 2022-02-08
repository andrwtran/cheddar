from app.models import db, Transaction
from datetime import date

def seed_transactions():

  philz_one = Transaction(trans_date=date(2022, 1, 17), trans_payee='Philz Coffee', trans_amount=6.02, categoryId=6, accountId=2)
  philz_two = Transaction(trans_date=date(2022, 1, 7), trans_payee='Philz Coffee', trans_amount=6.02, categoryId=6, accountId=2)
  philz_three = Transaction(trans_date=date(2022, 1, 9), trans_payee='Philz Coffee', trans_amount=5.27, categoryId=6, accountId=3)
  philz_four = Transaction(trans_date=date(2022, 2, 6), trans_payee='Philz Coffee', trans_amount=6.13, categoryId=6, accountId=3)

  chipotle_one = Transaction(trans_date=date(2022, 1, 13), trans_payee='Chipotle', trans_amount=8.59, categoryId=6, accountId=2)
  chipotle_two = Transaction(trans_date=date(2022, 1, 18), trans_payee='Chipotle', trans_amount=10.46, categoryId=6, accountId=4)
  shake_shack = Transaction(trans_date=date(2022, 2, 4), trans_payee='Shake Shack', trans_amount=13.88, categoryId=6, accountId=4)

  trader_joes = Transaction(trans_date=date(2022, 1, 13), trans_payee='Trader Joes', trans_amount=20.56, categoryId=13, accountId=2)
  whole_foods = Transaction(trans_date=date(2022, 1, 1), trans_payee='Whole Foods', trans_amount=23.40, categoryId=13, accountId=3)
  whole_foods_two = Transaction(trans_date=date(2022, 2, 2), trans_payee='Whole Foods', trans_amount=32.13, categoryId=13, accountId=3)
  costco = Transaction(trans_date=date(2022, 2, 3), trans_payee='Costco', trans_amount=41.58, categoryId=13, accountId=3)

  chewy_one = Transaction(trans_date=date(2022, 1, 6), trans_payee='Chewy.com', trans_amount=30.98, categoryId=18, accountId=2)
  chewy_two = Transaction(trans_date=date(2022, 1, 12), trans_payee='Chewy.com', trans_amount=10.23, categoryId=18, accountId=2)

  amazon_one = Transaction(trans_date=date(2022, 1, 8), trans_payee='Amazon.com', trans_amount=50.51, categoryId=19, accountId=2)
  amazon_two = Transaction(trans_date=date(2022, 1, 11), trans_payee='Amazon.com', trans_amount=12.80, categoryId=19, accountId=2)
  taylor_stitch = Transaction(trans_date=date(2022, 1, 8), trans_payee='Taylor Stitch', trans_amount=35.06, categoryId=19, accountId=5)
  drop = Transaction(trans_date=date(2022, 1, 19), trans_payee='Drop', trans_amount=23.57, categoryId=19, accountId=2)
  grailed = Transaction(trans_date=date(2022, 1, 14), trans_payee='Grailed', trans_amount=28.01, categoryId=19, accountId=3)
  everlane = Transaction(trans_date=date(2021, 12, 8), trans_payee='Everlane', trans_amount=51.76, categoryId=19, accountId=2)
  uniqlo = Transaction(trans_date=date(2021, 12, 14), trans_payee='Uniqlo', trans_amount=27.10, categoryId=19, accountId=2)
  amazon_three = Transaction(trans_date=date(2022, 2, 3), trans_payee='Amazon.com', trans_amount=17.34, categoryId=19, accountId=2)
  uniqlo_two = Transaction(trans_date=date(2022, 2, 7), trans_payee='Uniqlo', trans_amount=31.43, categoryId=19, accountId=2)

  uber = Transaction(trans_date=date(2022, 1, 10), trans_payee='Uber', trans_amount=15.80, categoryId=21, accountId=3)
  lyft = Transaction(trans_date=date(2022, 1, 2), trans_payee='Lyft', trans_amount=12.61, categoryId=21, accountId=3)
  uber_two = Transaction(trans_date=date(2022, 2, 4), trans_payee='Uber', trans_amount=10.17, categoryId=21, accountId=3)

  udemy_one = Transaction(trans_date=date(2022, 1, 9), trans_payee='Udemy', trans_amount=32.57, categoryId=7, accountId=3)
  udemy_two = Transaction(trans_date=date(2021, 12, 22), trans_payee='Udemy', trans_amount=28.18, categoryId=7, accountId=3)

  stubhub = Transaction(trans_date=date(2022, 1, 21), trans_payee='Stubhub', trans_amount=105.10, categoryId=8, accountId=4)
  netflix_one = Transaction(trans_date=date(2022, 1, 2), trans_payee='Netflix', trans_amount=9.99, categoryId=8, accountId=2)
  netflix_two = Transaction(trans_date=date(2021, 12, 2), trans_payee='Netflix', trans_amount=9.99, categoryId=8, accountId=2)
  netflix_three = Transaction(trans_date=date(2021, 11, 2), trans_payee='Netflix', trans_amount=9.99, categoryId=8, accountId=2)
  netflix_four = Transaction(trans_date=date(2022, 2, 2), trans_payee='Netflix', trans_amount=9.99, categoryId=8, accountId=2)

  west_elm = Transaction(trans_date=date(2022, 1, 19), trans_payee='West Elm', trans_amount=81.21, categoryId=15, accountId=2)
  home_depot = Transaction(trans_date=date(2021, 12, 16), trans_payee='Home Depot', trans_amount=78.04, categoryId=15, accountId=4)

  db.session.add(philz_one)
  db.session.add(philz_two)
  db.session.add(philz_three)
  db.session.add(philz_four)
  db.session.add(chipotle_one)
  db.session.add(chipotle_two)
  db.session.add(shake_shack)
  db.session.add(trader_joes)
  db.session.add(whole_foods)
  db.session.add(whole_foods_two)
  db.session.add(costco)
  db.session.add(chewy_one)
  db.session.add(chewy_two)
  db.session.add(amazon_one)
  db.session.add(amazon_two)
  db.session.add(amazon_three)
  db.session.add(taylor_stitch)
  db.session.add(drop)
  db.session.add(grailed)
  db.session.add(everlane)
  db.session.add(uniqlo)
  db.session.add(uniqlo_two)
  db.session.add(uber)
  db.session.add(lyft)
  db.session.add(uber_two)
  db.session.add(udemy_one)
  db.session.add(udemy_two)
  db.session.add(stubhub)
  db.session.add(netflix_one)
  db.session.add(netflix_two)
  db.session.add(netflix_three)
  db.session.add(netflix_four)
  db.session.add(west_elm)
  db.session.add(home_depot)

  db.session.commit()

def undo_transactions():
  db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
  db.session.commit()
