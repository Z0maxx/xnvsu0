import { Employee } from "./generic-models/employee";
import { HourlyWageOrder } from "./hourly-wage-order";

export interface HourlyWageEmployee extends Employee {
    minHours: number,
    maxHours: number,
    orders: HourlyWageOrder[]
}