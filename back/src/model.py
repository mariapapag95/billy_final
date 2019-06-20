from mapper import Database
import sqlite3
import time
from operator import itemgetter
import stripe

stripe.api_key = "sk_test_Tjje5lIY8suQe9zd5d3S6xxO001QKSWAU4"

class User:

    # def __init__(self, username):
    #     self.username = username

    # def __enter__(self):
    #     return self

    # def __exit__(self, type, value, traceback):
    #     pass
    #     # TODO
    
    # def new_user(username):
    #     with Database() as db: 
    #         db.cursor.execute('''INSERT INTO users (username) VALUES (?);''',
    #                             (username))
    #         db.cursor.execute('''SELECT * FROM users WHERE username = ?''', (username))
    #         user = db.cursor.fetchall()
    #         print(user)
    #         stripe.Customer.create(
    #             description="Customer for jenny.rosen@example.com",
    #             source="tok_visa" # obtained with Stripe.js
    #         )
    #         return [{"user_id":69, "username":"testuser", "password":"testpassword"}]
    def create_customer(name, username, password, email, stripe_id, default_payment):
        with Database() as db:
            db.cursor.execute('''INSERT INTO users (name, username, password, email, stripe_id, default_payment)
                                VALUES (?, ?, ?, ?, ?, ?);''',
                                (name, username, password, email, stripe_id, default_payment))
            user_id = db.cursor.lastrowid
            keys = ["user_id", "name", "username", "password", 'email', 'stripe_id', 'default_payment']
            values = [user_id, name, username, password, email, stripe_id, default_payment]
            user = [dict(zip(keys, values))]
            print("\n\n\n\n\n")
            print(user)
            print("\n\n\n\n\n")
            return user

    def post_bill(total_due, due_by, due_to, caption, due_date):
        created_on = int(time.time())
        #created_on = created_on.strftime("%c")
        keys = ["bill_id","total_due","due_by", "due_to", "created_on", "caption", "due_date"]
        with Database() as db: 
            db.cursor.execute('''INSERT INTO bills (total_due, due_by, due_to, created_on, caption, due_date)
                                VALUES (?, ?, ?, ?, ?, ?);''',
                                (total_due, due_by, due_to, created_on, caption, due_date))
            bill_id = db.cursor.lastrowid
            values = [bill_id, total_due, due_by, due_to, created_on, caption, due_date]
            bill = [dict(zip(keys, values))]
            return bill
        
    def pay_bill(amount_paid, paid_by, note, bill_id):
        created_on = int(time.time())
        #created_on = created_on.strftime("%c")
        keys = ["payment_id", "amount_paid", "paid_by", "paid_to", "created_on", "note", "bill_owner"]
        with Database() as db: 
            db.cursor.execute('''SELECT * FROM bills WHERE bill_id = ?''', (bill_id)) 
            bill = db.cursor.fetchall()
            bill_amount = bill[0][1]
            bill_owner = bill[0][2]
            paid_by = "Maria"
            paid_to = bill[0][3]
            contributors = bill[0][6]
            db.cursor.execute('''INSERT INTO payments (amount_paid, paid_by, paid_to, created_on, note, bill_owner)
                                VALUES (?, ?, ?, ?, ?, ?);''',
                                (amount_paid, paid_by, paid_to, created_on, note, bill_owner))
            payment_id = db.cursor.lastrowid
            new_total = (bill_amount) - (amount_paid)
            if contributors != None and contributors != paid_by:
                contributors = contributors + ', ' + paid_by
            else:
                contributors = paid_by
            db.cursor.execute('''UPDATE bills SET total_due = ? WHERE bill_id = ?''', (new_total, bill_id))
            db.cursor.execute('''UPDATE bills SET contributors = ? WHERE bill_id = ?''', (contributors, bill_id))
            db.cursor.execute('''SELECT * FROM bills WHERE bill_id = ?''', (bill_id))
            updated_bill = db.cursor.fetchall()
            print(updated_bill)
            values = [payment_id, amount_paid, paid_by, paid_to, created_on, note, bill_owner]
            payment = [dict(zip(keys, values))]
            return payment


class Data:

    def all_bills():
        keys = ["bill_id","total_due","due_by", "due_to", "created_on", "caption", "due_date", "contributors"]
        with Database() as db:
            db.cursor.execute('''SELECT * FROM bills
                                    ORDER BY created_on DESC;''')
            all_bills = db.cursor.fetchall()
            bills = [dict(zip(keys,i)) for i in all_bills]
            print(bills)
            return bills

    def all_payments():
        keys = ["payment_id", "amount_paid", "paid_by", "paid_to", "created_on", "note", "bill_owner"]
        with Database() as db:
            db.cursor.execute('''SELECT * FROM payments 
                                    ORDER BY created_on DESC;''')
            all_payments = db.cursor.fetchall()
            payments = [dict(zip(keys, i)) for i in all_payments]
            return payments

    def user_page(username):
        bill_keys = ["bill_id","total_due","due_by", "due_to", "created_on", "caption", "due_date", "contributors"]
        pay_keys = ["payment_id", "amount_paid", "paid_by", "paid_to", "created_on", "note", "bill_owner"]
        with Database() as db:
            # db.cursor.execute('''SELECT * FROM bills WHERE due_by='{username}' 
            #                     UNION
            #                      SELECT * FROM payments WHERE paid_by='{username}' 
            #                     ORDER BY created_on DESC;'''
            #         .format(username = username))
            # user_posts = db.cursor.fetchall()
            db.cursor.execute('''SELECT * FROM bills WHERE due_by='{username}' '''.format(username = username))
            all_bills = db.cursor.fetchall()
            db.cursor.execute('''SELECT * FROM payments WHERE paid_by='{username}' '''.format(username = username))
            all_pays = db.cursor.fetchall()
            bills = [dict(zip(bill_keys, i)) for i in all_bills]
            pays = [dict(zip(pay_keys, i)) for i in all_pays]
            posts = bills + pays
            posts = sorted(posts, key=itemgetter("created_on"), reverse=True)
            return posts

def all_posts():
    all_posts = Data.all_bills() + Data.all_payments()
    all_posts = sorted(all_posts, key=itemgetter("created_on"), reverse=True)
    return all_posts