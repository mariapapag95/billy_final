import stripe

# Set your secret key: remember to change this to your live secret key in production
# See your keys here: https://dashboard.stripe.com/account/apikeys
stripe.api_key = 'sk_test_yfIZOXaJC6Vj9oenlnjAO68p00dkYh5GWe'

payment_method = stripe.PaymentMethod.create(
    type='card',
    card={
        'number': '4242424242424242',
        'exp_month': 12,
        'exp_year': 2020,
        'cvc': '123',
    },
)

customer_payment = stripe.PaymentMethod.attach(
    'pm_card_visa',
    customer='cus_FHIfU9zlRY92FH'
)

intent = stripe.PaymentIntent.create(
    amount=1099,
    currency='usd',
    payment_method_types=['card'],
    payment_method='pm_1Emk4T2eZvKYlo2Cd68RSdIO',
    confirm=True,
)
print("something")
print(intent)