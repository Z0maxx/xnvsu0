import { StatModel } from "./base-models/stat-model";

export interface IncomeFromOrder extends StatModel {
    orderDate: Date,
    employeeName: string,
    income: number
}