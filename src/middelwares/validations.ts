/* eslint-disable import/no-extraneous-dependencies */
import { body } from 'express-validator';

const checkEmail = body('email')
  .isString()
  .isEmail()
  .withMessage('Email is not an email')
  .normalizeEmail()
  .trim()
  .exists({ checkFalsy: true })
  .withMessage('Email is required')
  .isLength({ min: 5, max: 100 })
  .withMessage('Email: must be at least 100 chars long & maximum 100 chars');

const checkUserName = body('username')
  .isString()
  .exists({ checkFalsy: true })
  .withMessage('Username is required')
  .trim()
  .isLength({ min: 5, max: 30 })
  .withMessage('Username: must be at least 3 chars long & maximum 30 chars');

const checkPassowrd = body('password')
  .exists({ checkFalsy: true })
  .withMessage('Password is required')
  .trim()
  .isLength({ min: 8, max: 1024 })
  .withMessage('Password: must be at least 8 chars longs');

const fullName = body('fullName')
  .isString()
  .exists({ checkFalsy: true })
  .withMessage('Full-name is required')
  .isLength({ min: 3, max: 30 })
  .withMessage('Full-name: must be at least 3 chars long & maximum 30 chars');

export const validations = {
  checkEmail,
  checkUserName,
  checkPassowrd,
  fullName,
};
