import Appointment from "../models/Appointment";
import User from "../models/User";
import File from "../models/File";
import Notification from "../schemas/Notification";
import Mailer from "../../lib/Mailer";

import { isBefore, parseISO, startOfHour, format, subHours } from "date-fns";
import * as Yup from "yup";

class AppointmentController {
  async index(request, response) {
    const { page = 1 } = request.query;
    const appointments = await Appointment.findAll({
      where: { user_id: request.userId, canceled_at: null },
      order: ["date"],
      attributes: ["id", "date"],
      limit: 20,
      offset: (page - 1) * 20,
      include: [{
        model: User,
        as: "provider",
        attributes: ["id", "name", "email"],
        include: [{
          model: File,
          as: "avatar",
          attributes: ["id", "path", "url"]
        }]
      }]
    });
    return response.json(appointments);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Fields not valid." });
    }

    const { provider_id, date } = request.body;
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    });

    if (!isProvider) {
      return response.status(401).json({ error: "You can only create appointments with providers." });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ error: "Past dates are not allowed." });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });

    if (checkAvailability) {
      return response.status(401).json({ error: "Appointment date is not available." });
    }

    if (request.userId === provider_id) {
      return response.status(401).json({ error: "Providers can not create self-appointment." });
    }

    const appointment = await Appointment.create({
      user_id: request.userId,
      provider_id,
      date: hourStart
    });

    const user = await User.findByPk(request.userId);
    const formattedDate = format(
      hourStart,
      "EEEE, HH:mm - dd MMMM, yyyy.",
      {
        useAdditionalDayOfYearTokens: true,
        useAdditionalWeekYearTokens: true
      }
    );

    await Notification.create({
      content: `New appointment of the client ${user.name} on ${formattedDate}`,
      user: provider_id
    });

    return response.json(appointment);
  }

  async delete(request, response) {
    const appointment = await Appointment.findByPk(request.params.id, {
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["name", "email"]
        },
        {
          model: User,
          as: "user",
          attributes: ["name"]
        }
      ]
    });

    if (appointment.user_id !== request.userId) {
      return response.status(401).json({ error: "You can only cancel your appoinments." });
    }

    const cancelationDateLimit = subHours(appointment.date, 2);

    if (isBefore(cancelationDateLimit, new Date())) {
      return response.status(401).json({ error: "You can only cancel appointments 2 hours in advance." });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Mailer.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: "Canceled Appointment",
      template: "cancellation",
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          appointment.date,
          "EEEE, dd MMMM yyyy - HH:mm",
          {
            useAdditionalDayOfYearTokens: true,
            useAdditionalWeekYearTokens: true
          }
        )
      }
    });

    return response.json(appointment);
  }
}

export default new AppointmentController();