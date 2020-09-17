import { CommentController } from './controllers/CommentController';

const router = (app: any) => {
  app.get('/comments', CommentController.index);
  app.get('/comments/:id', CommentController.show);
  app.post('/comments', CommentController.create);
  app.put('/comments/:id', CommentController.update);
  app.delete('/comments/:id', CommentController.remove);  

  return app;
};

export { router };
