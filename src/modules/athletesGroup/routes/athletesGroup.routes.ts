import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AthletesGroupController from '../controllers/AthletesGroupController';
import AthletesGroupImageController from '../controllers/AthletesGroupImageController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAutheticated from '@shared/http/middlewares/isAutheticated';

const athletesGroupRouter = Router();
const athletesGroupController = new AthletesGroupController();
const athletesGroupImageController = new AthletesGroupImageController();

const upload = multer(uploadConfig);

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

athletesGroupRouter.patch(
  '/image',
  isAutheticated,
  upload.single('group_image'), // single pois estaremos enviando apenas um arquivo
  athletesGroupImageController.update,
);

export default athletesGroupRouter;
