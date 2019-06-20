import sqlite3

connection = sqlite3.connect('billy.db', check_same_thread=False)
cursor = connection.cursor()

cursor.execute('''CREATE TABLE users(
    user_id INTEGER PRIMARY KEY,
    username VARCHAR UNIQUE
    );''')
    # add password

cursor.execute('''CREATE TABLE bills(
    bill_id INTEGER PRIMARY KEY,
    total_due INTEGER,
    due_by VARCHAR,
    due_to VARCHAR,
    created_on INTEGER,
    caption VARCHAR, 
    due_date VARCHAR,
    contributors VARCHAR,
    FOREIGN KEY (due_by, contributors) REFERENCES users(username, username)
    );''')    

cursor.execute('''CREATE TABLE payments(
    payment_id INTEGER PRIMARY KEY,
    amount_paid FLOAT,
    paid_by VARCHAR,
    paid_to VARCHAR,
    created_on INTEGER,
    note VARCHAR,
    bill_owner VARCHAR,
    FOREIGN KEY (paid_by, bill_owner) REFERENCES users(username, username)
);''')


connection.commit()
cursor.close()