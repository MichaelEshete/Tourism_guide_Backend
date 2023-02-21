const mongoose= require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
    {
      userName: String,
      companyName: String,
      phoneNumber: String,
      email: String,
      password: String,
      cpassword: String,
      
      role: String,
      
    },
    {
        collection: "Users",

    }

);

mongoose.model("Users", UserDetailsScehma); 

const addItemsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    file: String,
    email: String
  },
  {
    collection: "addItems",
  }

);

mongoose.model("addItems", addItemsSchema);