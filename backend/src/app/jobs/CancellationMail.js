import { format, parseISO } from "date-fns";

import Mailer from "../../lib/Mailer";


class CancellationMail {
  get key() {
    return "CancellationMail";
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mailer.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: "Canceled Appointment",
      template: "cancellation",
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "EEEE, dd MMMM yyyy - HH:mm",
          {
            useAdditionalDayOfYearTokens: true,
            useAdditionalWeekYearTokens: true
          }
        )
      }
    });
  }
}

export default new CancellationMail();