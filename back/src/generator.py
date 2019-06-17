from mapper import Database
import sqlite3

users = ['Maria', 'Stephan', 'Lady Gaga', 'Blake Lively', 'Elon Musk']
bills = [[43,"Lady Gaga", "ConEd", 1559841896, "this is a caption" ],[443,"Elon Musk", "Tmobile", 1559541896, "Let's go to Mars"],[763,"Blake Lively", "Crispy Kreme", 1559871896, "this is another caption"],[33,"Stephan", "JP Morgan", 1559841496, "hello"],[430000,"Maria", "Rent", 1559841096, "help me"]]
pays = [[3,"Elon Musk", "ConEd", 1559843896, "this is a note" ],[43,"Blake Lively", "Tmobile", 1553541896, "You're welcome"],[63,"Lady Gaga", "Crispy Kreme", 1559871846, "this is another note"],[26,"Maria", "JP Morgan", 1559841496, "hi"],[4300,"Stephan", "Rent", 1550841096, "Here's some help"]]

def generate(list_of_users,list_of_bills,list_of_pays):
    for user in users:
        with Database() as db: 
            db.cursor.execute('''INSERT INTO users (username)
                                VALUES (?);''',
                                (user,))
    for bill in list_of_bills:
        with Database() as db:
            db.cursor.execute('''INSERT INTO bills (total_due, due_by, due_to, created_on, caption) 
                                VALUES (?,?,?,?,?);''',
                                (bill[0],bill[1],bill[2],bill[3],bill[4]))
    for pay in list_of_pays:
        with Database() as db:
            db.cursor.execute('''INSERT INTO payments (amount_paid, paid_by, paid_to, created_on, note) 
                                VALUES (?,?,?,?,?);''',
                                (pay[0],pay[1],pay[2],pay[3],pay[4]))
    return True

generate(users,bills,pays)