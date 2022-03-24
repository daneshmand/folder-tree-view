import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Node} from './node.model';
import {generateRandomId} from './utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

    @Input() nodes: Node[] = [];
    @Input() isRoot = false;
    @Output() removeEmitter = new EventEmitter<number>();
    @Input() parentIndex = 0;
    @Input() lineFlag = false;
    form: FormGroup = new FormGroup({name: new FormControl('', Validators.required)});
    showWarning = false;
    removeProperties: number | null = null;

    constructor() {
    }

    ngOnInit(): void {
    }

    removed(): void {
        this.removeEmitter.emit(this.parentIndex);
    }

    onRemove(index: number): void {
        const nodeChildren = this.nodes[index].children;
        this.showWarning = !!nodeChildren && Array.isArray(nodeChildren) && nodeChildren?.length > 0;
        if (!this.showWarning) {
            this.nodes.splice(index, 1);
            this.removed();
        } else {
            this.removeProperties = index;
        }
    }

    forceRemove(index: number | null): void {
        if (index !== null) {
            this.nodes.splice(index, 1);
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

        myReader.onloadend = (e) => {
            // you can perform an action with readed data here
            this.nodes[index].name = file.name;
            this.nodes[index].isEditing = false;
        };
        myReader.readAsText(file);
    }

    onAdd(index: number): void {
        const node = this.nodes[index];
        if (Array.isArray(node.children)) {
            this.form.get('name')?.setValue('');
            node.children.push(new Node('unset', generateRandomId(), node.children.length));
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
    }

    onFocused(index: number): void {
        this.nodes[index].isFocused = true;
    }
}
