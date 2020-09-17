import { CommentController } from './controllers/CommentController';

export default (app: any) => {  
  app.post('/comments', CommentController.create);
  app.put('/comments/:id', CommentController.update);  

  return app;
};


