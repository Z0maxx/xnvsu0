import { StatModel } from "./base-models/stat-model";

export interface Overview extends StatModel {
    ordersCount: number,
    income: number,
    hours: number
}