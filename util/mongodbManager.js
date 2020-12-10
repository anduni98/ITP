var MongoClient = require("mongodb").MongoClient;
var dbClient;

exports.openConnection =function () {
    var connectionUrl="mongodb://localhost:27017/testdb";
    MongoClient.connect(connectionUrl,function (error,mongoClient) {
        if(error){
            console.log("DB Connection Error -"+JSON.stringify(error));
        }else{
            dbClient=mongoClient;
            dbClient=dbClient.db("testdb");
            console.log("Connected to DB");
        }
    })
}

exports.getDocuments = function (query,collection,fn) {
    dbClient.collection(collection,function (err,collectionEntry) {
        collectionEntry.find(query).toArray(function (err2,docs) {
            if(err){
                fn([],err)
            }else if(err2){
                fn([],err)
            }else{
                fn(docs);
            }

        })
    })

}
exports.removeItem = function (query,collection,fn) {
    dbClient.collection(collection, function (err, collectionEntry) {
        collectionEntry.remove(query, function (err, numberOfRemovedDocs) {
            if (err) {
                fn( null,new Error(err.message));
                return;
            }
            fn(numberOfRemovedDocs,null );
        });
    });
}

exports.updateCart = function (query,fieldSelector,collection,fn) {
    dbClient.collection(collection, function (err, collectionEntry) {
        collectionEntry.update(query,{$set: fieldSelector}, function (err, result) {
            if (err) {
                fn(err);
                return;
            }
            fn(null);
        });
    });
}
