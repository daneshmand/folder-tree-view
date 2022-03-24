import { Component } from '@angular/core';
import {Node} from './node/node.model';
import {generateRandomId} from './node/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  nodes: Node[] = [];

  addRootNode(): void{
    this.nodes.push(new Node('unset', generateRandomId(), this.nodes.length));
  }

}
