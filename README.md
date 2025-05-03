# Restaurant Management System

## Abstract
The Restaurant Management System (RMS) is a comprehensive solution designed to streamline the operations of restaurants by automating critical functions such as order management, billing, and customer interaction. Built using Python and MySQL, the RMS provides an intuitive interface and supports different roles like customers, waitstaff, and management. Its modular design ensures scalability and easy integration with other systems like inventory or reservation management.

## Introduction
This system handles various tasks including menu management, orders, payments, and customer interactions. It is built with:
- **Backend**: Express.js
- **Database**: SQL
- **Frontend**: HTML/CSS/JavaScript

## System Features
- **View Menu**: Displays available food items
- **Add to Bag**: Adds selected items to customer’s cart
- **Add Items**: Lets staff add new food items to the menu
- **View Orders**: Shows current customer orders
- **Pay Now**: Payment popup with cash or card options

## Database Design
The database uses multiple related tables:
- **Restaurant Table**: Stores name, location, manager
- **Cuisine Type Table**: Allows multi-cuisine support
- **Food_Item Table**: Contains item details and pricing
- **Order and Payment Tables**: Link orders to payment details

## Server Implementation (Express.js)
- **GET /restaurants**: Fetch all restaurants
- **GET /restaurants/menu/:id**: Get menu of specific restaurant
- **POST /addMenu**: Add a new food item

## Client-Side (HTML/JavaScript)
- Dynamic tables display restaurants, staff, menu, and orders
- Buttons allow interaction like viewing menus and orders

## Integration and Flow
Clicking a restaurant loads the menu dynamically. Customers can add items, proceed to payment, and the system updates order/payment status.

## Conclusion
This RMS provides a scalable solution for restaurant operations, built using modern web technologies and offering future integration possibilities.

## Future Improvements
- Mobile App Integration
- Real-Time Order Updates (WebSockets)
- Machine Learning for Recommendations
