import { TableModel } from "../table-models/base-models/table-model";

export interface Updated<T extends TableModel> {
    updatedId: string,
    updatedItem: T
}