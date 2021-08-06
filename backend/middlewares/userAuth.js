const { ErrorHandler } = require("@utils/utilsIndex");
const { getSession } = require("next-auth/client");
const { catchAsyncErrors } = require("./middlewaresIndex");

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) return next(new ErrorHandler("Login to get access.", 401));
  req.user = session.user;
  next();
});

//Users
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user.role);
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is forbidden from this resource access.`,
          403
        )
      );
    }

    next();
  };
};
