import { Eventtype } from "./eventtype";
import { FixedWageEmployee } from "./fixed-wage-employee";
import { Order } from "./generic-models/order";

export interface FixedWageOrder extends Order {
    eventTypeId: number | string,
    employee?: FixedWageEmployee,
    eventType?: Eventtype
}