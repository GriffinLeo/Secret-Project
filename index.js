//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";                  //1
import bodyParser from "body-parser";           //1
import { dirname } from "path";                 //1
import { fileURLToPath } from "url";            //1   
 

const __dirname = dirname(fileURLToPath(import.meta.url));  // Get the directory name of the current module             //1
const app = express();                                                                                                  //1
const port = 3000;                                                                                                      //1

let userIsAuthorized = false;    // Variable to keep track of user authentication status                                //2

app.use(bodyParser.urlencoded({extended:true}));   // Use body-parser middleware to parse URL-encoded data              //2


// Middleware for password checking                                                                                     //3
function passwordCheck(req,res,next){
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        userIsAuthorized = true;
    }
    next();
}

app.use(passwordCheck);                                                                                                 //3



app.get("/",(req,res)=>{                                                                                                //1                       
    res.sendFile(__dirname + "/public/index.html");       // Define the GET route for the home page
});

// Define the POST route for password submission
app.post("/check",(req,res) =>{                                                                                        //4
    if (userIsAuthorized){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});


app.listen(port,()=>{                                                                                           //1
    console.log(`Listening on port ${port}`);   // Start the server
});