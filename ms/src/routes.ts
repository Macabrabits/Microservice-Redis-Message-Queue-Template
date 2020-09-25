import ExampleService from './services/ExampleService';
import AuthService from './services/AuthService';
import SomeTextService from './services/SomeTextService';

export default {
  double: { get: ExampleService.double },
  signup: { post: AuthService.signup },
  signin: { get: AuthService.signin },
  sometexts: {
    get: SomeTextService.index,
    show: SomeTextService.show,
    post: SomeTextService.save,
    put: SomeTextService.save,
    delete: SomeTextService.remove,
  },
};
