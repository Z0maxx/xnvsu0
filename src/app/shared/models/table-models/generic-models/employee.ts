import { TableModel } from "../base-models/table-model";
import { Job } from "../job";

export interface Employee extends TableModel {
    firstName: string,
    lastName: string,
    jobId: number,
    job?: Job,
    wage: number,
    hireDate: Date,
    emailAddress?: string,
    phoneNumber?: string
}