
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Products
products = [
    {
        "id": 1,
        "name": "Dark Roast Whole Beans (400g)",
        "description": "Description for Product 1",
        "price": 16.00,
        "image": "images/product1.png",
    },
    {
        "id": 2,
        "name": "Medium Roast Whole Beans (400g)",
        "description": "Description for Product 2",
        "price": 14.00,
        "image": "images/product2.png",
    },
    {
        "id": 3,
        "name": "Dark Roast Ground Coffee (400g)",
        "description": "Description for Product 3",
        "price": 16.00,
        "image": "images/product3.png",
    },
    {
        "id": 4,
        "name": "Medium Roast Ground Coffee (400g)",
        "description": "Description for Product 4",
        "price": 14.00,
        "image": "images/product4.png",
    },
    {
        "id": 5,
        "name": "Light Roast Coffee Beans (400g)",
        "description": "Description for Product 5",
        "price": 14.00,
        "image": "images/product5.png",
    },
    {
        "id": 6,
        "name": "Light Roast Ground Coffee (400g)",
        "description": "Description for Product 6",
        "price": 14.00,
        "image": "images/product6.png",
    },
    {
        "id": 7,
        "name": "Black Coffee Mug (12oz)",
        "description": "Description for Product 7",
        "price": 12.00,
        "image": "images/product7.png",
    },
    {
        "id": 8,
        "name": "White Coffee Mug (12oz)",
        "description": "Description for Product 8",
        "price": 12.00,
        "image": "images/product8.png",
    },
    {
        "id": 9,
        "name": "Coffee Grinder Kit",
        "description": "Description for Product 9",
        "price": 30.00,
        "image": "images/product9.png",
    },
    {
        "id": 10,
        "name": "Brown Coffee Mug (12oz)",
        "description": "Description for Product 10",
        "price": 12.00,
        "image": "images/product10.png",
    },
]

# Users list. To be filled in from registering
users = []

# Gets you user information. Just for debugging
@app.route('/users', methods=['GET'])
def get_persons():
    return jsonify(users)

# Returns all products from the list above. Used for fetching to the products list
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

# Route to authenticate user
@app.route('/login', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    
    entered_username = data.get('username')
    entered_password = data.get('password')

    # Check if the entered username and password match any user in the array
    for user in users:
        if user['username'] == entered_username and user['password'] == entered_password:
            return jsonify({"authenticated": True, "message": "Authentication successful"})
    
    # If it doesn't match with any user
    return jsonify({"authenticated": False, "message": "Authentication failed. Incorrect username or password."})

# Route to register a new user
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    # Check if username already exists
    if any(user['username'] == username for user in users):
        return jsonify({'error': 'Username already exists'}), 400

    # Add user to the list
    users.append({'username': username, 'password': password, 'email': email})
    return jsonify({"signedUp": True, 'message': 'User registered successfully'}), 201

if __name__ == '__main__':
    app.run()
