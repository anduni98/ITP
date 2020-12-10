var mongoUtil=require("../util/mongodbManager")

exports.addCartItem = function(req,res) {
    var userName = req.body.userName;
    var cartItem = req.body.cartItem;
    var unitPrice = req.body.unitPrice;
    var TotalPrice = req.body.TotalPrice;
    var Quantity = req.body.Quantity;
    var Image = req.body.Image;


    console.log("userName -" + userName);
    console.log("cartItem -" + cartItem);
    console.log("unitPrice -" + unitPrice);
    console.log("TotalPrice -" + TotalPrice);
    console.log("Quantity -" + Quantity);
    console.log("Image -" + Image);

    res.writeHead(200, {"Content-Type": "application/json"})
    var result = {result: true};
    res.write(JSON.stringify(result));
    res.end();
}

exports.getCartItems = function(req,res) {
    console.log("getCartItems");
    console.log(req.query.userName);

    if(!req.query.userName || req.query.userName==""){
        res.writeHead(400,{"Content-Type":"application/json"})
        var result={result:false,error:"Required parameter userName not found"};
        res.write(JSON.stringify(result));
        res.end();
        return;
    }

    mongoUtil.getDocuments({"userName":req.query.userName},"CartItems",function (docs,error) {
        if(docs){
            mongoUtil.getDocuments({},"Discounts",function (discountDocs,discountError) {
                if(discountDocs){
                    console.log("200");

                    res.writeHead(200,{"Content-Type":"application/json"})
                    var result={result:true,items:docs,discountDocs:discountDocs};
                    res.write(JSON.stringify(result));
                    res.end();
                }else{
                    console.log("500");

                    res.writeHead(500,{"Content-Type":"application/json"})
                    var result={result:false,error:discountError};
                    res.write(JSON.stringify(result));
                    res.end();
                }
            })

            // console.log("200");
            //
            // res.writeHead(200,{"Content-Type":"application/json"})
            // var result={result:true,items:docs};
            // res.write(JSON.stringify(result));
            // res.end();
        }else{
            console.log("500");

            res.writeHead(500,{"Content-Type":"application/json"})
            var result={result:false,error:error};
            res.write(JSON.stringify(result));
            res.end();
        }
    })
}

exports.getCartItemsInternal = function(userName,fn) {
    console.log("getCartItemsInternal");
    console.log(userName);

    if(!userName || userName==""){
        var error={result:false,error:"Required parameter userName not found"};

        return fn(null,error);
    }

    mongoUtil.getDocuments({"userName":req.query.userName},"CartItems",function (docs,error) {
        if(docs){
            console.log("200");
            var result={result:true,items:docs};
            fn(result,null);
        }else{
            console.log("500");
            var error1={result:false,error:error};
            fn(null,error1);

        }
    })
}

exports.removeItem = function(req,res) {
    var userName = req.body.userName;
    var itemId = req.body.itemId;
    var collection = "CartItems";

    if(userName&&itemId){
        var query={"itemId":itemId,"userName":userName};

        mongoUtil.removeItem(query,collection,function (docs,error) {
            if(docs){
                console.log("200");

                res.writeHead(200,{"Content-Type":"application/json"})
                var result={result:true,removedItems:docs};
                res.write(JSON.stringify(result));
                res.end();
            }else{
                console.log("500");

                res.writeHead(500,{"Content-Type":"application/json"})
                var result={result:false,error:error};
                res.write(JSON.stringify(result));
                res.end();
            }
        });
    }else{
        res.writeHead(400,{"Content-Type":"application/json"})
        var result={result:false,error:"Required parameters userName or itemId not found"};
        res.write(JSON.stringify(result));
        res.end();
        return;
    }

}

exports.updateCart = function(req,res) {
    var userName = req.body.userName;
    var itemId = req.body.itemId;
    var quantity = req.body.quantity;
    var collection = "CartItems";

    if(userName && itemId&& quantity) {
        var query={"itemId":itemId,"userName":userName};
        var fieldSelector = {"quantity" : quantity};

        //todo item quantity validation

        mongoUtil.updateCart(query,fieldSelector, collection, function ( error) {
            if (!error) {
                console.log("200");

                res.writeHead(200, {"Content-Type": "application/json"})
                var result = {result: true};
                res.write(JSON.stringify(result));
                res.end();
            } else {
                console.log("500");

                res.writeHead(500, {"Content-Type": "application/json"})
                var result = {result: false, error: error};
                res.write(JSON.stringify(result));
                res.end();
            }
        });

    }else{
        res.writeHead(400,{"Content-Type":"application/json"})
        var result={result:false,error:"Required parameters userName or itemId not found"};
        res.write(JSON.stringify(result));
        res.end();
        return;
    }

}

exports.calculateTotals = function(req,res) {
    this.data.totals = 0;
    this.data.items.forEach(item => {
        let unitPrice = item.price;
        let quantity = item.quantity;
        let totalPrice = unitPrice * quantity;

        this.data.totals += amount;
    });
    this.setFormattedTotals();
}

exports.setFormattedTotals = function(req,res) {
    let format = new Intl.NumberFormat(config.locale.lang, {style: 'currency', currency: config.locale.currency });
    let totals = this.data.totals;
    this.data.formattedTotals = format.format(totals);
}

exports.emptyCart = function(request) {
    this.data.items = [];
    this.data.totals = 0;
    this.data.formattedTotals = '';
    if(request.session) {
        request.session.cart.items = [];
        request.session.cart.totals = 0;
        request.session.cart.formattedTotals = '';
    }


}
