import DoubleController from './controllers/DoubleController';
import AuthController from './controllers/AuthController';
import SomeTextController from './controllers/SomeTextController';
import SomeTextHttpController from './controllers/SomeTextHttpController';

export default (app: any) => {  
  app.post('/double', DoubleController.double);
  app.post('/http/double', DoubleController.doubleHttp);
  app.post('/signup', AuthController.signup);
  app.post('/signin', AuthController.signin);

  app.get('/sometexts', SomeTextController.index)
  app.get('/sometexts/:id', SomeTextController.show)
  app.post('/sometexts', SomeTextController.create)
  app.put('/sometexts/:id', SomeTextController.update)
  app.delete('/sometexts/:id', SomeTextController.remove)

  app.get('/http/sometexts', SomeTextHttpController.index)
  app.get('/http/sometexts/:id', SomeTextHttpController.show)
  app.post('/http/sometexts', SomeTextHttpController.create)
  app.put('/http/sometexts/:id', SomeTextHttpController.update)
  app.delete('/http/sometexts/:id', SomeTextHttpController.remove)
      
  return app;
};


