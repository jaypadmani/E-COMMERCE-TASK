# Practical Task

The Flow of the application is based on below:

* signup->login->addToCart->placeOrder->checkout->getOrder->logout

Below are the Routes for the different apis:

Task 1: Develop below APIs:

1. signup = /api/user/signup
2. Login = /api/user/login
3. placeOrder = /api/order/place
4. getOrder = /api/order/
5. add to cart = /api/cart/add
6. checkout = /api/checkout/:orderId
7. logout = /api/user/logout


Task 2: Prepare queries for below statements:

In this query I have not apply the JWT authentication because it apply on all user not an specific user.

1. second higest order = /api/order/second-highest-orde
2. monthly orders analysis for the year 2024 = /api/order/monthly-order-analysis
3. user wise ordering summary = /api/order/user-wise-order-summary
4. products which are sold less than 3 times = /api/order/product-sold-lessthan-3times

Project created 4 tables user, order, order_item, cart which are manage all the data. I have not created any product table i have use directly random product_id.
