// import 'zone.js/dist/zone-testing.js';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {browser, by, element, logging} from 'protractor';
import {AppPage} from './app.po';
import {TestBed} from '@angular/core/testing';
import {AppComponent} from '../../src/app/app.component';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';


describe('workspace-project App', () => {
    let page: AppPage;
    beforeEach(async () => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    });
    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', async () => {
        await page.navigateTo();
        expect(await page.getTitleText()).toEqual('Add folder to root');
    });
    it('should create a node', async () => {
        element(by.css('.root.button')).click();
        await element(by.css('.text-area')).getText();
        expect(await element(by.css('.text-area')).getText()).toEqual('1');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
