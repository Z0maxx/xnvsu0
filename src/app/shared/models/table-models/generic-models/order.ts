import { TableModel } from "../base-models/table-model";

export interface Order extends TableModel {
    orderDate: Date,
    employeeId: number | string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string
}