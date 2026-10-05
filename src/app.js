import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';

const app = express()

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
));

app.use(express.json(
    {
        limit: "16kb",
    }
));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}))

app.use(express.static("public")); // to serve static files from public folder
app.use(cookieParser()); // to parse cookies from the request header and store them in req.cookies object
// whenever we want to configure something we will use app.use() method to configure the middleware. and we will use app.get() method to handle the get request. and we will use app.post() method to handle the post request. and we will use app.put() method to handle the put request. and we will use app.delete() method to handle the delete request. and we will use app.listen() method to start the server. and we will use app.on() method to handle the error event. and we will use app.emit() method to emit the error event. and we will use app.set() method to set the value of a variable. and we will use app.get() method to get the value of a variable. and we will use app.locals to store the variables that are available in all the routes. and we will use res.locals to store the variables that are available in the current route only.



// routes 



app.use("/api/v1/users" , userRouter) ; // this will now give the control to userrouter what to do  . /api/v1/users is standard practise to show the version of api 




// the url will look like https://localhost:3000/users/register
// and if we call anther controller like login then the url will look like https://localhost:3000/users/login


export default app;