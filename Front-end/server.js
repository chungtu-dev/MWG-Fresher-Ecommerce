const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const db = require('./db.json')

server.use(middlewares);


//Custom route
server.get('/cart/get', (req, res) => {
    const id = req.query['cartId']
    console.log(id)
    let result = db.cart.find(item=>{
        return item.id==id
    })
    if(result)
    {
        res.jsonp(result)
    }
    else{
        res.status(400).jsonp({
            error:"Wrong id"
        })
    }

})







server.use(router);
server.listen(port,()=>{
    console.log('Server is running on',port)
});

