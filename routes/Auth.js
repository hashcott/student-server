const { Router } = require("express");
const Joi = require("joi");
Router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.send(error.message);
  }
});

const validate = (user) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
module.exports = Router;
