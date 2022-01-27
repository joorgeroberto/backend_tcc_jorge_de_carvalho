import { Router } from 'express';

const routes = Router();

routes.get('/', (_, response) => {
  return response.json({ message: 'Agora vai!' });
});

export default routes;
