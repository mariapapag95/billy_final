# import stripe

# alert= ""
# stripe.api_key = "sk_test_Tjje5lIY8suQe9zd5d3S6xxO001QKSWAU4"

# def make_payemnt():
#     if valid():
#         try:
#             customer = stripe.Charge.create(
#                 amount = 499 # in cents
#                 currency = "USD"
#                 description = "email" # filter to clean
#                 card = "stripe_id" #filter to clean
#         except stripe.CardError, e:
#             alert = "The card has been declined"
