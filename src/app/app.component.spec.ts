import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [ReactiveFormsModule,
                FormsModule]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have nodes', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        fixture.whenStable().then(
            () => {
                component.addRootNode();
                expect(component.nodes.length).toBeGreaterThanOrEqual(1);
            }
        );
    });

    it('should', fakeAsync(
        () => {
            const fixture = TestBed.createComponent(AppComponent);
            const component = fixture.componentInstance;
            spyOn(component, 'addRootNode');
            const button = fixture.debugElement.query(By.css('.root-button'));
            button.nativeElement.click();
            tick();
            expect(component.addRootNode).toHaveBeenCalled();
        }
    ));

});
