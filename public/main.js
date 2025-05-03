
let restaurant = [];

let staff = [];

let menu = [];

let orders = [];

let menu_id = 3003;

const setMenuId = (id) => {
  menu_id = ++id;
}

const setRestuarants = (data) => {
  restaurant = data;
};

const setStaff = (data) => {
  staff = data;
};

const setMenu = (data) => {
  menu = data;
};

const setOrders = (data) => {
  orders = data;
};

const displayRestuarants = () => {

  const restuarantTable = document.querySelector('#restuarant-table');


  let tableHTML = '';
  restaurant.map((res) => {
    console.log(res)
    tableHTML += `<tr key=${res.restaurant_id}>
    <td>${res.location}</td>
    <td>${res.food_kind}</td>
    <td><button class="btn btn-warning" type="button" onclick="showStaff(${res.restaurant_id})">View Staff</button></td>
    <td><button class="btn btn-danger" type="button" onclick="showMenu(${res.restaurant_id})">Menu</button></td>
    </tr>`;
  });
  restuarantTable.innerHTML = tableHTML;
};

const displayStaff = () => {

  const staffTable = document.querySelector('#staff-table');

  let tableHTML = `<tr>
  <th>Name</th>
  <th>Position</th>
</tr>`;
  staff.map((staff) => {
    console.log(staff)
    tableHTML += `<tr key=${staff.restaurant_id}>
    <td>${staff.name}</td>
    <td>${staff.position}</td>
    </tr>`;
  });
  staffTable.innerHTML = tableHTML;
}

const displayMenu = rid => {

  const staffTable = document.querySelector('#staff-table');

            let tableHTML = `<tr>
            <th>Food Kind</th>
            <th>Beverage</th>
            <th>Price</th>
            <th></th>
          </tr>`;
            menu.map((menu) => {
              console.log(menu)
              tableHTML += `<tr key=${menu.restaurant_id}>
              <td>${menu.food_item}</td>
              <td>${menu.beverage_item}</td>
              <td>${menu.price}</td>
              <td><button class="btn btn-success" type="button" onclick="addToOrder(${menu.menu_id},${menu.price})">Add To Order</button></td>
              </tr>`;

            });
            tableHTML += `<button class="btn btn-primary" type="button" onclick="addMenu(${rid})">Add Items</button>`
            staffTable.innerHTML = tableHTML;

}

const displayOrders = () => {

  const ordersTable = document.querySelector('#order-table');
    let amount = 0.0;
    let oid = 0;
            let tableHTML = `<tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>`;
            orders.map((order) => {
              console.log(order)
              tableHTML += `<tr key=${order.order_id}>
              <td>${order.food_item}</td>
              <td>${order.quantity}</td>
              <td>${order.price}</td>
              <td><button class="btn btn-success" type="button" onclick="updateQuantity(${order.order_id},${order.quantity})">Increase Quantity</button></td>
              <td><button class="btn btn-danger" type="button" onclick="deleteItem(${order.order_id})">Delete Item</button></td>
              </tr>`;
                amount+= order.quantity * order.price;
                oid = order.final_order_id;                
            });
            amount = 1.08*amount;
            amount = amount.toFixed(2);
            tableHTML += `<button class="btn btn-primary" type="button" onclick="addPayment(${oid},${amount})">Pay Now</button>`
            ordersTable.innerHTML = tableHTML;

}

console.log('start');
showRestuarants();
console.log('started');

async function showRestuarants() {
  try {
    console.log('try to select');
    const response = await fetch('http://localhost:3000/restuarants', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonData = await response.json();

    setRestuarants(jsonData);
    console.log(jsonData)
    displayRestuarants();
  } catch (err) {
    console.log(err.message);
  }
}

async function showStaff(res_id) {
  try {
    console.log('try to select');

    let url = 'http://localhost:3000/restuarants/staff/' + res_id
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonData = await response.json();

    setStaff(jsonData);
    console.log(jsonData)
    displayStaff();
  } catch (err) {
    console.log(err.message);
  }
}

async function showMenu(res_id) {
  try {
    console.log('try to select');

    let url = 'http://localhost:3000/restuarants/menu/' + res_id
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonData = await response.json();

    setMenu(jsonData);
    console.log(jsonData)
    displayMenu(res_id);
  } catch (err) {
    console.log(err.message);
  }
}

async function addToOrder(mid,price) {
  try {
    const body = { oid: 111, cid: 123, iid: mid, price: price};
    const response = await fetch('http://localhost:3000/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err.message);
  }
  window.alert("Added To Order!!!")
}

async function addMenu(rid) {
  const iName = window.prompt("Enter Item Name:");
  const bOption = window.prompt("Enter beverage Option:");
  const price = window.prompt("Enter Price");
  try {
    const body = { mid: 3001, rid: rid, fi: iName, bo: bOption, price: price};
    const response = await fetch('http://localhost:3000/addMenu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err.message);
  }
  window.alert("Added To Menu!!!")

}

async function addPayment(oid,amt) {
  let card = '';
  const pType = window.prompt("Enter Payment Type:");
  if(pType == 'card') {
  card = toString(window.prompt("Enter card number:"));}
  try {
    const body = { oid: oid, amt:amt, pType: pType, card: card};
    const response = await fetch('http://localhost:3000/addPayment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err.message);
  }
  window.alert("Payment Done!!!")
}

async function deleteItem(oid) {
  try {
    const response = await fetch('http://localhost:3000/deleteItem/' + oid, {
      method: 'DELETE'
    });
  } catch (err) {
    console.log(err.message);
  }
  window.alert("Removed!!!")
}

async function updateQuantity(oid,qty) {
 
  try {

    const body = { qty: qty+1};
    const response = await fetch(`http://localhost:3000/updateQty/` + oid, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err.message);
  }
  window.alert("Updated!!!")
}


async function showOrders(cid) {
  try {
    console.log('try to select');

    let url = 'http://localhost:3000/restuarants/orders/' + cid
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonData = await response.json();

    setOrders(jsonData);
    console.log(jsonData)
    displayOrders();
  } catch (err) {
    console.log(err.message);
  }
}