import { Router } from 'express';
import athleteRouter from '@modules/athletes/routes/athletes.routes';
import athletesGroupRouter from '@modules/athletesGroup/routes/athletesGroup.routes';
import sessionsRouter from '@modules/athletes/routes/sessions.routes';
import planningRouter from '@modules/planning/routes/planning.routes';
import exerciseRouter from '@modules/planning/routes/exercise.routes';

const routes = Router();

routes.use('/athletes', athleteRouter);

routes.use('/athletesGroup', athletesGroupRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/planning', planningRouter);

// Remover em prod
routes.use('/exercises', exerciseRouter);

routes.get('/', (_, response) => {
  return response.json({ message: 'Agora vai!' });
});

export default routes;
