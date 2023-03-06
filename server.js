const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const { request, response } = require("express");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get("/restaurants/:id", async (request, response)=> {
    let data = await Restaurant.findByPk(request.params.id);
    response.json(data);
})
//GET all stores
app.get("/restaurants", async(request, response)=>{
    let data = await Restaurant.findAll();
    response.json(data);
})

app.use(express.json());

//create new store
app.post("/addStore", async(request, response)=>{
    const newStore = request.body;
    await Restaurant.create({
        name: newStore.name,
        location: newStore.location,
        cuisine: newStore.cuisine
    })
    let data = await Restaurant.findAll();
    response.json(data);
})
//update store
app.put("/updateStore/:id", async(request, response)=>{
    let primaryKey = request.params.id;
    const updatedInfo = request.body;

    Restaurant.update({
        name: updatedInfo.name,
        location: updatedInfo.location,
        cuisine: updatedInfo.cuisine},{
        where : {id : primaryKey}
    }
    )
})

//delete store
app.delete("/deleteStore/:id", async(request, response)=>{
    let primaryKey = request.params.id;
    await Restaurant.destroy({
        where: {id: primaryKey}
    });
})



app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})