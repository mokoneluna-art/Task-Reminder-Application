 const { EmailChannel, SmsChannel } = require("./channels");

const CHANNEL_REGISTRY = {
  email: new EmailChannel(),
  sms: new SmsChannel(),
};

class TaskReminder {
  constructor(taskName, reminderTime, notificationType) {
    if (!taskName || taskName.trim() === "") {
      throw new Error("Task name cannot be empty.");
    }

    // SANITIZATION: Remove any HTML tags or dangerous characters
    this.taskName = taskName.replace(/[<>]/g, "");
    
    this.reminderTime = TaskReminder.parseTime(reminderTime);
    this.notificationType = notificationType.toLowerCase();

    if (!CHANNEL_REGISTRY[this.notificationType]) {
      throw new Error(`Unsupported notification type: ${notificationType}`);
    }
  }

  static parseTime(reminderTime) {
    const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!pattern.test(reminderTime)) {
      throw new Error("Reminder time must be in 'YYYY-MM-DD HH:MM' format.");
    }
    const isoString = reminderTime.replace(" ", "T");
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      throw new Error("Reminder time is not a valid date.");
    }
    return date;
  }

  setReminder() {
    console.log(
      `Reminder set for '${this.taskName}' at ${this.reminderTime.toISOString()} via ${this.notificationType}.`
    );
  }

  sendNotification() {
    const channel = CHANNEL_REGISTRY[this.notificationType];
    const message = `Reminder: '${this.taskName}' is due at ${this.reminderTime.toISOString()}.`;
    return channel.send(this.taskName, message);
  }

  isDue(now = new Date()) {
    return now >= this.reminderTime;
  }
}

module.exports = TaskReminder;