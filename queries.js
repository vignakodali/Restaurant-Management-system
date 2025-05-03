const queries = {
  updateQty: `update orders set quantity = ? where order_id = ?`,
  deleteItem: `delete from orders where order_id = ?`,
  addOrder: `INSERT INTO orders (customer_id, item_id, price) VALUES (?,?,?)`,
  addMenu: `INSERT INTO menu (restaurant_id, food_item, beverage_item, price) VALUES (?,?,?,?)`,
  addPayment: `INSERT INTO payment_info (order_id, amount, payment_type, card_info) VALUES (?,?,?,?)`,
  getOrders: `SELECT order_id, item_id, final_order_id, quantity, o.price, food_item FROM orders o join menu m on item_id = menu_id where customer_id = ?`,
  getStaffOfRestaurantById: `SELECT * FROM employee WHERE restaurant_id = ?`,
  getMenuOfRestaurantById: `SELECT * FROM menu WHERE restaurant_id = ?`,
  selectRestaurant: `SELECT * FROM restaurant`,
};

module.exports = queries;
