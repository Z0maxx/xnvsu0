import { StatModel } from "./base-models/stat-model";

export interface EmployeeOrdersCount extends StatModel {
    employeeName: string,
    ordersCount: number
}