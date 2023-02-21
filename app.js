const express = require("express");
const app = express();
const mongoose=require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt=require("bcryptjs");
const Post = require("./model/post.model.js")
const jwt=require("jsonwebtoken");

const JWT_SECRET="nhjndshnbhsiduy78q3ye3yhrewhriewopfew[fpe-fpe-pf[df[s;f[ds;f[ds;f[ds;f[ds;,fld,s.mdnshbgvcarfdtwygyqgygdhsabjbcnvgawqrr6t8siahjdvdgvds()!@#$%^&*";


mongoose.set('strictQuery', true);



const mongoUrl = "mongodb+srv://root:root@objid.y1p0anh.mongodb.net/?retryWrites=true&w=majority";
mongoose  
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));


require("./userDetails");


const User = mongoose.model("Users");
const addItems = mongoose.model("addItems");





app.get('/', (req, res) => {
  try{
      Post.find({}).then(data => {
          res.json(data)
      }).catch(error => {
          res.status(408).json({ error })
      })
  }catch(error){
      res.json({error})
  }
})


app.post("/uploads", async (req, res) => {
  console.log("we are in upload");
  const body = req.body;
  try{
      const newImage = await  Post.create(body)
      newImage.save();
      res.status(201).json({ msg : "New image uploaded...!"})
  }catch(error){
      res.status(409).json({ message : error.message })
      console.log(error);
  }
})
app.get("/img", (req, res) => {
  console.log("we are fetching the images");
  Post.find((err, docs) => {
    if (!err) {
        res.render("post", {
            data: docs
        });
    } else {
        console.log('Failed to retrieve the Course List: ' + err);
    }
});

})


app.get("/user", async (req, res) => {
  // const { email, password } = req.body;
  // console.log(password);

  const email="mikyeshete@gmail.com";

  const user = await User.findOne( { email } );
  console.log(user.password);
  const role=user.role;
  const UserName = user.userName;
  return res.json({ status: "ok", role ,UserName });

})



app.post("/register", async (req, res) => {
    const { userName,companyName,phoneNumber,email,password,cpassword } = req.body;
    const role= "user";

    const encreptedPassword =await bcrypt.hash(password, 10);
    
    console.log("hello");

    try {
      await User.create({
        userName,
        companyName, 
        phoneNumber,
        email,
        password: encreptedPassword,

        role,
       } );
        res.send({ status: "ok" });
        console.log("success");

        
    } catch (error) {
        res.send({status: "error" });
        console.log(error);
        
    } 
});
app.post("/addItems", async (req, res) => {
  const { tit, disc, postImage, email } = req.body;
  const role= "user";

  // const encreptedPassword =await bcrypt.hash(password, 10);
  console.log(req.files)
  console.log(disc);
  const description=disc;
  const  title =tit;
  const file =  postImage;
  try {
    await addItems.create({
      title,
     description,
     file,
     email
       } );
      res.send({ status: "ok" });
      console.log("success");

      
  } catch (error) {
      res.send({status: "error" });
      console.log(error);
      
  } 
});

app.post("/Profile", async(req,res)=>{
  console.log("items");
  const email = req.body.email
  addItems.find({ email })
  .then(data => {
      res.status(200).send(data);
  })
  .catch (console.error)
})


app.get("/list", async(req, res) => {
  try {
    addItems.find((err, data) => {
      if (err) {
        res.status(500).send({ message: error.message })
      } else {
        res.status(200).send(data)
      }
    })

  } catch(e) {
    console.log(e.message)
  }
})
  
app.post("/register1", async (req, res) => {
  const { userName,companyName,phoneNumber,email,password,cpassword } = req.body;
  const role= "admin";
    console.log("hello");
    const encreptedPassword =await bcrypt.hash(password, 10);
    try {
        await User.create({
          userName,
          companyName, 
          phoneNumber,
          email,
        password: encreptedPassword,
            role,
        });
        res.send({ status: "ok" });
        console.log("success");

        
    } catch (error) {
        res.send({status: "error" });
        console.log("error");
        
    } 
});



app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      const role= user.role;
      console.log(role);
      return res.json({ status: "ok", role ,data: token, email});
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});




  
  app.post("/login-user1", async (req, res) => {
    const { email, password } = req.body;
    console.log(password);
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password,user.password)) {
      const token =jwt.sign({}, JWT_SECRET);
        if (res.status(201)) {
            const role=user.role;
            console.log(role + "roleeeee");
            if(role =="admin"){
        return res.json({ status: "ok", role: "admin", data: token });
            }if(role =="user"){
                return res.json({ status: "ok", role: "user", data: token });
                    }
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  });

app.listen(5000, () => {
    console.log("Server Started");
  });