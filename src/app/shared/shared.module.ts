import { NgModule } from "@angular/core";
import { LoadingModule } from "./components/loading/loading.module";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from "./components/dialog/dialog.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EmployeeCreateComponent } from './components/common/generic/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/common/generic/employee-update/employee-update.component';
import { OrderUpdateComponent } from './components/common/generic/order-update/order-update.component';

@NgModule({
    declarations: [
        DialogComponent,
        SnackbarComponent,
        EmployeeCreateComponent,
        EmployeeUpdateComponent,
        OrderUpdateComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    exports: [
        LoadingModule
    ]
})
export class SharedModule { }