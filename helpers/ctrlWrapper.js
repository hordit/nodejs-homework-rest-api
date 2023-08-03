const asyncHandler = require("express-async-handler");

const ctrlWrapper = (ctrl) => {
  const func = asyncHandler(async (req, res, next) => {
    await ctrl(req, res, next);
  });
  return func;
};

module.exports = ctrlWrapper;

// const ctrlWrapper = (ctrl) => {
//   const func = async (req, res, next) => {
//     try {
//       await ctrl(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
//   return func;
// };
