const app = require("express")()
const helmet = require("helmet")
const db = require("./config")
const port = 3000 || process.argv[2]
app.use(helmet())

/**
 * All Routes
 */
const getProfilePhotoRoute = require("./routes/getProfilePhoto")
app.use("/getProfilePhoto", getProfilePhotoRoute)

const getUserProfileRoute = require("./routes/getProfile")
app.use("/getProfile", getUserProfileRoute)

const putProfilePhotoRoute = require("./routes/putProfilePhoto")
app.use("/putProfilePhoto", putProfilePhotoRoute)

const putUsernameRoute = require("./routes/putUsername")
app.use("/putUsername", putUsernameRoute)

const registerRoute = require("./routes/register")
app.use("/register", registerRoute)

const putCustomsRoute = require("./routes/putCustoms")
app.use("/putCustoms", putCustomsRoute)

app.listen(port, () => {
  console.log(`API LISTENING ON ${port}`)
})
