import {TestBed} from '@angular/core/testing';

import {NodeComponent} from './node.component';
import {Node} from './node.model';
import {generateRandomId} from './utils';
import {By} from '@angular/platform-browser';

describe('NodeComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NodeComponent]
        })
            .compileComponents();
    });

    it('should create', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
    it('should have nodes', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        const node = new Node('folder', generateRandomId(), 0, null, {
            name: 'test',
            children: [],
            icon: 'folder',
            isEditing: false,
            isFocused: true
        });
        component.nodes.push(node);
        fixture.whenStable().then(
            () => {
                expect(component.nodes?.length).toBeGreaterThanOrEqual(1);
            }
        );
    });
    it('should show node name', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        const node = new Node('folder', generateRandomId(), 0, null, {
            name: 'test',
            children: [],
            icon: 'folder',
            isEditing: false,
            isFocused: true
        });
        component.nodes.push(node);
        fixture.whenStable().then(() => {
            const name = fixture.debugElement.query(By.css('.name'));
            expect(name?.nativeElement?.textContent).toContain('test');
        });
    });
    it('should show file', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        const node = new Node('file', generateRandomId(), 0, null, {
            name: 'test',
            children: [],
            icon: 'folder',
            isEditing: false,
            isFocused: true
        });
        const id = '#' + node.id + '-icon-img';
        component.nodes.push(node);
        fixture.whenStable().then(() => {
            const image = fixture.debugElement.query(By.css(id));
            expect(image?.nativeElement?.getAttribute('src')).toEqual('assets/images/file.svg');
        });
    });
    it('should show folder', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        const node = new Node('folder', generateRandomId(), 0, null, {
            name: 'test',
            children: [],
            icon: 'folder',
            isEditing: false,
            isFocused: true
        });
        const id = '#' + node.id + '-icon-img';
        component.nodes.push(node);
        fixture.whenStable().then(() => {
            const image = fixture.debugElement.query(By.css(id));
            expect(image?.nativeElement?.getAttribute('src')).toEqual('assets/images/folder.svg');
        });
    });
    it('should name be required', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        component.form.controls.name.setValue('');
        fixture.whenStable().then(() => {
            expect(component?.form?.valid).toBeFalse();
        });
    });
    it('should remove node', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        const node = new Node('folder', generateRandomId(), 0, null, {
            name: 'test',
            children: [],
            icon: 'folder',
            isEditing: false,
            isFocused: true
        });
        component.nodes.push(node);
        fixture.whenStable().then(() => {
            component.onRemove(1);
            expect(component?.nodes?.length).toEqual(0);
        });
    });
    it('should show child node name', () => {
        const fixture = TestBed.createComponent(NodeComponent);
        const component = fixture.componentInstance;
        const node = new Node('folder', generateRandomId(), 0, null, {
            name: 'test',
            children: [new Node('folder', generateRandomId(), 0, null, {
                name: 'testChild',
                children: [],
                icon: 'folder',
                isEditing: false,
                isFocused: true
            })],
            icon: 'folder',
            isEditing: false,
            isFocused: true
        });
        component.nodes.push(node);
        fixture.whenStable().then(() => {
            const name = fixture.debugElement.queryAll(By.css('.name'))[1];
            expect(name?.nativeElement?.textContent).toContain('testChild');
        });
    });
});
