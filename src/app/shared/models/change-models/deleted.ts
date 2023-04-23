import { TableModel } from "../table-models/base-models/table-model"

export interface Deleted<T extends TableModel> {
    deletedId: string,
    deletedItem: T
}