import { Router } from 'express';
import athleteRouter from '@modules/athletes/routes/athletes.routes';

const routes = Router();

routes.use('/athletes', athleteRouter);

routes.get('/', (_, response) => {
  return response.json({ message: 'Agora vai!' });
});

export default routes;
