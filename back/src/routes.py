from flask import jsonify, request, Flask
from flask_cors import CORS
from model import User, Data, all_posts
from pprint import pprint
import stripe
import requests

app = Flask(__name__)
cors = CORS(app)

stripe_key = "sk_test_Tjje5lIY8suQe9zd5d3S6xxO001QKSWAU4"

@app.route('/')
def API():
    return jsonify({"API" : "Billy"})

# @app.route('/signup', methods=['POST'])
# def signup():
#     username = request.json['username']
#     return jsonify(User.new_user(username))

@app.route('/user', methods=['GET'])
def user_page():
    username = "Maria"
    return jsonify(Data.user_page(username))

@app.route('/api/all', methods=['GET'])
def all_data():
    return jsonify (all_posts())

@app.route('/api/bills', methods=['GET'])
def all_bills():
    return jsonify (Data.all_bills())

@app.route('/api/payments', methods=['GET'])
def all_payments():
    return jsonify (Data.all_payments())

@app.route('/api/bills/<id_num>', methods=['GET'])
def get_bill(id_num):
    bills = Data.all_bills()
    for bill in bills:
        bill_id = bill.get("bill_id")
        if int(bill_id) == int(id_num):
            return jsonify(bill)

@app.route('/api/post', methods=['POST'])
def post_bill():
    total_due = int(request.json['totalDue'])
    due_by = "Maria"
    due_to = request.json['dueTo']
    caption = request.json['caption']
    due_date  = request.json['dueDate']
    return jsonify(User.post_bill(total_due, due_by, due_to, caption, due_date))

@app.route('/api/stripe/payintent', methods=['POST'])
def create_pay_intent():
    data = {
    'amount': request.json['totalDue'],
    'currency': 'usd',
    'payment_method_types[]': 'card',
    'payment_method': request.json['card'],
    'customer': request.json['customer'],
    }
    response = requests.post('https://api.stripe.com/v1/payment_intents', data=data, auth=(stripe_key, ''))
    return jsonify(response.json())
    
@app.route('/api/bills/<id_num>/pay', methods=['POST'])
def pay_bill(id_num):
    amount_paid = int(request.json['amountPaid'])/100
    paid_by = 'Maria'
    note = request.json['note']
    bill_id = id_num
    return jsonify(User.pay_bill(amount_paid, paid_by, note, bill_id))
    

@app.route('/api/stripe/customer', methods=['POST'])
def create_customer():
    data = {
    'name': request.json['name'],
    'email': request.json['email'],
    'source': request.json['source']
    }
    response = requests.post('https://api.stripe.com/v1/customers', data=data, auth=(stripe_key, ''))
    return jsonify(response.json())

@app.route('/api/stripe/charge/<charge>', methods=['GET'])
def get_charge(charge):
    response = requests.get('https://api.stripe.com/v1/charges/' + charge, auth=(stripe_key, ''))
    return jsonify(response.json())

@app.route('/api/stripe/charge', methods=['POST'])
def post_charge():
    data = {
    'amount': request.json['amount'],
    'currency': 'usd',
    'customer': request.json['customer'],
    'source': request.json['card']
    }
    response = requests.post('https://api.stripe.com/v1/charges', data=data, auth=(stripe_key, ''))
    return jsonify(response.json())

@app.route('/api/stripe/addcard', methods=['POST'])
def add_card():
    customer = request.json['customer']
    data = {
    'source': request.json['source']
    }
    response = requests.post('https://api.stripe.com/v1/customers/'+customer+'/sources', data=data, auth=(stripe_key, ''))
    return jsonify(response.json())

@app.route('/api/stripe/customer/<customer>', methods=['GET'])
def get_customer(customer):
    response = requests.get('https://api.stripe.com/v1/customers/'+ customer, auth=(stripe_key, ''))
    return jsonify(response.json())

@app.route('/api/customer', methods=['POST'])
def save_customer():
    name = request.json['name']
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    stripe_id = request.json['customerID']
    default_payment = request.json['default_payment']
    return jsonify(User.create_customer(name, username, password, email, stripe_id, default_payment))

@app.route('/api/customer/<username>', methods=['GET'])
def api_customer(username):
    return jsonify(User.user(username))


# @app.route('/api/stripe/card', methods=['GET','POST'])
# def card():
#     if request.method == 'POST':
#         data = {
#         'card[number]': request.json['number'],
#         'card[exp_month]': request.json['exp_month'],
#         'card[exp_year]': request.json['exp_year'],
#         'card[cvc]': request.json['cvc']
#         }
#         response = requests.post('https://api.stripe.com/v1/tokens', data=data, auth=('sk_test_AFKPFfpBFihGghSPpvizoKJW00C5YScapb', ''))
#         return jsonify(response.json())
#     elif request.method == 'GET':
#         response = requests.get('https://api.stripe.com/v1/customers/cus_FHdfySlM7e4inM/sources/card_1En4NfArt7H7LNANCgzTcu0o', auth=('sk_test_AFKPFfpBFihGghSPpvizoKJW00C5YScapb', ''))
#         return jsonify(response.json())







# @app.route('/api/bills',methods=['POST'])
# def bills():
#     # HARDCODED not session data because login is unecessary for this demo
#     username = "Maria"
#     # TEST
#     u = User(username)
#     d = Data()
#     all_posts = d.all_posts()
#     total_due = request.json['total_due']
#     due_by = username
#     due_date = request.json['due_date']
#     due_to = request.json['due_to']
#     caption = request.json['caption']
#     post_bill = request.json['post_bill']
#     return jsonify({"total due": total_due,})


# @app.route('/userpage/<username>',methods=['GET','POST'])
# def userpage(username):
#     d = Data()
#     user_posts = d.user_page(username)
#     if request.method == 'GET':
#         return render_template('userpage.html', user_posts = user_posts, username = username) 


# @app.route('/pay/<bill>', methods=['GET','POST'])
# def pay(bill):
#     if request.method == 'GET':
#         return render_template('bill.html', bill = bill) 
#     if request.method == 'POST':
#         amount_paid = request.form.get('amount_paid')
#         paid_by = username
#         paid_for = "the user who made the post"
#         note = request.form.get('note')
#         pay_bill = request.form.get('pay_bill')
#         if pay_bill:
#             print("the pay button was pressed")
#             if u.pay_bill(amount_paid, paid_by, note):
#                 print("the pay bill function has fired")
#                 return redirect(url_for('dashboard'))
#             else: 
#                 pass
#                 # TODO error handler
