import { Data } from "./player";

class EventLog {
  eventLog: { event: string; data: Data }[] = [];

  getLatets() {
    return this.eventLog[this.eventLog.length - 1];
  }

  addLog(data: { event: string; data: Data }) {
    this.eventLog.push(data);
  }

  toJSON() {
    return JSON.stringify(this.eventLog, null, 2);
  }
}

export class FakeSocket {
  id: string;
  listeners: { event: string; callback: (data: Data) => void }[] = [];
  onAnyListeners: ((event: string, data: Data) => void)[] = [];
  eventLog: EventLog;

  constructor(id: string) {
    this.id = id;
    this.eventLog = new EventLog();
  }

  sendEvent(event: string, data: Data) {
    this.onAnyListeners.forEach((d) => d(event, data));
    this.listeners.forEach((d) => d.event === event && d.callback(data));
  }

  emit(event: string, data: Data) {
    this.eventLog.addLog({ event, data });
  }

  on(event: string, callback: (data: Data) => void) {
    this.listeners.push({
      callback,
      event,
    });
  }

  onAny(callback: (event: string, data: Data) => void) {
    this.onAnyListeners.push(callback);
  }
}
