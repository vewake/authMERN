import Joi from "joi";

export const signupMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required()
  });

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400)
      .json({ message: "bad request", error })
  }
  next();
}

export const loginMiddleware = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400)
      .json({ message: "bad request", error })
  }
  next();
}

//export default {signupVal, loginVal};


