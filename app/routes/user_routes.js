var ObjectID = require('mongodb').ObjectID;
const collectionName = "users";
module.exports = function(app,db){

    app.get('/user/:id', (req,res) => {
        const details = { '_id' : new ObjectID(req.params.id)};
        db.collection(collectionName).findOne(details,(err,item) => {
            if(err){
                res.send({'error':'An error has Occurred'});
            }else{
                res.status(201).send(item);
            }
        });
    });

    app.post('/user',(req,res) => {
        const user = { name: req.body.name, pass: req.body.pass};
        db.collection(collectionName).insert(user,(err,result) => {
            if(err){
                res.send({'error' : 'An error Occurred'});
            }else{
                res.status(201).send(result.ops[0]);
            }
        });
    });

    app.delete('/user/:id' ,(req,res) => {
        const details = { '_id' : new ObjectID(req.params.id)};
        db.collection(collectionName).remove(details, (err,item) => {
            if(err){
                res.send({'error':'An error has occurred'});
            }else{
                res.status(201).send('User ' + req.params.id + ' deleted');
            }
        });
    });

    app.put('/user/:id', (req,res) => {
        const details = { '_id' : new ObjectID(req.params.id)};
        const newDetails = { name : req.body.name, pass : req.body.pass};
        db.collection(collectionName).update(details,newDetails, (err,item) => {
            if(err){
                res.send({'error' : 'Some Error Occurred'});
            }else{
                res.status(201).send(newDetails);
            }
        });
    });
};