import {Component} from '@angular/core';
import {TestController} from '../services/test/test.controller';
import {ComplexObject} from './model/complex-object';
import {PhoneType} from './model/phone-type';
import {PhoneNumber} from './model/phone-number';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Sandbox';
  helloResult: string = null;
  complexObjectResult: ComplexObject = null;

  hello = 'Hello';

  constructor(private testController: TestController) {
  }

  async say() {
    this.helloResult = await this.testController.sayHello(this.hello);
  }

  async sendComplexObject() {
    const complexObject = {
      id: 42,
      title: 'Some object',
      description: 'Big object',
      date: new Date(),
      phoneNumber: {type: PhoneType.MOBILE, number: '77074655454'} as PhoneNumber,
    } as ComplexObject;
    console.log(complexObject);
    this.complexObjectResult = await this.testController.sendComplexObject(complexObject);
  }
}
