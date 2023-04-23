import { Order } from "./generic-models/order";
import { HourlyWageEmployee } from "./hourly-wage-employee";

export interface HourlyWageOrder extends Order {
    hours: number,
    employee?: HourlyWageEmployee
}