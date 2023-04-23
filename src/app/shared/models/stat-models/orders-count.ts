import { StatModel } from "./base-models/stat-model";

export interface OrdersCount extends StatModel {
    fixedWageOrderCount: number,
    hourlyWageOrderCount: number,
    overallCount: number
}