const express = require('express');
const route = require('./src/routes')
const cors = require('cors');
const app = express()

const PORT = process.env.PORT ;
// app.get('/',(req,res,next)=>{
//     res.send("Hello Backend is running")
// })



const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming Origin:", origin);

    // Allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Error-handling middleware for CORS and other errors
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  if (err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
});


app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

route(app)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
