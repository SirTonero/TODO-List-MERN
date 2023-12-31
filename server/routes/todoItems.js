const router = require("express").Router();

//import todo model

const todoItemsModel = require("../models/todoItems");

//lets create our first route -- we will add Todo Item to our database
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });
    //save this item in database
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//lets create second route--- to get data from the database
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

// lets update items
router.put("/api/item/:id", async (req, res) => {
  try {
    //find the item by id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item Updated");
  } catch (err) {
    res.json(err);
  }
});

// Lets delete item from the database 
router.delete('/api/item/:id', async (req, res)=>{
   try{
       //find the item by id and delete it
      const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id)
      res.status(200).json('Item Deleted')
   }catch(err){
      res.json(err)
   }
})





//export router
module.exports = router;
