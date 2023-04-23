import { StatModel } from "./base-models/stat-model";

export interface IncomeFromJob extends StatModel {
    income?: number,
    job: string
}