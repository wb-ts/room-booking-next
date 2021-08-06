import { cloudinaryConfig } from "@config/configIndex";
import cloudinary from "cloudinary";
import { catchAsyncErrors } from "@middlewares/middlewaresIndex";
import { User } from "@models/modelsIndex";
import { ErrorHandler, sendEmail } from "@utils/utilsIndex";
import absoluteUrl from "next-absolute-url";
import crypto from "crypto";

cloudinaryConfig();

//Register User => api/v1/user/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const result = await cloudinary.v2.uploader.upload(avatar, {
    folder: "mybnb/avatar",
    width: "150",
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({ success: true });
});

//Current User => api/me

export const currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return next(new ErrorHandler(`User doesn't exist`, 404));
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Profile => api/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user_id);
  const user = await User.findById(req.user._id);
  const { name, email, password, avatar } = req.body;

  if (!user) return next(new ErrorHandler("User Not Found", 404));
  if (user) {
    user.name = name;
    user.email = email;

    if (password) user.password = password;
  }

  if (avatar !== "") {
    const result = await cloudinary.v2.uploader.upload(avatar, {
      folder: "mybnb/avatar",
      width: "150",
      crop: "scale",
    });
    await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
    user.avatar = { public_id: result.public_id, url: result.secure_url };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

//Forgot Password => api/v1/password/forgot

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("Invalid email, Try again", 404));

  //Get Reset Token
  const resetToken = await user.getPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //get origin
  const { origin } = absoluteUrl(req);

  //Create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Click on link below to your reset your password:\n\n
  ${resetUrl}\n\n
  Ignore if already done.\n\n
  Not requested by you? Report it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "mybnb Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password => /api/v1/password/rest/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  console.log(req.query.token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler("Password reset token is invalid or expired", 400)
    );

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return next(new ErrorHandler(`Password doesn't match.`, 400));

  user.password = password;
  user.resetPasswordToken = user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});
