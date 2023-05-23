import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';
import { Order } from 'src/app/shared/models/table-models/generic-models/order';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';
import { FixedWageOrderService } from './models/table/fixed-wage-order.service';
import { HourlyWageOrderService } from './models/table/hourly-wage-order.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {
  constructor(
    private fixedWageOrderService: FixedWageOrderService,
    private hourlyWageOrderService: HourlyWageOrderService
  ) { }

  get error() {
    return this.fixedWageOrderService.error;
  }

  unsubscribe() {
    this.fixedWageOrderService.unsubscribe();
    this.hourlyWageOrderService.unsubscribe();
  }

  private getOrderInfo(raw: Order, employeeId: string) {
    raw.orderDate = new Date(moment(raw.orderDate).format('yyyy-MM-DDThh:mm:ss'));
    raw.orderDate.setHours(raw.orderDate.getHours() - raw.orderDate.getTimezoneOffset() / 60)
    return {
      id: raw.id,
      orderDate: raw.orderDate,
      firstName: raw.firstName,
      lastName: raw.lastName,
      emailAddress: raw.emailAddress,
      phoneNumber: raw.phoneNumber,
      employeeId: employeeId
    }
  }

  createFixedOrders(addedFixedEmployees: FixedWageEmployee[], raw: any) {
    const fixedOrders: FixedWageOrder[] = [];

    for (let i = 0; i < addedFixedEmployees.length; i++) {
      fixedOrders.push(this.getFixedOrder(addedFixedEmployees, i, raw));
    }

    return this.submitFixedOrders(fixedOrders);
  }

  createHourlyOrders(addedHourlyEmployees: HourlyWageEmployee[], hoursList: number[], raw: any) {
    const hourlyOrders: HourlyWageOrder[] = [];

    for (let i = 0; i < addedHourlyEmployees.length; i++) {
      hourlyOrders.push(this.getHourlyOrder(addedHourlyEmployees, hoursList, i, raw));
    }

    return this.submitHourlyOrders(hourlyOrders);
  }

  private getFixedOrder(addedFixedEmployees: FixedWageEmployee[], index: number, raw: any) {
    const employee = addedFixedEmployees[index];
    let order = this.getOrderInfo(raw, employee.id);
    (order as FixedWageOrder).eventTypeId = raw.eventTypeId;
    return (order as FixedWageOrder);
  }

  private getHourlyOrder(addedHourlyEmployees: HourlyWageEmployee[], hoursList: number[], index: number, raw: any) {
    const employee = addedHourlyEmployees[index];
    const hours = hoursList[index];
    let order = this.getOrderInfo(raw, employee.id);
    (order as HourlyWageOrder).hours = hours;
    return (order as HourlyWageOrder);
  }

  private submitFixedOrders(fixedOrders: FixedWageOrder[]) {
    if (fixedOrders.length == 1) {
      return this.fixedWageOrderService.create(fixedOrders[0]);
    }
    else if (fixedOrders.length > 1) {
      return this.fixedWageOrderService.createBulk(fixedOrders);
    }
    return EMPTY;
  }

  private submitHourlyOrders(hourlyOrders: HourlyWageOrder[]) {
    if (hourlyOrders.length == 1) {
      return this.hourlyWageOrderService.create(hourlyOrders[0]);
    }
    else if (hourlyOrders.length > 1) {
      return this.hourlyWageOrderService.createBulk(hourlyOrders);
    }
    return EMPTY;
  }
}

