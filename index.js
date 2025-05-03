const express = require('express');
const app = express();
const cors = require('cors');

const AppDAO = require('./DAO');
const Repository = require('./Repository');
const Todo = require('./model');

app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());


const dao = new AppDAO();
const restaurantRepository = new Repository(dao);
//ROUTES

app.get('/restuarants', async (req, res) => {
  try {
    console.log('try to fetch');
    const allRestaurant = await restaurantRepository.getAllRestaurant();
    console.log('get all restuarants ', allRestaurant);
    res.json(allRestaurant);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/restuarants/staff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const staff = await restaurantRepository.getStaffOfRestaurantById(id);
     console.log("get restuarant by id ", staff);
    res.json(staff);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/restuarants/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const menu = await restaurantRepository.getMenuOfRestaurantById(id);
     console.log("get menu by id ", menu);
    res.json(menu);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/restuarants/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const orders = await restaurantRepository.getOrders(id);
     console.log("get order by id ", orders);
    res.json(orders);
  } catch (err) {
    console.log(err.message);
  }
});


app.post('/addOrder', async (req, res) => {
  try {
    const { oid,cid,iid,price } = req.body;
    const newOrder = await restaurantRepository.addOrder(cid,iid,price);
    res.json(newOrder);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/addMenu', async (req, res) => {
  try {
    const { mid,rid,fi,bo,price } = req.body;
    const newMenu = await restaurantRepository.addMenu(rid,fi,bo,price);
    res.json(newMenu);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/addPayment', async (req, res) => {
  try {
    const { oid,amt,pType,card } = req.body;
    const newPayment = await restaurantRepository.addPayment(oid,amt,pType,card);
    res.json(newPayment);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete('/deleteItem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await restaurantRepository.deleteItem(id);
    res.json(deleteItem);
  } catch (err) {
    console.log(err.message);
  }
});


app.put('/updateQty/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const updateQty = await restaurantRepository.updateQty(qty,id);
    res.json(updateQty);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('*', function (req, res) {
  path = __dirname + '/public/index.html';
  res.sendFile(path);
});

app.listen(3000, () => {
  console.log('server has started on port 3000');
});
