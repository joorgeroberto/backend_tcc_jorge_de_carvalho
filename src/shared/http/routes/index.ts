import { Router } from 'express';
import athleteRouter from '@modules/athletes/routes/athletes.routes';
import sessionsRouter from '@modules/athletes/routes/sessions.routes';

const routes = Router();

routes.use('/athletes', athleteRouter);

routes.use('/sessions', sessionsRouter);

routes.get('/', (_, response) => {
  return response.json({ message: 'Agora vai!' });
});

export default routes;
