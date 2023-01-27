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


// const EdirrSchema = new mongoose.Schema(
//   {

     
//         NameOfeDirr:String, 
//         Location:String,
//         eDirrType:String,
//         Amount:String,
//         Rqdate:String,
//         PaymentDuration:String,
//         PaymentDay:String,
//         Description:String,


   
    
//   },
//   {
//       collection: "Edirs",

//   }

// );

// mongoose.model("Edirs", EdirrSchema);

const addItemsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    file: String,




  },
  {
    collection: "addItems",

  }

);

mongoose.model("addItems", addItemsSchema);