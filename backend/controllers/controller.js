import UserModel from '../models/bd.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import JWT_SECRET from '.env'
import { ensureAuth } from '../middlewares/jwtValid.js'

export const signupCont = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {  //if user exist
      return res.status(409)
        .json({ message: 'user already exist', success: false });
    }
    const usermodel = new UserModel({ name, email, password })

    usermodel.password = await bcrypt.hash(password, 10)
    await usermodel.save()

    res.status(201)
      .json({
        message: "signup sucessful",
        success: true,

      })
  }
  catch (err) {
    res.status(500)
      .json({
        message: "Internal server errror",
        success: false
      })
  }
}

export const loginCont = async (req, res) => {
  try {

    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(404)
        .json({
          message: "user does not exist",
          sucess: false
        })
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403)
        .json({ message: "password incorrect", success: false });
    }


    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
    )


    res.status(200).json({
      message: "login scuessfull",
      success: true,
      token: jwtToken
    })

  }
  catch (error) {
    // res.status(500)
    //     .json({
    //         message: "internal server error",
    //         success: false
    //     })

    console.log(error)
  }
}

//export default {signupCont, loginCont};
export default { loginCont, signupCont };
