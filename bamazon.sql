CREATE DATABASE bamazon;

USE bamazon;

-- Products Table --

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(10,2) NULL
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adobe Photoshop Elements 2018", "Software", 89.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Web Design with Javascript", "Books", 40.42, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Logitech MX Master Wireless Mouse", "Electronics", 101.69, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Das Keyboard 4 Professional Keyboard", "Electronics", 149.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose Companion 2 Series Speakers", "Electronics", 99.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Philips Hue White and Color Starter Kit", "Home Improvement", 194.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 55-Inch 4k Ultra HD Smart LED TV", "Electronics", 574.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dyson Cyclone V10 Motorhead Cordless Vacuum", "Electronics", 449.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rolex GMT Master Batman", "Jewelry", 12999.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nature's Way Alive! Men's Multivitamin", "Health", 13.36, 60);

-- Departments Table --

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Software", 12);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 5);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 40);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Jewelry", 3000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 9);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Improvement", 15);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Health", 3);