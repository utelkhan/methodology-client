import {Component} from '@angular/core';
import {TestController} from '../services/test/test.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Sandbox';
  helloResult: string = null;

  hello = 'Hello';

  constructor(private testController: TestController) {
  }

  async say() {
    this.helloResult = await this.testController.sayHello(this.hello);
  }
}
