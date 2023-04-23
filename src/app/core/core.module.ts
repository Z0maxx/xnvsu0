import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from "@angular-material-components/datetime-picker";
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular-material-components/moment-adapter";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { RequestInterceptor } from "./interceptors/request.interceptor";

export const MOMENT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

const CUSTOM_MOMENT_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: MOMENT_DATETIME_FORMAT,
  },
  display: {
    dateInput: MOMENT_DATETIME_FORMAT,
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { verticalPosition: 'top' } },
        { provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_MOMENT_FORMATS },
        { provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ],
})
export class CoreModule { }