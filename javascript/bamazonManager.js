var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "*****",
    database: "bamazon"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    managerOptions();
});

function managerOptions() {
    inquirer
      .prompt([
        {
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices:
            [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    ])
    .then(function(inquirerResponse) {
        switch(inquirerResponse.options) {

            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNew();
                break;
        }
    })
}

function viewProducts() {
    console.log("Current Inventory...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      
      for (var i = 0; i < res.length; i++) {

        var inventory = [
            "ID: " + res[i].id,
            "Product: " + res[i].product_name,
            "Price: " + res[i].price,
            "Quantity: " + res[i].stock_quantity,
            " "
        ].join("\n");
        console.log(inventory);
      }
    });
    connection.end();
}

function viewLow() {
    console.log("List of Low Inventory Items...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
      if (err) throw err;
      
      for (var i = 0; i < res.length; i++) {

        var inventory = [
            "ID: " + res[i].id,
            "Product: " + res[i].product_name,
            "Price: " + res[i].price,
            "Quantity: " + res[i].stock_quantity,
            " "
        ].join("\n");
        console.log(inventory);
      }
    });
    connection.end();
}

function addInventory() {
    inquirer
      .prompt([
        {
            name: "id",
            type: "input",
            message: "Which product ID would you like to add more to?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to add?"
        }
      ])
      .then(function(inquirerResponse) {
          console.log("You would like to add " + inquirerResponse.quantity + " units of product ID:" + (inquirerResponse.id));
          
          connection.query("SELECT * FROM products", function(err, res) {
            
            var itemNumber = inquirerResponse.id - 1;
            var currentStock = parseInt(res[itemNumber].stock_quantity);
            var addStock = parseInt(inquirerResponse.quantity);
            var updatedQuantity = currentStock += addStock;

            if (err) throw err;
            updateDB(updatedQuantity, inquirerResponse.id);
          });
    });
}

function updateDB(quantity, product_id) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
            stock_quantity: quantity
            },
            {
            id: product_id
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log("Inventory updated!");
        }
    );
    connection.end();
}

function addNew() {
    inquirer
      .prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the product you would like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "What department does this item belong to?"
        },
        {
            name: "price",
            type: "input",
            message: "How much will this product be priced at?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to add?"
        }
      ])
      .then(function(inquirerResponse) {
         
        var res = inquirerResponse;
        connection.query("INSERT INTO products SET ?",
            {
            product_name: res.name,
            department_name: res.department,
            price: res.price,
            stock_quantity: res.quantity
            },
            function(err, res) {
                if (err) throw err;
                console.log("New product added to inventory!");
            }
        );
        connection.end();
    });
}