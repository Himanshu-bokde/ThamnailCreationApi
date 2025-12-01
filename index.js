const express = require('express');
const route = require('./src/routes')
const cors = require('cors');
const app = express()

const PORT = process.env.PORT ;
// app.get('/',(req,res,next)=>{
//     res.send("Hello Backend is running")
// })



const allowedOrigins = [
  // "https://your-frontend-domain.com",
  "http://3.111.35.229:3000/",
  "http://localhost:5173"   // for local dev (optional)
];


const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,         // if using cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

route(app)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
