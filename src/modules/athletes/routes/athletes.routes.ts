import { Router } from 'express';
import AthletesController from '../controllers/AthletesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAutheticated from '@shared/http/middlewares/isAutheticated';

const athleteRouter = Router();
const athletesController = new AthletesController();

athleteRouter.get('/', isAutheticated, athletesController.index);

athleteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      user_type: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      birthdate: Joi.string().required(),
      gender: Joi.string().required(),
      group_id: Joi.string(),

      group_name: Joi.string(),
      athletes_quantity: Joi.number(),
      sport_name: Joi.string(),
    },
  }),
  athletesController.create,
);

athleteRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      // name: Joi.string().required(),
      // password: Joi.string().required(),
      // email: Joi.string().required(),
      // phone: Joi.string().required(),
      // birthdate: Joi.string().required(),
      // gender: Joi.string().required(),
      group_id: Joi.string(),
    },
  }),
  athletesController.update,
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
