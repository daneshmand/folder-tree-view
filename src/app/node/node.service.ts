import {Injectable} from '@angular/core';
import {Node} from './node.model';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NodeService {
    nodes: Node[] = [];
    private resetFormTriggerSubject$ = new Subject();
    resetFormTrigger$: Observable<any>;

    constructor() {
        this.resetFormTrigger$ = this.resetFormTriggerSubject$.asObservable();
    }

    resetForm(): void {
        this.resetFormTriggerSubject$.next();
    }
}
