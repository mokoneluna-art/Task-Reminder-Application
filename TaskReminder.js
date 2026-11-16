 // Validates the date string and converts it to a Date object  <-- ADD THIS LINE
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

  // Sends the notification using the correct channel from the registry  <-- ADD THIS LINE
  sendNotification() {
    const channel = CHANNEL_REGISTRY[this.notificationType];
    const message = `Reminder: '${this.taskName}' is due at ${this.reminderTime.toISOString()}.`;
    return channel.send(this.taskName, message);
  }

  // Checks if the current time has passed the reminder time  <-- ADD THIS LINE
  isDue(now = new Date()) {
    return now >= this.reminderTime;
  }
}