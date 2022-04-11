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
      user_type: Joi.number().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      birthdate: Joi.string().required(),
      gender: Joi.string().required(),
    },
  }),
  athletesController.create,
);

athleteRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      birthdate: Joi.string().required(),
      gender: Joi.string().required(),
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
