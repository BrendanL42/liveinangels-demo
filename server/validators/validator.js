const { body, validationResult } = require('express-validator');


exports.userSignupValidator = () => {
  return [
  body('fName', ' First name is required').notEmpty(),
  body('lName', ' Last name is required').notEmpty(),
  
  // email is not null, valid and normalized
  body('email', 'Email must be between 3 to 32 characters')
      .matches(/.+\@.+\..+/)
      .withMessage('Email must contain @')
      .isLength({
          min: 4,
          max: 2000
      }),
  // check for password
  body('password', 'Password is required').notEmpty().isLength({ min: 6 }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
]
};


//check for errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ message: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


