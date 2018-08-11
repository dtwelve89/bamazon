var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table");

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
    supervisorOptions();
});

function supervisorOptions() {
    inquirer
      .prompt([
        {
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices:
            [
                "View Product Sales by Department",
                "Create New Department"
            ]
        }
    ])
    .then(function(inquirerResponse) {
        switch(inquirerResponse.options) {

            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                createDepartment();
                break;
        }
    })
}

function viewSales() {
    var data, output;

    connection.query("SELECT * FROM departments \
    INNER JOIN products ON departments.department_name = products.department_name",
    function(err, res) {

        if (err) throw err;

        data = [
            ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"],
        ];

        for (var i = 0; i < res.length; i++) {
            
            var totalOverhead = Math.floor(res[i].product_sales / res[i].price) * res[i].over_head_costs
            var totalProfit = res[i].product_sales - totalOverhead;

            data.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, totalProfit.toFixed(2)]);
        }

        output = table.table(data);
        console.log(output);
    });
    connection.end();
}

function createDepartment() {
    inquirer
        .prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the department you would like to create?"
        },
        {
            name: "cost",
            type: "input",
            message: "What is the overhead cost of this department?"
        }
        ])
        .then(function(inquirerResponse) {
            
        var res = inquirerResponse;
        connection.query("INSERT INTO departments SET ?",
            {
            department_name: res.name,
            over_head_costs: res.cost
            },
            function(err, res) {
                if (err) throw err;
                console.log("New department added!");
            }
        );
        connection.end();
    });
}