class MessagePort {
  constructor() {
    this.onmessage = null;
  }

  postMessage(message) {
    if (this.onmessage) {
      setTimeout(() => this.onmessage({ data: message }), 0);
    }
  }

  start() {}
  close() {}
}

class MessageChannel {
  constructor() {
    this.port1 = new MessagePort();
    this.port2 = new MessagePort();

    this.port1.postMessage = (message) => {
      if (this.port2.onmessage) {
        setTimeout(() => this.port2.onmessage({ data: message }), 0);
      }
    };

    this.port2.postMessage = (message) => {
      if (this.port1.onmessage) {
        setTimeout(() => this.port1.onmessage({ data: message }), 0);
      }
    };
  }
}

globalThis.MessageChannel = MessageChannel;
