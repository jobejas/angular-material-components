import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from './moment-adapter';
import { NGX_MAT_MOMENT_FORMATS } from './moment-formats';
import * as i0 from "@angular/core";
export class NgxMomentDateModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.2", ngImport: i0, type: NgxMomentDateModule }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMomentDateModule, providers: [
            {
                provide: NgxMatDateAdapter,
                useClass: NgxMatMomentAdapter,
                deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
            }
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: NgxMatDateAdapter,
                            useClass: NgxMatMomentAdapter,
                            deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
                        }
                    ],
                }]
        }] });
export class NgxMatMomentModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatMomentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.2", ngImport: i0, type: NgxMatMomentModule, imports: [NgxMomentDateModule] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatMomentModule, providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: NGX_MAT_MOMENT_FORMATS }], imports: [NgxMomentDateModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatMomentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgxMomentDateModule],
                    providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: NGX_MAT_MOMENT_FORMATS }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWFkYXB0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbW9tZW50LWFkYXB0ZXIvc3JjL2xpYi9tb21lbnQtYWRhcHRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBVzFELE1BQU0sT0FBTyxtQkFBbUI7aUlBQW5CLG1CQUFtQjtrSUFBbkIsbUJBQW1CO2tJQUFuQixtQkFBbUIsYUFSbkI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUNBQW1DLENBQUM7YUFDN0Q7U0FDRjs7MkZBRVUsbUJBQW1CO2tCQVQvQixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixRQUFRLEVBQUUsbUJBQW1COzRCQUM3QixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUNBQW1DLENBQUM7eUJBQzdEO3FCQUNGO2lCQUNGOztBQVFELE1BQU0sT0FBTyxrQkFBa0I7aUlBQWxCLGtCQUFrQjtrSUFBbEIsa0JBQWtCLFlBUGxCLG1CQUFtQjtrSUFPbkIsa0JBQWtCLGFBRmxCLENBQUMsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLENBQUMsWUFEdEUsbUJBQW1COzsyRkFHbEIsa0JBQWtCO2tCQUo5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQztpQkFDakYiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHsgTmd4TWF0RGF0ZUFkYXB0ZXIsIE5HWF9NQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnQGFuZ3VsYXItbWF0ZXJpYWwtY29tcG9uZW50cy9kYXRldGltZS1waWNrZXInO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9EQVRFX0xPQ0FMRSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTmd4TWF0TW9tZW50QWRhcHRlciwgTkdYX01BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMgfSBmcm9tICcuL21vbWVudC1hZGFwdGVyJztcbmltcG9ydCB7IE5HWF9NQVRfTU9NRU5UX0ZPUk1BVFMgfSBmcm9tICcuL21vbWVudC1mb3JtYXRzJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTmd4TWF0RGF0ZUFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogTmd4TWF0TW9tZW50QWRhcHRlcixcbiAgICAgIGRlcHM6IFtNQVRfREFURV9MT0NBTEUsIE5HWF9NQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TXVxuICAgIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4TW9tZW50RGF0ZU1vZHVsZSB7IH1cblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmd4TW9tZW50RGF0ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdYX01BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBOR1hfTUFUX01PTUVOVF9GT1JNQVRTIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRNb21lbnRNb2R1bGUgeyB9XG4iXX0=