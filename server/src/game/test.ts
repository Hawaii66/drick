import { Event } from "./event";
import { Data } from "./player";

class EventLog {
  eventLog: { event: Event; data: Data }[] = [];

  getLatets() {
    return this.eventLog[this.eventLog.length - 1];
  }

  addLog(data: { event: Event; data: Data }) {
    this.eventLog.push(data);
  }

  toJSON() {
    return JSON.stringify(this.eventLog, null, 2);
  }
}

export class FakeSocket {
  id: string;
  listeners: { event: Event; callback: (data: Data) => void }[] = [];
  onAnyListeners: ((event: Event, data: Data) => void)[] = [];
  eventLog: EventLog;
  logAll: boolean;

  constructor(id: string, logAll: boolean) {
    this.id = id;
    this.eventLog = new EventLog();
    this.logAll = logAll;
  }

  sendEvent(event: Event, data: Data) {
    if (this.logAll) {
      console.log("To server: ", this.id, event, data);
    }

    this.onAnyListeners.forEach((d) => d(event, data));
    this.listeners.forEach((d) => d.event === event && d.callback(data));
  }

  emit(event: Event, data: Data) {
    if (this.logAll) {
      console.log("To client: ", this.id, event, data);
    }

    this.eventLog.addLog({ event, data });
  }

  on(event: Event, callback: (data: Data) => void) {
    this.listeners.push({
      callback,
      event,
    });
  }

  onAny(callback: (event: Event, data: Data) => void) {
    this.onAnyListeners.push(callback);
  }
}
