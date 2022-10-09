const express = require("express")
const dotenv = require('dotenv');
const app = express()
const sideImageRoute = require('./routes/sideImage')
const landiaVerseRoute = require('./routes/landiaVerse')

const cors = require('cors')
const setSafeHeader =  require('./helpers/midlewares/safeHeader')

dotenv.config()

app.use(cors({origin: true}))
app.use(setSafeHeader)
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", landiaVerseRoute)
app.use('/v1', sideImageRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server runing at ${PORT}`))