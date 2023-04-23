import { TableModel } from "./base-models/table-model";
import { FixedWageEmployee } from "./fixed-wage-employee";
import { HourlyWageEmployee } from "./hourly-wage-employee";

export interface Job extends TableModel {
    name: string,
    fixedWageEmployees: FixedWageEmployee[],
    hourlyWageEmployees: HourlyWageEmployee[]
}