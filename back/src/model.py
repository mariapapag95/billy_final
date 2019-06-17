from mapper import Database
import sqlite3
import time
from operator import itemgetter

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
    #         return [{"user_id":1, "username":"testuser", "password":"testpassword"}]

    def post_bill(total_due, due_by, due_to, caption):
        # add "due_by" as arguement and set self.username after login functionality has been made
        created_on = int(time.time())
        #created_on = created_on.strftime("%c")
        keys = ["bill_id","total_due","due_by", "due_to", "created_on", "caption"]
        with Database() as db: 
            db.cursor.execute('''INSERT INTO bills (total_due, due_by, due_to, created_on, caption)
                                VALUES (?, ?, ?, ?, ?);''',
                                (total_due, due_by, due_to, created_on, caption))
            bill_id = db.cursor.lastrowid
            values = [bill_id, total_due, due_by, due_to, created_on, caption]
            bill = [dict(zip(keys, values))]
            return bill
        
    def pay_bill(amount_paid, paid_by, note, bill_id):
        created_on = int(time.time())
        #created_on = created_on.strftime("%c")
        keys = ["payment_id", "amount_paid", "paid_by", "paid_to", "created_on", "note"]
        with Database() as db: 
            db.cursor.execute('''SELECT * FROM bills WHERE bill_id = ?''', (bill_id)) 
            bill = db.cursor.fetchall()
            bill_amount = bill[0][1]
            paid_by = "Maria"
            paid_to = bill[0][3]
            db.cursor.execute('''INSERT INTO payments (amount_paid, paid_by, paid_to, created_on, note)
                                VALUES (?, ?, ?, ?, ?);''',
                                (amount_paid, paid_by, paid_to, created_on, note))
            payment_id = db.cursor.lastrowid
            new_total = (bill_amount) - (amount_paid)
            db.cursor.execute('''UPDATE bills SET total_due = ? WHERE bill_id = ?''', (new_total, bill_id))
            db.cursor.execute('''SELECT * FROM bills WHERE bill_id = ?''', (bill_id))
            updated_bill = db.cursor.fetchall()
            values = [payment_id, amount_paid, paid_by, paid_to, created_on, note]
            payment = [dict(zip(keys, values))]
            return payment


class Data:

    def all_bills():
        keys = ["bill_id","total_due","due_by", "due_to", "created_on", "caption"]
        with Database() as db:
            db.cursor.execute('''SELECT * FROM bills
                                    ORDER BY created_on DESC;''')
            all_bills = db.cursor.fetchall()
            bills = [dict(zip(keys,i)) for i in all_bills]
            return bills

    def all_payments():
        keys = ["payment_id", "amount_paid", "paid_by", "paid_to", "created_on", "note"]
        with Database() as db:
            db.cursor.execute('''SELECT * FROM payments 
                                    ORDER BY created_on DESC;''')
            all_payments = db.cursor.fetchall()
            payments = [dict(zip(keys, i)) for i in all_payments]
            return payments

    def user_page(username):
        with Database() as db:
            db.cursor.execute('''SELECT * FROM bills WHERE due_by='{username}' 
                                UNION
                                 SELECT * FROM payments WHERE paid_by='{username}' 
                                ORDER BY created_on DESC;'''
                    .format(username = username))
            user_posts = db.cursor.fetchall()
            return user_posts

def all_posts():
    all_posts = Data.all_bills() + Data.all_payments()
    all_posts = sorted(all_posts, key=itemgetter("created_on"), reverse=True)
    return all_posts