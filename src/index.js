const app = require("express")()

const getNameSurnameRoute = require("./routes/getNameSurname")
app.use("/getNameSurname", getNameSurnameRoute)

const getProfilePhotoRoute = require("./routes/getProfilePhoto")
app.use("/getProfilePhoto", getProfilePhotoRoute)

const getUsernameRoute = require("./routes/getUsername")
app.use("/getUsername", getUsernameRoute)

const putNameSurnameRoute = require("./routes/putNameSurname")
app.use("/putNameSurname", putNameSurnameRoute)

const putProfilePhotoRoute = require("./routes/putProfilePhoto")
app.use("/putProfilePhoto", putProfilePhotoRoute)

const putUsernameRoute = require("./routes/putUsername")
app.use("/putUsername", putUsernameRoute)
