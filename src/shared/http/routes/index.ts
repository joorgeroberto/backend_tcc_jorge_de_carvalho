import { Router } from 'express';
import athleteRouter from '@modules/athletes/routes/athletes.routes';
import athletesGroupRouter from '@modules/athletesGroup/routes/athletesGroup.routes';
import sessionsRouter from '@modules/athletes/routes/sessions.routes';

const routes = Router();

routes.use('/athletes', athleteRouter);

routes.use('/athletesGroup', athletesGroupRouter);

routes.use('/sessions', sessionsRouter);

routes.get('/', (_, response) => {
  return response.json({ message: 'Agora vai!' });
});

export default routes;
