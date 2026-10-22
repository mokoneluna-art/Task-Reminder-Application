/**
 * Base class for all notification channels.
 * Any new channel just extends this and implements send().
 */
class NotificationChannel {
  send(taskName, message) {
    throw new Error("send() must be implemented by a subclass.");
  }
}

class EmailChannel extends NotificationChannel {
  send(taskName, message) {
    console.log(`[EMAIL] Task: ${taskName} | ${message}`);
    return true;
  }
}

class SmsChannel extends NotificationChannel {
  send(taskName, message) {
    console.log(`[SMS] Task: ${taskName} | ${message}`);
    return true;
  }
}

module.exports = { NotificationChannel, EmailChannel, SmsChannel };