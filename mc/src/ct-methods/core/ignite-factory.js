import { CreateCustomObject } from './ignite/CreateCustomObject';
import { GetCustomObject } from './ignite/GetCustomObject';

export default class Ignite {
  get createCustomObject() {
    return new CreateCustomObject().execute;
  }
  get getCustomObject() {
    return new GetCustomObject().execute;
  }
}
