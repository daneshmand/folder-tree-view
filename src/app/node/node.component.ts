import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Node} from './node.model';
import {generateRandomId} from './utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NodeService} from './node.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, OnDestroy {

    @Input() nodes: Node[] = [];
    @Input() isRoot = false;
    @Output() removeEmitter = new EventEmitter<number>();
    @Input() parentIndex = 0;
    @Input() lineFlag = false;
    form: FormGroup = new FormGroup({name: new FormControl('', Validators.required)});
    showWarning = false;
    removeProperties: number | null = null;
    spacerArray: any[] = [];
    resetFormSubscriber: Subscription | null = null;

    constructor(private nodeService: NodeService) {
    }

    ngOnInit(): void {
        if (this.isRoot) {
            this.nodeService.nodes = this.nodes;
        }
        this.resetFormSubscriber = this.nodeService.resetFormTrigger$.subscribe(
            () => this.form.reset()
        );
        const node = new Node('folder', generateRandomId(), 0, null, {name: 'test', children: [], icon: 'folder'});
        node.isEditing = false;
        node.isFocused = true;
        this.nodes.push(node);
    }
    ngOnDestroy(): void {
        this.resetFormSubscriber?.unsubscribe();
    }

    removed(): void {
        this.removeEmitter.emit(this.parentIndex);
    }

    onRemove(index: number): void {
        const nodeChildren = this.nodes[index].children;
        this.showWarning = !!nodeChildren && Array.isArray(nodeChildren) && nodeChildren?.length > 0;
        if (!this.showWarning) {
            this.nodes.splice(index, 1);
            this.nodeService.resetForm();
            this.removed();
        } else {
            this.removeProperties = index;
        }
    }

    forceRemove(index: number | null): void {
        if (index !== null) {
            this.nodes.splice(index, 1);
            this.nodeService.resetForm();
            this.showWarning = false;
            this.removeProperties = null;
            this.removed();
        }
    }

    changeListener(event: any, index: number): void {
        this.readThis(event.target, index);
    }

    readThis(inputValue: any, index: number): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = () => {
            this.nodes[index].name = file.name;
            this.nodes[index].isEditing = false;
            this.nodeService.resetForm();
        };
        myReader.readAsText(file);
    }

    onAdd(index: number, nodeId: string): void {
        this.nodeService.resetForm();
        const node = this.nodes[index];
        if (Array.isArray(node.children)) {
            this.form.get('name')?.setValue('');
            node.children.push(new Node('unset', generateRandomId(), node.children.length, nodeId));
        }
    }

    onSelect(index: number): void {
        this.form.get('name')?.setValue(this.nodes[index].name);
        this.nodes[index].isEditing = true;
    }

    setType(nodeIndex: number, type: 'file' | 'folder'): void {
        this.nodes[nodeIndex].type = this.nodes[nodeIndex].icon = type;
    }

    submit(index: number): void {
        if (!!this.form.get('name')?.value) {
            this.nodes[index].name = this.form.get('name')?.value;
        }
        this.nodes[index].isEditing = false;
        this.nodeService.resetForm();
    }

    onFocused(index: number): void {
        this.nodes[index].isFocused = true;
    }
    showVerticalLine(node: Node): boolean {
        let result = false;
        if (this.nodes.length > 1) {
            this.nodes.forEach((item, index) => {
                if (item.id === node.id && index < this.nodes.length - 1 && Array.isArray(item.children) && item.children.length > 0) {
                    result = true;
                }
            });
        }
        return result;
    }
}
