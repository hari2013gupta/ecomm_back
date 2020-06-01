const con = require('../../db/db_config')

function executeDBQuery(req, res, strQuery) {
    con.query(strQuery, function (error, results, fields) {
        try {
            if (error) {
                console.log(error);
                //throw error;
                // res.send({
                //   "code": 400,
                //   "message": "Error found"
                // });
                res.json({
                    code: 400,
                    message: 'Error occured: ',
                    data: ''
                });
            } else {
                console.log(fields);
                // res.send(results);
                res.json({
                    code: 200,
                    message: 'Success',
                    data: results
                });
                // Don't use the connection here, it has been returned to the pool.
            }
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    });
}
exports.createTable = async function (req, res) {
    const query_user = "CREATE TABLE `tbl_user` (" +
        "`user_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`user_mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_email` varchar(50) COLLATE utf8mb4_unicode_ci," +
        "`user_otp` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`device_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_photo` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`user_active` int(2) unsigned NOT NULL," +
        "`user_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`user_id`)," +
        "UNIQUE KEY `user_mobile` (`user_mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_address = "CREATE TABLE `tbl_address` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`address_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`address1` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`address2` varchar(100) COLLATE utf8mb4_unicode_ci," +
        "`landmark` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`geo_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`latitude` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`longitude` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`pin` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`area` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`state` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`address_id`)," +
        "CONSTRAINT FK_UserId FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`)" +
        // "FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`)," +
        // "UNIQUE KEY `geo_address` (`geo_address`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_city = "CREATE TABLE `tbl_city` (" +
        "`city_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`city_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`city_active` int(2) unsigned NOT NULL DEFAULT 0," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`city_id`)," +
        "UNIQUE KEY `city_name` (`city_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_order = "CREATE TABLE `tbl_order` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`o_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`o_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`o_status` int(2) unsigned NOT NULL DEFAULT 0," + //0-not valid,1-ordered,2-verified,3-deliv
        "`o_product_ids` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`o_amount` int(10) unsigned NOT NULL DEFAULT 0," +
        "`o_coupon` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`o_date` datetime NOT NULL," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`o_id`)," +
        "CONSTRAINT FK_OrderUserId FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`)," +
        "UNIQUE KEY `o_number` (`o_number`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_cart = "CREATE TABLE `tbl_cart` (" +
    "`user_id` int(10) unsigned NOT NULL," +
    "`store_id` int(10) unsigned NOT NULL," +
    // "`cart_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`product_ids` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`count` int(10) unsigned NOT NULL DEFAULT 0," +
        "`cart_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        // "PRIMARY KEY (`cart_id`)," +
        "CONSTRAINT FK_CartStoreId FOREIGN KEY (`store_id`) REFERENCES `tbl_store`(`store_id`)," +
        "CONSTRAINT FK_CartUserId FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_store = "CREATE TABLE `tbl_store` (" +
        "`store_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`store_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`store_pan` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_aadhaar` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_reg_id` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_reg_name` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_token` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`store_photo` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`store_address` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_city` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_pin` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_latitude` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_longitude` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_active` int(2) unsigned NOT NULL DEFAULT 0," +
        "`store_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`store_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`store_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_category = "CREATE TABLE `tbl_category` (" +
        "`store_id` int(10) unsigned NOT NULL," +
        "`cat_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`cat_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`cat_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`cat_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`cat_id`)," +
        "CONSTRAINT FK_StoreId FOREIGN KEY (`store_id`) REFERENCES `tbl_store`(`store_id`)," +
        "UNIQUE KEY `cat_name` (`cat_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_product = "CREATE TABLE `tbl_product` (" +
        "`cat_id` int(10) unsigned NOT NULL," +
        "`product_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`product_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`product_title` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_description` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_mrp` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`product_price` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`product_image` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_weight` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`product_max` int(10) unsigned NOT NULL," +
        "`product_active` int(2) unsigned NOT NULL," +
        "`cat_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`product_id`)," +
        "CONSTRAINT FK_CategoryId FOREIGN KEY (`cat_id`) REFERENCES `tbl_category`(`cat_id`)," +
        "UNIQUE KEY `product_name` (`product_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_payment = "CREATE TABLE `tbl_payment_temp` (" + //this table is common
        "`user_id` int(10) unsigned NOT NULL," +
        "`o_id` int(10) unsigned NOT NULL," +
        "`payment_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`cash` int(10) unsigned NOT NULL DEFAULT 0," +
        "`card` int(10) unsigned NOT NULL DEFAULT 0," +
        "`paytm` int(10) unsigned NOT NULL DEFAULT 0," +
        "`online` int(10) unsigned NOT NULL DEFAULT 0," +
        "`payment_verified` int(2) unsigned NOT NULL DEFAULT 0," +
        "`payment_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`payment_id`)," +
        "CONSTRAINT FK_OrderId FOREIGN KEY (`o_id`) REFERENCES `tbl_order`(`o_id`)" +
        // "UNIQUE KEY `payment_remark` (`payment_remark`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_payment_success = "CREATE TABLE `tbl_payment_main` (" + //this table is used by account dept. only
        "`user_id` int(10) unsigned NOT NULL," +
        "`o_id` int(10) unsigned NOT NULL," +
        "`master_payment_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`cash` int(10) unsigned NOT NULL DEFAULT 0," +
        "`card` int(10) unsigned NOT NULL DEFAULT 0," +
        "`paytm` int(10) unsigned NOT NULL DEFAULT 0," +
        "`online` int(10) unsigned NOT NULL DEFAULT 0," +
        "`payment_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`master_payment_id`)," +
        "CONSTRAINT FK_SuccessOrderId FOREIGN KEY (`o_id`) REFERENCES `tbl_order`(`o_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_wallet = "CREATE TABLE `tbl_wallet` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`wallet_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`wallet_amount` int(10) unsigned NOT NULL DEFAULT 0," +
        "`trans_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`wallet_active` int(2) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "PRIMARY KEY (`wallet_id`)," +
        "CONSTRAINT FK_WalletUserId FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_offer = "CREATE TABLE `tbl_offer` (" +
        "`offer_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`offer_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_active` int(2) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_active_from_date` datetime NOT NULL," +
        "`offer_active_to_date` datetime NOT NULL," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`offer_id`)," +
        "UNIQUE KEY `offer_name` (`offer_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_coupon = "CREATE TABLE `tbl_coupon` (" +
        "`coupon_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`coupon` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_type` int(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0," + //1-flat,2-percent
        "`coupon_min_amt` int(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0," +
        "`coupon_max_allowed` int(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0," +
        "`coupon_active` int(2) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_active_from_date` datetime NOT NULL," +
        "`coupon_active_to_date` datetime NOT NULL," +
        "`created_at` datetime NOT NULL," +
        "`updated_at` datetime NOT NULL," +
        "PRIMARY KEY (`coupon_id`)," +
        "UNIQUE KEY `coupon` (`coupon`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_notification = "CREATE TABLE `tbl_notification` (" +
        "`notif_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`notif_title` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`notif_description` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`notif_active` int(2) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "PRIMARY KEY (`notif_id`)," +
        "UNIQUE KEY `notif_title` (`notif_title`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    //following module yet to be done//(todo task)
    const query_deliv_user = "CREATE TABLE `tbl_deliv_user` (" +
        "`id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_address = "CREATE TABLE `tbl_deliv_address` (" +
        "`id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_order = "CREATE TABLE `tbl_deliv_order` (" +
        "`id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_track = "CREATE TABLE `tbl_deliv_order` (" +
        "`id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_manager = "CREATE TABLE `tbl_deliv_manager` (" +
        "`id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_drop_table = "DROP TABLE tbl_user";
    // executeDBQuery(req, res, query_drop_table);
    // executeDBQuery(req, res, query_user);
    // executeDBQuery(req, res, query_address);
    // executeDBQuery(req, res, query_city);
    // executeDBQuery(req, res, query_order);
    // executeDBQuery(req, res, query_cart);
    // executeDBQuery(req, res, query_store);
    // executeDBQuery(req, res, query_category);
    // executeDBQuery(req, res, query_product);
    // executeDBQuery(req, res, query_payment);
    // executeDBQuery(req, res, query_payment_success);
    // executeDBQuery(req, res, query_wallet);
    // executeDBQuery(req, res, query_offer);
    // executeDBQuery(req, res, query_coupon);
    executeDBQuery(req, res, query_notification);
    // executeDBQuery(req, res, query_deliv_user);
    // executeDBQuery(req, res, query_deliv_address);
    // executeDBQuery(req, res, query_order);
    // executeDBQuery(req, res, query_deliv_track);
    // executeDBQuery(req, res, query_deliv_manager);
    // executeDBQuery(req, res, query_deliv_report);
    // const query = "CREATE TABLE `tbl_users` (" +
    //     "`id` int(11) NOT NULL AUTO_INCREMENT," +
    //     "`name` varchar(100) NOT NULL," +
    //     "`mobile` varchar(20) NOT NULL," +
    //     "`email` varchar(50) NOT NULL," +
    //     "`password` varchar(255) NOT NULL," +
    //     "`created_at` datetime NOT NULL," +
    //     "`updated_at` datetime NOT NULL," +
    //     "PRIMARY KEY (`id`)" +
    //     ") ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1";
    //   const query = "CREATE TABLE employees(name VARCHAR(50), address VARCHAR(100), mobile_no VARCHAR(50))";
    //   const query = "INSERT INTO employees (name, address) VALUES ('Company Inc', 'Highway 37')"; 
    // const query = 'SELECT * FROM customers WHERE address = ' + con.escape(adr);
    // const query = "SELECT * FROM customers WHERE address LIKE 'S%'"; 
    // const query = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
    // const query = 'SELECT * FROM customers ORDER BY name LIMIT 5 OFFSET 2';//LIMIT 2,5
    // executeDBQuery(req, res, query);
}