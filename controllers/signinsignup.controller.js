const { generate_token } = require("../utilities/jwt_token");
const { sendMailTo } = require("../utilities/nodeMailer");
const SignupModel = require("../models/signup.model");

exports.signupController = (req, res, next) => {
  SignupModel(req.body).save(async (err, result) => {
    if (err) {
      next(new Error("Data not saved"));
    }
    //  ----------------------------
    const verifyAccount = generate_token(result._id, `${60 * 15}s`);
    const emailLink = `http://localhost:1616/verify-account?token=${verifyAccount}`;
    //  Send email
    const emailStatus = await sendMailTo(
      ["sikhakumarijsr01@gmail.com"],
      emailLink
    );
    // ---------------------------------
    res.status(200).send({ result, emailStatus });
  });
};

exports.verifyAccountController = (req, res, next) => {

  const { data = "" } = req.body.token;
  // -----------------------------------------
  SignupModel.findOne({ _id: data }, async (err, result) => {
    if (err) {
      next(err);
    } else if (result) {
      const updateAccount = await SignupModel.findByIdAndUpdate(
        { _id: data },
        { is_Verified: 1 }
      );
      res.send({ status: "Account Verified", updateAccount });
    } else {
      res.send({ status: "Invalid Url" });
    }
  });
  // ------------------------------------------
};

exports.signinController = (req, res, next) => {
  // updated_on set in signup schema
  const token = generate_token(req.body?.userInfo);
  res.send({ userInfo: req.body.userInfo, token });
};
