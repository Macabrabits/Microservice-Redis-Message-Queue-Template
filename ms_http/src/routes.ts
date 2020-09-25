import SomeTextController from './controllers/SomeTextController';
import DoubleController from './controllers/DoubleController';

export default (app: any) => {  
  app.get('/sometexts', SomeTextController.index)
  app.get('/sometexts/:id', SomeTextController.show)
  app.post('/sometexts', SomeTextController.create)
  app.put('/sometexts/:id', SomeTextController.update)
  app.delete('/sometexts/:id', SomeTextController.remove)

  app.get('/double', DoubleController.double)
      
  return app;
};


