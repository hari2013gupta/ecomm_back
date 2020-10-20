const con = require('../../db/db')

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
    const query_access_token = "CREATE TABLE `tbl_access_token` (" +
        "`access_token_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`user_id` int(11) unsigned NOT NULL," +
        "`access_token` text," +
        "`device_type` enum('ios','android','web') NOT NULL," +
        "`device_token` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
        "`device_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
        "`imei` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`ip_address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
        "`remark` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`access_token_id`)," +
        "CONSTRAINT fk_access_token_1_idx FOREIGN KEY (`user_id`) REFERENCES `tbl_customer`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_customer = "CREATE TABLE `tbl_customer` (" +
        "`user_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`user_mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_email` varchar(50) COLLATE utf8mb4_unicode_ci," +
        "`user_otp` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`device_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_photo` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`user_active` tinyint(1) NOT NULL DEFAULT 1," +
        "`block_status` tinyint(1) NOT NULL DEFAULT 0," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`user_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`user_id`)," +
        "UNIQUE KEY `user_mobile` (`user_mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_address = "CREATE TABLE `tbl_address` (" +
        "`user_id` int(11) unsigned NOT NULL," +
        "`address_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`address1` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`address2` varchar(100) COLLATE utf8mb4_unicode_ci," +
        "`landmark` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`geo_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`user_latitude` double NOT NULL DEFAULT 0.0," +
        "`user_longitude` double NOT NULL DEFAULT 0.0," +
        "`pin` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`area` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`state` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`country` varchar(50) COLLATE utf8mb4_unicode_ci," +
        "`time_zone` varchar(100) COLLATE utf8mb4_unicode_ci," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`address_id`)," +
        "CONSTRAINT FK_UserId FOREIGN KEY (`user_id`) REFERENCES `tbl_customer`(`user_id`)" +
        // "FOREIGN KEY (`user_id`) REFERENCES `tbl_customer`(`user_id`)," +
        // "UNIQUE KEY `geo_address` (`geo_address`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_country = "CREATE TABLE `tbl_country_master` (" +
        "`country_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`country_code` varchar(5) COLLATE utf8mb4_unicode_ci," +
        "`country_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`country_active` tinyint(1) NOT NULL DEFAULT 1," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`country_id`)," +
        "UNIQUE KEY `country_name` (`country_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_state = "CREATE TABLE `tbl_state` (" +
        "`country_id` int(11) unsigned NOT NULL," +
        "`state_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`state_code` varchar(5) COLLATE utf8mb4_unicode_ci," +
        "`state_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`state_active` tinyint(1) NOT NULL DEFAULT 1," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`state_id`)," +
        "CONSTRAINT FK_CountryStateId FOREIGN KEY (`country_id`) REFERENCES `tbl_country_master`(`country_id`)," +
        "UNIQUE KEY `state_name` (`state_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_city = "CREATE TABLE `tbl_city` (" +
        "`state_id` int(11) unsigned NOT NULL," +
        "`city_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`city_code` varchar(5) COLLATE utf8mb4_unicode_ci," +
        "`city_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`city_active` int(2) unsigned NOT NULL DEFAULT 1," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`city_id`)," +
        "CONSTRAINT FK_StateCityId FOREIGN KEY (`state_id`) REFERENCES `tbl_state`(`state_id`)," +
        "UNIQUE KEY `city_name` (`city_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_store = "CREATE TABLE `tbl_store_master` (" +
        "`city_id` int(11) unsigned NOT NULL," +
        "`store_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`store_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`store_pan` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_aadhaar` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_reg_id` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_reg_name` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_verified` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_token` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`store_photo` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`store_address` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_landmark` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_city` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_pin` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`store_latitude` double NOT NULL," +
        "`store_longitude` double NOT NULL," +
        "`store_tzone` varchar(100) COLLATE utf8mb4_unicode_ci," +
        "`store_phone_ext` int(11)," +
        "`store_phone_num` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`store_mobile_num` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`store_type` int(2) unsigned NOT NULL DEFAULT 0," + //1-grocery,2-food,3-electronic,4-statianory,5-farmer/Agriculture
        "`store_active` int(2) unsigned NOT NULL DEFAULT 1," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`store_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`store_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`store_id`)," +
        "CONSTRAINT FK_CityStoreId FOREIGN KEY (`city_id`) REFERENCES `tbl_city`(`city_id`)," +
        "UNIQUE KEY `store_name` (`store_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_category = "CREATE TABLE `tbl_category` (" +
        "`store_id` int(11) unsigned NOT NULL," +
        "`cat_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`cat_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`cat_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`cat_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`cat_id`)," +
        "CONSTRAINT FK_StoreId FOREIGN KEY (`store_id`) REFERENCES `tbl_store_master`(`store_id`)," +
        "UNIQUE KEY `cat_name` (`cat_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_popular_category = "CREATE TABLE `tbl_popular_cat` (" +
        "`cat_id` int(11) unsigned NOT NULL," +
        "`popular_cat_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`popular_cat_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`popular_cat_dscr` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`popular_cat_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`popular_cat_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`popular_cat_id`)," +
        "CONSTRAINT FK_PopularCatId FOREIGN KEY (`cat_id`) REFERENCES `tbl_category`(`cat_id`)," +
        "UNIQUE KEY `popular_cat_name` (`popular_cat_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_popular_product = "CREATE TABLE `tbl_popular_prod` (" +
        "`product_id` int(11) unsigned NOT NULL," +
        "`popular_prod_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`popular_prod_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`popular_prod_dscrip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`popular_prod_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`popular_prod_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`popular_prod_id`)," +
        "CONSTRAINT FK_PopularProdId FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`product_id`)," +
        "UNIQUE KEY `popular_prod_name` (`popular_prod_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_product = "CREATE TABLE `tbl_product` (" +
        "`cat_id` int(11) unsigned NOT NULL," +
        "`product_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`product_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`product_title` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_description` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_mrp` int(11) unsigned NOT NULL DEFAULT 0," +
        "`product_price` int(11) unsigned NOT NULL DEFAULT 0," +
        "`product_image` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_weight` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`product_max` int(11) unsigned NOT NULL," +
        "`product_active` tinyint(1) unsigned NOT NULL DEFAULT 1," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`is_popular` tinyint(1) unsigned NOT NULL," +
        "`is_new` tinyint(1) unsigned NOT NULL," +
        "`cat_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_rating` int(5) unsigned NOT NULL DEFAULT 0," +
        "`product_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`product_id`)," +
        "CONSTRAINT FK_CategoryId FOREIGN KEY (`cat_id`) REFERENCES `tbl_category`(`cat_id`)," +
        "UNIQUE KEY `product_name` (`product_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_product_item = "CREATE TABLE `tbl_product_item` (" +
        "`product_id` int(11) unsigned NOT NULL," +
        "`item_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`product_mrp` int(11) unsigned NOT NULL DEFAULT 0," +
        "`product_price` int(11) unsigned NOT NULL DEFAULT 0," +
        "`product_image` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`product_weight` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`product_unit` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`item_id`)," +
        "CONSTRAINT FK_ItemProductId FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`product_id`)," +
        "UNIQUE KEY `product_weight` (`product_weight`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_product_image = "CREATE TABLE `tbl_product_image` (" +
        "`product_id` int(11) unsigned NOT NULL," +
        "`image_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`product_name` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`product_image` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`image_id`)," +
        "CONSTRAINT FK_ImageProductId FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`product_id`)," +
        "UNIQUE KEY `product_name` (`product_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_order = "CREATE TABLE `tbl_order` (" +
        "`user_id` int(11) unsigned NOT NULL," +
        "`address_id` int(11) unsigned NOT NULL," +
        "`o_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`o_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`o_status` int(2) unsigned NOT NULL DEFAULT 0," + //0-not valid,1-ordered,2-verified,3-deliv
        "`o_verified` int(2) unsigned NOT NULL DEFAULT 0," + //0-not verified,1-verified
        "`o_amount` int(11) unsigned NOT NULL DEFAULT 0," +
        "`o_payable` int(11) unsigned NOT NULL DEFAULT 0," +
        "`o_coupon` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`o_discount` varchar(20) COLLATE utf8mb4_unicode_ci," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`o_date` datetime NOT NULL," +
        "`slot_date` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`slot_time` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`o_id`)," +
        "CONSTRAINT FK_OrderUserId FOREIGN KEY (`user_id`) REFERENCES `tbl_customer`(`user_id`)," +
        "CONSTRAINT FK_OrderAddressId FOREIGN KEY (`address_id`) REFERENCES `tbl_address`(`address_id`)," +
        "UNIQUE KEY `o_number` (`o_number`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_order_product_purchased = "CREATE TABLE `tbl_order_product_purchased`(" +
        "`o_id` int(11) unsigned NOT NULL," +
        "`product_purchased_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`product_id` int(11) unsigned NOT NULL," +
        "`product_count` int(11) unsigned NOT NULL DEFAULT 0," +
        "`product_mrp` int(11) unsigned NOT NULL DEFAULT 0," +
        "`product_price` int(11) unsigned NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`product_purchased_id`)," +
        "CONSTRAINT FK_PurchasedOrderId FOREIGN KEY (`o_id`) REFERENCES `tbl_order`(`o_id`)," +
        "CONSTRAINT FK_PurchasedProductId FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`product_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_cart = "CREATE TABLE `tbl_cart` (" +
        "`user_id` int(11) unsigned NOT NULL," +
        "`store_id` int(11) unsigned NOT NULL," +
        "`cart_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`cart_tag` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`cart_id`)," +
        "CONSTRAINT FK_CartStoreId FOREIGN KEY (`store_id`) REFERENCES `tbl_store_master`(`store_id`)," +
        "CONSTRAINT FK_CartUserId FOREIGN KEY (`user_id`) REFERENCES `tbl_customer`(`user_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_cart_product = "CREATE TABLE `tbl_cart_product` (" +
        "`cart_id` int(11) unsigned NOT NULL," +
        "`product_cart_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`product_id` int(11) unsigned NOT NULL," +
        "`product_count` int(11) unsigned NOT NULL DEFAULT 0," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`product_cart_id`)," +
        "CONSTRAINT FK_CartProductId FOREIGN KEY (`cart_id`) REFERENCES `tbl_cart`(`cart_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const query_payment_master = "CREATE TABLE `tbl_payment_master` (" + //this table is to receive amt
        "`user_id` int(11) unsigned NOT NULL," +
        "`o_id` int(11) unsigned NOT NULL," +
        "`master_payment_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`cash` int(11) unsigned NOT NULL DEFAULT 0," +
        "`card` int(11) unsigned NOT NULL DEFAULT 0," +
        "`paytm` int(11) unsigned NOT NULL DEFAULT 0," +
        "`online` int(11) unsigned NOT NULL DEFAULT 0," +
        "`upi` int(11) unsigned NOT NULL DEFAULT 0," +
        "`cheque` int(11) unsigned NOT NULL DEFAULT 0," +
        "`discount` int(11) unsigned NOT NULL DEFAULT 0," +
        "`credit_used` int(11) unsigned NOT NULL DEFAULT 0," +
        "`transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`payment_mode` int(2) unsigned NOT NULL DEFAULT 0," + //1-cash,2-card,3-online,4-paytm,5-upi,6-cheque,7-credit
        "`payment_verified` int(2) unsigned NOT NULL DEFAULT 0," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`payment_remark` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`master_payment_id`)," +
        "CONSTRAINT FK_PaymentOrderId FOREIGN KEY (`o_id`) REFERENCES `tbl_order`(`o_id`)" +
        // "UNIQUE KEY `payment_remark` (`payment_remark`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_payment_account = "CREATE TABLE `tbl_payment_account` (" + //this table is used by account dept. only
        "`user_id` int(11) unsigned NOT NULL," +
        "`o_id` int(11) unsigned NOT NULL," +
        "`payment_acc_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`cash` int(11) unsigned NOT NULL DEFAULT 0," +
        "`card` int(11) unsigned NOT NULL DEFAULT 0," +
        "`card_type` int(11) unsigned NOT NULL DEFAULT 0," + //1-debit,2-credit,3-other
        "`paytm` int(11) unsigned NOT NULL DEFAULT 0," +
        "`online` int(11) unsigned NOT NULL DEFAULT 0," +
        "`cheque` int(11) unsigned NOT NULL DEFAULT 0," +
        "`transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci," +
        "`account_remark` varchar(50) COLLATE utf8mb4_unicode_ci," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`payment_acc_id`)," +
        "CONSTRAINT FK_AccountOrderId FOREIGN KEY (`o_id`) REFERENCES `tbl_order`(`o_id`)," +
        "UNIQUE KEY `account_remark` (`account_remark`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_wallet = "CREATE TABLE `tbl_wallet` (" +
        "`user_id` int(11) unsigned NOT NULL," +
        "`wallet_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`wallet_amount` int(11) unsigned NOT NULL DEFAULT 0," +
        "`trans_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`wallet_active` int(2) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "PRIMARY KEY (`wallet_id`)," +
        "CONSTRAINT FK_WalletUserId FOREIGN KEY (`user_id`) REFERENCES `tbl_customer`(`user_id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_offer = "CREATE TABLE `tbl_offer` (" +
        "`offer_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`offer_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`offer_active` tinyint(1) NOT NULL," +
        "`offer_active_from_date` datetime NOT NULL," +
        "`offer_active_to_date` datetime NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`offer_id`)," +
        "UNIQUE KEY `offer_name` (`offer_name`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_coupon = "CREATE TABLE `tbl_coupon` (" +
        "`coupon_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`coupon_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_description` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`coupon_type` int(2) unsigned NOT NULL DEFAULT 0," + //1-flat,2-percent
        "`coupon_min_amt` int(10) unsigned NOT NULL DEFAULT 0," +
        "`coupon_max_allowed` int(10) unsigned NOT NULL DEFAULT 0," +
        "`coupon_active` tinyint(1) NOT NULL," +
        "`coupon_active_from_date` datetime NOT NULL," +
        "`coupon_active_to_date` datetime NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`coupon_id`)," +
        "UNIQUE KEY `coupon` (`coupon_code`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_notification = "CREATE TABLE `tbl_notification` (" +
        "`notif_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`notif_title` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`notif_description` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`notif_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`notif_time` datetime NOT NULL," +
        "`notif_type` int(2) NOT NULL DEFAULT 0," +
        "`notif_active` int(2) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "`updated_at` timestamp NOT NULL," +
        "PRIMARY KEY (`notif_id`)," +
        "UNIQUE KEY `notif_title` (`notif_title`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    //completed phase-I and following module yet to be done after 20th June 2020//(todo task)
    const query_deliv_user = "CREATE TABLE `tbl_deliv_user` (" +
        "`id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`rating` int(2) unsigned NOT NULL DEFAULT 0," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_address = "CREATE TABLE `tbl_deliv_address` (" +
        "`deliv_id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`deliv_mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`deliv_latitude` double NOT NULL," +
        "`deliv_longitude` double NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_order_purchased = "CREATE TABLE `tbl_deliv_order_purchased` (" +
        "`id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_order = "CREATE TABLE `tbl_deliv_order` (" +
        "`id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_track = "CREATE TABLE `tbl_deliv_order_purchased` (" +
        "`id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`track_latitude` double NOT NULL," +
        "`track_longitude` double NOT NULL," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    const query_deliv_manager = "CREATE TABLE `tbl_deliv_manager` (" +
        "`id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
        "`mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL," +
        "`is_deleted` tinyint(1) NOT NULL DEFAULT 0," +
        "PRIMARY KEY (`id`)," +
        "UNIQUE KEY `mobile` (`mobile`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    const insert_country = "INSERT INTO `tbl_country_master` (`country_code`,`country_name`)" +
        " VALUES ('+91','India')";
    const insert_state = "INSERT INTO `tbl_state` (`country_id`,`state_code`,`state_name`)" +
        " VALUES ('2','06','Uttar Pradesh')";
    const insert_city = "INSERT INTO `tbl_city` (`state_id`,`city_code`,`city_name`)" +
        " VALUES ('5','65','Pryagraj')";
    const insert_store = "INSERT INTO `tbl_store_master` (`city_id`,`store_name`,`store_latitude`,`store_longitude`,`store_phone_num`,`store_mobile_num`)" +
        " VALUES (3,'xyz prevision store',28.0123456789,77.0123456789,'0123456789','8470874534')";

    const insert_category = "INSERT INTO `tbl_category` (`store_id`," +
        "`cat_name`, `cat_tag`, `cat_remark`)" +
        "VALUES(2, 'cat_essentials', 'tag_essential','ab kya hua')";

    const insert_product = "INSERT INTO `tbl_product` (`cat_id`,`product_name`, `product_title`," +
        "`product_description`, `product_mrp`, `product_price`, `product_image`, `product_weight`, `product_max`," +
        "`product_active`, `is_popular`, `is_new`, `cat_tag`, `product_rating`, `product_remark`)" +
        "VALUES(2,'sugar', 'Title Sugar - 1Kg', 'description_sugar', 44, 40," +
        "'', '1 KG', 5, 1, 1, 1, 'essential', 0, 'aaaaaaaaaaaa')";

    // const query_drop_table = "DROP TABLE tbl_customer";
    // executeDBQuery(req, res, insert_country);
    // executeDBQuery(req, res, insert_state);
    // executeDBQuery(req, res, insert_city);  
    // executeDBQuery(req, res, insert_store);
    // executeDBQuery(req, res, insert_category);
    // executeDBQuery(req, res, insert_product);

    // executeDBQuery(req, res, query_drop_table);

    executeDBQuery(req, res, query_customer);
    executeDBQuery(req, res, query_access_token);
    executeDBQuery(req, res, query_address);
    executeDBQuery(req, res, query_country);
    executeDBQuery(req, res, query_state);
    executeDBQuery(req, res, query_city);
    executeDBQuery(req, res, query_store);
    executeDBQuery(req, res, query_category);

    executeDBQuery(req, res, query_product);
    executeDBQuery(req, res, query_product_item);
    executeDBQuery(req, res, query_product_image);
    executeDBQuery(req, res, query_popular_category);
    executeDBQuery(req, res, query_popular_product);
    executeDBQuery(req, res, query_cart);
    executeDBQuery(req, res, query_cart_product);

    executeDBQuery(req, res, query_order);
    executeDBQuery(req, res, query_order_product_purchased);
    executeDBQuery(req, res, query_payment_master);
    executeDBQuery(req, res, query_payment_account);
    executeDBQuery(req, res, query_wallet);
    executeDBQuery(req, res, query_offer);
    executeDBQuery(req, res, query_coupon);
    executeDBQuery(req, res, query_notification);

    //-------------Delivery Module Start Here----------------
    
    // executeDBQuery(req, res, query_deliv_user);
    // executeDBQuery(req, res, query_deliv_address);
    // executeDBQuery(req, res, query_deliv_order);
    // executeDBQuery(req, res, query_deliv_order_purchased);
    // executeDBQuery(req, res, query_deliv_track);
    // executeDBQuery(req, res, query_deliv_manager);
    // executeDBQuery(req, res, query_deliv_report);
    // const query = "CREATE TABLE `tbl_customers` (" +
    //     "`id` int(11) NOT NULL AUTO_INCREMENT," +
    //     "`name` varchar(100) NOT NULL," +
    //     "`mobile` varchar(20) NOT NULL," +
    //     "`email` varchar(50) NOT NULL," +
    //     "`password` varchar(255) NOT NULL," +
    //     "`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
    //     "`updated_at` timestamp NOT NULL," +
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