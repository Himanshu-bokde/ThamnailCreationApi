const express = require('express');
const route = require('./src/routes')
const cors = require('cors');
const app = express()

const PORT = process.env.PORT ;
// app.get('/',(req,res,next)=>{
//     res.send("Hello Backend is running")
// })



const allowedOrigins = [
  "http://3.111.35.229:3000",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function(origin, callback) {
    console.log("Incoming Origin:", origin);

    // Allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Instead of throwing, return a proper 403 response
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};


// app.use(express.json());

app.use(cors({
  origin: "http://3.111.35.229:3000",
  credentials: true
}));


route(app)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
