

//load express function

const exp=require("express");

//create express object
const app=exp();
//import mongo client

const mc=require("mongodb").MongoClient;
var dbo;



// create path
const path=require("path");
app.use(exp.static(path.join(__dirname,`./dist/project/`)))

//mongodb url
const dbUrl="mongodb://monish:monish@cluster0-shard-00-00-w1fdy.mongodb.net:27017,cluster0-shard-00-01-w1fdy.mongodb.net:27017,cluster0-shard-00-02-w1fdy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

//connect to database using url
mc.connect (dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error)
    {
        console.log("err in db connection",error);
    }
    else{
        //get db object from client
       dbo=client.db("serverdb");
       console.log("connected to db");
    }
});


app.use(exp.json());
//send mail
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'm.monish3690@gmail.com',
        pass: 'prabhas2442@',
    },
});

app.post('/save',(request,response)=>
{
//receive body of ref obj
   console.log(request.body);
//check in collection whether emp with received eno existed (or) not
dbo.collection("sercol").find({year:request.body.year,branchname:request.body.branchname}).toArray((error,data)=>{
    if(error){
        console.log("err in finding",error)
    }
    else if(data.length===0){
        dbo.collection("sercol").insert(request.body,
            (error,success)=>{
                if(error)
                {
                    console.log("err in insert",error);
                }
              else {
                  response.send({message:"success"})
              }
                    
                
            })
    }
    else{
        response.send({message:"id generated already"})
    }
})
  
                                 });


   //get request
   app.get('/learn',(request,response)=>{

    dbo.collection("sercol").find().toArray((error,dataArray)=>{
        if(error)
        {
            console.log("err in reading")
        }
        else if(dataArray==null)
        {
            response.send({message:"No data found"})
        }
        else{
            response.send({message:dataArray})
        }
    })
   })                              



                    //   app.post('/reg',(request,response)=>
                    //  {
                    //         //receive body of ref obj
                    //           console.log(request.body);
                    //         //check in collection whether emp with received eno existed (or) not
                    //         dbo.collection("register").insert(request.body,
                    //                  (error,success)=>{
                    //                  if(error)
                    //                 {
                    //                    console.log("err in insert",error);
                    //                  }
                    //                  else {
                    //                    response.send({message:"success"})
                    //                     }
                                                                           
                                                                       
                    //                     })  
                    //                     });



                    //register student handler (post)

app.use(exp.json());
app.post('/reg',(request,response)=>{
    console.log(request.body);
   
 dbo.collection("sercol").find({year:request.body.year,branchname:request.body.department}).toArray((error,res)=>{
    console.log(res[0]);
    let result=res[0]
    console.log(result);
    let length=res.length;
    if(error){
         console.log("error in finding",error)
     }
     else if(length===0)
     {
        response.send({message:"generateid first"})
     }
     else{
        year=JSON.stringify(result.year);
        yearcode=year.split("");
        //console.log(year);
        console.log(result.branchname)
        branch=result.branchname;
        //console.log(branchname);
        ye=yearcode[2]+yearcode[3];
        
        id=(ye+branch+result.branchcode)
        console.log("id is",id);
        let ct=++result.count;
         if(result.count<=9){
            request.body.studentid=id+"00"+ct;
            request.body.password=id+"00"+ct
            console.log(request.body.studentid);
            console.log(request.body.password);
         }
         else if(result.count<=99)
         {
            request.body.studentid=id+"0"+ct ;
            request.body.password=id+"0"+ct
            console.log(request.body.studentid);
            console.log(request.body.password);
         }
         else{
            request.body.studentid=id+ct
            request.body.password=id+ct
            console.log(request.body.studentid);
            console.log(request.body.password);
            
            
         }
         dbo.collection("register").insertOne(request.body,(error,success)=>{
             console.log(request.body);
            if(error){
                console.log("error in insert",error)
            }
            else{
                dbo.collection("sercol").updateOne({year:request.body.year,branchname:request.body.department},
                    {$set:{count:ct}},(error,suc)=>{
                        if(error){
                            console.log("error in update",error);
                            
                        }
                        else{
                            //send mail to 
                            const mailOptions = {
                                from: 'm.monish3690@gmail.com',
                                to: `email:${request.body.email}`,
                                subject: 'studentid and password',
                                text: `studentid and password : ${request.body.studentid}`
                            };
                            transport.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                }
                                console.log(`Message sent: ${info.response}`);
                                response.send({message:"success"})
                            });
                           
                        }
                    })
               
            }
        }) 
     }
 })


   
})

                                                                  
                                
//write req handlers
app.get('/readAll/:department',(request,response)=>{

    //read data from collection and convert to array
    dbo.collection("register").find({department:request.params.department}).toArray((error,dataArray)=>{
             if(error)
             {
                 console.log("err in reading",error);
             }
             //if array is empty
             else if(dataArray==null)
             {
                 response.send({message:"No data found"})
             }
             //if array is not empty
             else{
                 response.send({message:dataArray})
             }
    })
    
       });

       
           //HTTP PUT request handler
app.put('/update',(request,response)=>{
    console.log("data is",request.body);
 
    //update emp obj
    dbo.collection("register").updateOne(
                 {phone:request.body.phone},
                {$set:{
                    first:request.body.first,
                    second:request.body.second,
                    G:request.body.G,
                    // phone:request.body.phone,
                    email:request.body.email,
                    department:request.body.department,
                    address:request.body.address,
                    year:request.body.year,
                    ssc:request.body.ssc,
                    inter:request.body.inter,
               }
               },(error,success)=>{
                   if(error)
                   {
                       console.log("err in update",error);
                   }
                   else{
                       response.send({message:"success"})
                   }
               })
 });

 //delete request
 app.delete('/remove/:phone',(request,response)=>{
     console.log(request.params);
     let stno=(+request.params.phone);

 dbo.collection("register").deleteOne({phone:stno},
                             (error,success)=>{
                          if(error)
                          {
                              console.log("err in deleting")
                          }        
                          else{
                              response.send({message:"success"})
                          }
                             })
 })

     

//read by year

 //write req handlers
app.post('/readbyyear',(request,response)=>{
    console.log(request.body);
    var yr=(+request.body.year);
    //read data from collection and convert to array
    dbo.collection("register").find({year:yr,department:request.body.department}).toArray((error,dataArray)=>{
             if(error)
             {
                 console.log("err in reading",error);
             }
             //if array is empty
             else if(dataArray===null)
             {
                 response.send({message:"No data found"})
             }
             //if array is not empty
             else{
                 response.send({message:dataArray})
             }
    })
    
       });
                   
       


    
//import require modules
const multer = require('multer');
const xlsxtojson=require("xlsx-to-json-lc");
const xlstojson=require("xls-to-json-lc");
//multers disk storage settings
var storage = multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, './attendencesheet/')
 },
 filename: function (req, file, cb) {
 var datetimestamp = Date.now();
 cb(null, `${new Date().getTime()}_${file.originalname}`)
 }
});
// upload middleware
const upload = multer({ storage: storage});
// convert excel to json route
app.post("/uploadattendence",upload.single('attendence'),(req,res)=>{
 if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
 exceltojson = xlsxtojson;
 } else {
 exceltojson = xlstojson;
 }
 try {
 exceltojson({
 input: req.file.path, //the same path where we uploaded our file
 output: null, //since we don't need output.json
 lowerCaseHeaders:true
 }, function(err,result){
 if(err) {
 return res.json({error_code:1,err_desc:err, data: null});
 }
 dbo.collection("attendence").insertMany(result, (err, data) => {
 console.log(data);
 res.json({error_code:0,err_desc:null, data:
data["ops"],"message":"Attendence Sheet uploaded successfully"});
 });

 });
 } catch (e){
 res.json({error_code:1,err_desc:"Corupted excel file"});
 }
 });

//write req handlers
app.get('/readattendence/',(request,response)=>{

    //read data from collection and convert to array
    dbo.collection("attendence").find().toArray((error,dataArray)=>{
             if(error)
             {
                 console.log("err in reading",error);
             }
             //if array is empty
             else if(dataArray==null)
             {
                 response.send({message:"No data found"})
             }
             //if array is not empty
             else{
                 response.send({message:dataArray})
             }
    })
    
       });

       
 //login
 app.post('/login',(request,response)=>{
     console.log(request.body);
     //read object
     dbo.collection("register").findOne({studentid:request.body.id},(error,stuobj)=>{
         if(error)
         {
             console.log("err in finding",error);

         }
         else if(stuobj==null)
         {
             response.send({message:"invalid-studentid"})
         }
         else{

             if(request.body.password==stuobj.password){
                 console.log(stuobj);
                 response.send({message:"successful-login",name:stuobj})
             }
         }

     })
 })
           
 //to read student attendence logged in
 app.get('/loggedinstudentattendence/:studentid',(request,response)=>{
     console.log(request.params.studentid);
     dbo.collection("attendence").find({studentid:request.params.studentid}).toArray((error,data)=>{
         if(error)
         {
             console.log("err in reading")
         }
         else if(data===null)
         {
             response.send("no data found with the given student id")
         }
         else{
             console.log(data);
             response.send({message:data})
         }
     })
 })
 

    

//multers disk storage settings
var storage1 = multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, './markssheet/')
 },
 filename: function (req, file, cb) {
 var datetimestamp = Date.now();
 cb(null, `${new Date().getTime()}_${file.originalname}`)
 }
});
// upload middleware
const upload1 = multer({ storage: storage1});
// convert excel to json route
app.post("/uploadmarks",upload1.single('marks'),(req,res)=>{
 if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
 exceltojson = xlsxtojson;
 } else {
 exceltojson = xlstojson;
 }
 try {
 exceltojson({
 input: req.file.path, //the same path where we uploaded our file
 output: null, //since we don't need output.json
 lowerCaseHeaders:true
 }, function(err,result){
 if(err) {
 return res.json({error_code:1,err_desc:err, data: null});
 }
 dbo.collection("marks").insertMany(result, (err, data) => {
 console.log(data);
 res.json({error_code:0,err_desc:null, data:
data["ops"],"message":"marks Sheet uploaded successfully"});
 });

 });
 } catch (e){
 res.json({error_code:1,err_desc:"Corupted excel file"});
 }
 });


 
//write req handlers
app.get('/readmarks/',(request,response)=>{

    //read data from collection and convert to array
    dbo.collection("marks").find().toArray((error,dataArray)=>{
             if(error)
             {
                 console.log("err in reading",error);
             }
             //if array is empty
             else if(dataArray==null)
             {
                 response.send({message:"No data found"})
             }
             //if array is not empty
             else{
                 response.send({message:dataArray})
             }
    })
    
       });

        //to read student attendence logged in
 app.get('/loggedinstudentmarks/:studentid',(request,response)=>{
    console.log(request.params.studentid);
    dbo.collection("marks").find({studentid:request.params.studentid}).toArray((error,data)=>{
        if(error)
        {
            console.log("err in reading")
        }
        else if(data===null)
        {
            response.send("no data found with the given student id")
        }
        else{
            console.log(data);
            response.send({message:data})
        }
    })
})





 // 
 const port=4000;
 app.listen(process.env.PORT || port,()=>{
console.log(`server listening on ${port}`)})
