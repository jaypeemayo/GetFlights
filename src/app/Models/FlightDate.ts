import moment = require("moment");
import {IMyDate} from "mydatepicker";
import Moment = moment.Moment;
export class FlightDate implements  IMyDate {

  constructor(moment: Moment) {
    this.year = moment.year();
    this.month = moment.month() + 1;
    this.day = moment.date();
  }

  year: number;
  month: number;
  day: number;
}
