const queries = require('./queries');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  updateQty(qty,oid) {
    return this.dao.run(queries.updateQty, [qty,oid]);
  }

  deleteItem(id) {
    return this.dao.run(queries.deleteItem, [id]);
  }

  addOrder(cid,iid,price) {
    return this.dao.run(queries.addOrder, [cid,iid,price]);
  }

  addMenu(rid,fi,bo,price) {
    return this.dao.run(queries.addMenu, [rid,fi,bo,price]);
  }

  addPayment(oid,amt,pType,card) {
    return this.dao.run(queries.addPayment, [oid,amt,pType,card]);
  }

  getOrders(id) {
    return this.dao.run(queries.getOrders, [id]);
  }

  getStaffOfRestaurantById(id) {
    return this.dao.run(queries.getStaffOfRestaurantById, [id]);
  }

  getMenuOfRestaurantById(id) {
    return this.dao.run(queries.getMenuOfRestaurantById, [id]);
  }

  getAllRestaurant() {
    return this.dao.run(queries.selectRestaurant, []);
  }
}

module.exports = Repository;
