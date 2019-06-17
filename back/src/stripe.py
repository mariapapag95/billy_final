# # stripe.api_key = 'sk_test_Tjje5lIY8suQe9zd5d3S6xxO001QKSWAU4'

# # payment_intent = stripe.PaymentIntent.create(
# #     payment_method_types: ['card'],  
# #     amount="""bill amount in cents"""",
# #     currency='usd',
# #     on_behalf_of="""CONNECTED_STRIPE_ACCOUNT_ID"""
# # )

# # TEST MODE CLIENT ID = ca_FExmgkTgTfa854CTiLQXS40F3Z9DkS2s

# # AUTHORIZE_URL = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FExmgkTgTfa854CTiLQXS40F3Z9DkS2s&scope=read_write"


# import stripe
# stripe.api_key = "sk_test_Tjje5lIY8suQe9zd5d3S6xxO001QKSWAU4"

# stripe.Charge.create(
#   amount=2000,
#   currency="usd",
#   source="tok_mastercard", # obtained with Stripe.js
#   description="Charge for jenny.rosen@example.com"
# )

# # Create a Customer:
# customer = stripe.Customer.create(
#   source='tok_mastercard',
#   email='paying.user@example.com',
# )

# # Charge the Customer instead of the card:
# charge = stripe.Charge.create(
#   amount=1000,
#   currency='usd',
#   customer=customer.id,
# )

# # YOUR CODE: Save the customer ID and other info in a database for later.

# # When it's time to charge the customer again, retrieve the customer ID.
# charge = stripe.Charge.create(
#   amount=1500, # $15.00 this time
#   currency='usd',
#   customer=customer_id, # Previously stored, then retrieved
# )