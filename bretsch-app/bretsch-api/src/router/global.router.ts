import { Router } from 'express';

export const globalRouter: Router = Router({ mergeParams: true });

// globalRouter.use('/example', exampleRouter);
