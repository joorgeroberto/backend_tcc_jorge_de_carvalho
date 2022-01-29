import { Router } from "express";
import AthletesController from "../controllers/AthletesController";
import { celebrate, Joi, Segments } from 'celebrate';

const athleteRouter = Router();
const athletesController = new AthletesController();

athleteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      user_type: Joi.number().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.number().required(),
      birthdate: Joi.string().required(),
      gender: Joi.string().required(),
    },
  }),
  athletesController.create
);

athleteRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  athletesController.delete,
);

export default athleteRouter;
