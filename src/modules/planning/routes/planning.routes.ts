import { Router } from 'express';
import PlanningController from '../controllers/PlanningController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAutheticated from '@shared/http/middlewares/isAutheticated';

const planningRouter = Router();
const planningsController = new PlanningController();

planningRouter.get('/', isAutheticated, planningsController.index);

planningRouter.post(
  '/',
  isAutheticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      numberWeeks: Joi.number().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      athleteId: Joi.string().required(),
      trainings: Joi.array()
        .items(
          Joi.object({
            date: Joi.string().required(),
            isOptional: Joi.boolean().required(),
            exerciseGroups: Joi.array()
              .items(
                Joi.object({
                  numberRepetitions: Joi.number().required(),
                  exercises: Joi.array()
                    .items(
                      Joi.object({
                        type: Joi.string().required(),
                        duration: Joi.number().required(),
                        distance: Joi.number().required(),
                        description: Joi.string().required(),
                      }),
                    )
                    .required(),
                }),
              )
              .required(),
          }),
        )
        .required(),
    },
  }),
  planningsController.create,
);

export default planningRouter;
