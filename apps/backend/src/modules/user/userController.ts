import { Request, Response } from 'express';
import UserService from '../../services/userService';
import responseHandler from '../../helpers/responseHandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import filtersHandler from '../../helpers/filtersHandler';
import { messages, msgCode } from '../../helpers/sharedCodesMessages';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { fullName } = req.body;
  const userData = { fullName };
  const finded = await UserService.getUserByName(fullName);
  if (!finded.fullName) {
    const result = await UserService.createUser(userData);
    return result.error
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: result.error,
          msgCode: msgCode.addDataError,
          message:messages.addDataError ,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: result,
          msgCode: msgCode.dataRetrievalSuccess,
          message:messages.dataRetrievalSuccess ,
          success: true,
        })
      );
  } else {
    return res.status(httpStatusCodes.OK).json(
      responseHandler({
        success: true,
        data: finded,
        msgCode: msgCode.dataRetrievalSuccess,
        message:messages.dataRetrievalSuccess ,
      })
    );
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  const populate = '';
  const { limit, offset } = req.params;
  const { filters, sort, select } = filtersHandler(req.query);
  const { error, list, counts } = await UserService.getUsers(
    populate,
    filters,
    parseInt(limit),
    parseInt(offset),
    sort,
    select
  );
  return error
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: {},
          msgCode: msgCode.dataRetrievalError,
          message:messages.dataRetrievalError ,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: { users: list, counts },
          msgCode: msgCode.dataRetrievalSuccess,
          message:messages.dataRetrievalSuccess ,
          success: true,
        })
      );
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  const user = req.params.id;
  const findedUser = await UserService.getUserById(user);
  return findedUser
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: {},
          msgCode: msgCode.dataRetrievalError,
          message:messages.dataRetrievalError ,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: { ...findedUser },
          msgCode: msgCode.dataRetrievalSuccess,
          message:messages.dataRetrievalSuccess ,
          success: true,
        })
      );
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  const user = req.params.id;
  const updateData = req.body;
  const updatedUser = await UserService.updateUser(user, updateData);
  return updatedUser
  ? res.status(httpStatusCodes.BAD_REQUEST).json(
      responseHandler({
        success: false,
        data: undefined,
        msgCode: msgCode.dataRetrievalError,
        message:messages.dataRetrievalError ,
      })
    )
  : res.status(httpStatusCodes.OK).json(
      responseHandler({
        data: { ...updatedUser },
        msgCode: msgCode.dataRetrievalSuccess,
        message:messages.dataRetrievalSuccess ,
        success: true,
      })
    );
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const user = req.params.id;
  const result = await UserService.deleteUser(user);
  return result
  ? res.status(httpStatusCodes.BAD_REQUEST).json(
      responseHandler({
        success: false,
        data: undefined,
        msgCode: msgCode.dataDeletedSuccess,
        message:messages.dataDeletedSuccess ,
      })
    )
  : res.status(httpStatusCodes.OK).json(
      responseHandler({
        data: { ...result },
        msgCode: msgCode.dataAlredyDeletedError,
        message:messages.dataAlredyDeletedError ,
        success: true,
      })
    );
};
