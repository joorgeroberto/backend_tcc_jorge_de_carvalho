import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PerformedTrainingController from '../controllers/PerformedTrainingController';
import isAutheticated from '@shared/http/middlewares/isAutheticated';

const performedTrainingRouter = Router();
const performedTrainingController = new PerformedTrainingController();

// planningRouter.get(
//   '/:id',
//   isAutheticated,
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   planningsController.index,
// );

performedTrainingRouter.post(
  '/',
  isAutheticated,
  celebrate({
    [Segments.BODY]: {
      calories: Joi.number().required(),
      duration: Joi.string().required(),
      distance: Joi.string().required(),
      vMed: Joi.number().required(),
      vMax: Joi.number().required(),
      fcRest: Joi.number().required(),
      fcMed: Joi.number().required(),
      fcMax: Joi.number().required(),
      trainingId: Joi.string().required(),
    },
  }),
  performedTrainingController.create,
);

// performedTrainingRouter.delete(
//   '/:id',
//   isAutheticated,
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   performedTrainingController.delete,
// );

export default performedTrainingRouter;
