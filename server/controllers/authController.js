const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Generate verification token

    const user = await User.create({

      name,
      email,
      password: hashPassword,
      role

    });

    const verifyURL =
      `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

    res.status(201).json({

      message: "Registration successful. Please verify your email."

    });

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

//Login

exports.login=async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(
!user ||
!(await bcrypt.compare(password,user.password))
){

return res.status(401).json({
message:"Invalid Credentials"
});
}

const token=jwt.sign({

id:user._id,
role:user.role

},
process.env.JWT_SECRET,
{
expiresIn:"7d"
});

res.json({
token,
user
});

}
catch(err){

res.status(500).json(err);
}

};

exports.testEmail = async (req, res) => {

  try {

    await sendEmail(
      "sayan99075@gmail.com",
      "Placement Management System",
      "Congratulations! Email is working successfully."
    );

    res.json({
      message: "Email Sent Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;

    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    await sendEmail(
      user.email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    res.json({
      message: "OTP sent successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

exports.verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    if (user.resetOTP !== otp) {

      return res.status(400).json({
        message: "Invalid OTP"
      });

    }

    if (user.otpExpiry < Date.now()) {

      return res.status(400).json({
        message: "OTP Expired"
      });

    }

    res.json({
      message: "OTP Verified Successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetOTP = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.json({
      message: "Password Reset Successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};