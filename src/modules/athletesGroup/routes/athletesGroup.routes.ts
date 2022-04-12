import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AthletesGroupController from '../controllers/AthletesGroupController';

const athletesGroupRouter = Router();
const athletesGroupController = new AthletesGroupController();

athletesGroupRouter.get('/', athletesGroupController.index);

athletesGroupRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      group_name: Joi.string().required(),
      athletes_quantity: Joi.number().required(),
      sport_name: Joi.string(),
    },
  }),
  athletesGroupController.create,
);

athletesGroupRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  athletesGroupController.delete,
);

export default athletesGroupRouter;
