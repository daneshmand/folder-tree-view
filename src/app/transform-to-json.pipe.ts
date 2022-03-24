import { Pipe, PipeTransform } from '@angular/core';
import {Node} from './node/node.model';

@Pipe({
  name: 'transformToJson'
})
export class TransformToJsonPipe implements PipeTransform {

  transform(nodes: Node[]): string {
    return JSON.stringify(nodes);
  }

}
