import {Component} from '@angular/core';
import {Node} from './node/node.model';
import {generateRandomId} from './node/utils';
import {NodeService} from './node/node.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    nodes: Node[] = [];
    form: FormGroup = new FormGroup({'json-value': new FormControl(JSON.stringify(this.nodes))});

    constructor(private nodeService: NodeService) {
        this.nodeService.resetFormTrigger$.subscribe(() => {
            console.log(this.nodeService.nodes);
            this.form.get('json-value')?.setValue(JSON.stringify(this.nodes));
        });
    }

    addRootNode(): void {
        this.nodes.push(new Node('unset', generateRandomId(), this.nodes.length, null));
    }

}
