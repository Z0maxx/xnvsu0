import { TableModel } from "./base-models/table-model";
import { FixedWageOrder } from "./fixed-wage-order";

export interface Eventtype extends TableModel {
    name: string,
    orders: FixedWageOrder[]
}