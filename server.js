const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
const serverError = require('./middleware/serverError')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const api = require('./routes/userRoutes')
const app = express()
const courseRoutes = require('./routes/courseRoutes')



app.use(cors())
app.use(express.json());
app.use(morgan("common"))

//configure api from api route
app.use('/api', api)
app.use('/api/course', courseRoutes)

//Allow access to .env file
dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => {
  console.log("Connected to Mongo DB");
}
);


//Invalid Route Error Handler
app.use(notFound);

//Server Error Middleware Handler
app.use(serverError)

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})