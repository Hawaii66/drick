import { CTSEvent } from "src/common/event";
import { BasicSocket, Data } from "../game/player";

class EventLog {
  eventLog: { event: CTSEvent; data: Data }[] = [];

  getLatets() {
    return this.eventLog[this.eventLog.length - 1];
  }

  addLog(data: { event: CTSEvent; data: Data }) {
    this.eventLog.push(data);
  }

  toJSON() {
    return JSON.stringify(this.eventLog, null, 2);
  }
}

export class FakeSocket implements BasicSocket {
  id: string;
  listeners: { event: CTSEvent; callback: (data: Data) => void }[] = [];
  onAnyListeners: ((event: CTSEvent, data: Data) => void)[] = [];
  eventLog: EventLog;
  logAll: boolean;

  constructor(id: string, logAll: boolean) {
    this.id = id;
    this.eventLog = new EventLog();
    this.logAll = logAll;
  }

  sendEvent(event: CTSEvent, data: Data) {
    if (this.logAll) {
      console.log("To server: ", this.id, event, data);
    }

    this.onAnyListeners.forEach((d) => d(event, data));
    this.listeners.forEach((d) => d.event === event && d.callback(data));
  }

  emit(event: CTSEvent, data: Data) {
    if (this.logAll) {
      console.log("To client: ", this.id, event, data);
    }

    this.eventLog.addLog({ event, data });
  }

  on(event: CTSEvent, callback: (data: Data) => void) {
    this.listeners.push({
      callback,
      event,
    });
  }

  onAny(callback: (event: CTSEvent, data: Data) => void) {
    this.onAnyListeners.push(callback);
  }
}
