import CommentController from './controllers/CommentController';
import AuthController from './controllers/AuthController';
import SomeTextController from './controllers/SomeTextController';

export default (app: any) => {  
  app.post('/double', CommentController.double);
  app.post('/signup', AuthController.signup);
  app.post('/signin', AuthController.signin);

  app.get('/sometexts', SomeTextController.index)
  app.get('/sometexts/:id', SomeTextController.show)
  app.post('/sometexts', SomeTextController.create)
  app.put('/sometexts/:id', SomeTextController.update)
  app.delete('/sometexts/:id', SomeTextController.remove)
      
  return app;
};


