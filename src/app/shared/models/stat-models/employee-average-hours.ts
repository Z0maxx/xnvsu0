import { StatModel } from "./base-models/stat-model";

export interface EmployeeAverageHours extends StatModel {
    employeeName: string,
    averageHours: number
}