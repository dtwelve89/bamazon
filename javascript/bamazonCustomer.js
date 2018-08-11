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
    readProducts();
});

function readProducts() {
    console.log("Items available for sale...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      
      for (var i = 0; i < res.length; i++) {

        var inventory = [
            "ID: " + res[i].id,
            "Product: " + res[i].product_name,
            "Price: " + res[i].price,
            " "
        ].join("\n");
        console.log(inventory);
      }
      runPurchase();
    });
}

function runPurchase() {
    inquirer
      .prompt([
        {
            name: "id",
            type: "input",
            message: "Which product ID would you like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to buy?"
        }
      ])
      .then(function(inquirerResponse) {
          console.log("You would like to purchase " + inquirerResponse.quantity + " units of product ID:" + (inquirerResponse.id));
          
          connection.query("SELECT * FROM products", function(err, res) {
            
            var itemNumber = inquirerResponse.id - 1;

            if (err) throw err;
            if (res[itemNumber].stock_quantity >= inquirerResponse.quantity) {

                var updatedQuantity = res[itemNumber].stock_quantity - inquirerResponse.quantity;
                var totalAmount = res[itemNumber].price * inquirerResponse.quantity
                var addedRev = res[itemNumber].product_sales += totalAmount

                console.log("Product: " + res[itemNumber].product_name + "\nYour total cost is: $" + totalAmount.toFixed(2));

                updateInv(updatedQuantity, inquirerResponse.id);
                updateSales(addedRev, inquirerResponse.id);
            } else {
                console.log("Insufficient quantity!");
                connection.end();
            }
          });
    });
}

function updateInv(quantity, product_id) {
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
        }
    );
}

function updateSales(revenue, product_id) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
            product_sales: revenue
            },
            {
            id: product_id
            }
        ],
        function(err, res) {
            if (err) throw err;
        }
    );
    connection.end();
}