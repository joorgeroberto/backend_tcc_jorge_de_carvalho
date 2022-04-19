import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ExerciseController from '../controllers/ExerciseController';
import isAutheticated from '@shared/http/middlewares/isAutheticated';

const exerciseRouter = Router();
const exerciseController = new ExerciseController();

exerciseRouter.get('/', isAutheticated, exerciseController.index);

exerciseRouter.delete(
  '/:id',
  isAutheticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  exerciseController.delete,
);

export default exerciseRouter;
