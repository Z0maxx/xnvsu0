import { FixedWageOrder } from "./fixed-wage-order";
import { Employee } from "./generic-models/employee";

export interface FixedWageEmployee extends Employee {
    hours: number,
    orders: FixedWageOrder[];
}