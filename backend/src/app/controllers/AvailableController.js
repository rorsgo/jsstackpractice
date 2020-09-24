import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter } from "date-fns";
import Appointment from "../models/Appointment";
import { Op } from "sequelize";

class AvailableController {
  async index(request, response) {
    const { date } = request.query;

    if (!date) {
      return response.status(400).json({ error: "Invalid date."});
    }

    const searchDate = Number(date);
    const availableAppointments = await Appointment.findAll({
      where: {
        provider_id: request.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
        }
      }
    });

    const providerSchedule = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ]

     const availableDate = providerSchedule.map(time => {
      const [ hour, minute ] = time.split(":");
      const timeValues = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

      return {
        time,
        timeValues: format(timeValues, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        availableDate:
          isAfter(timeValues, new Date()) &&
          !availableAppointments.find(appointment => format(appointment.date, "HH:mm") === time)
      };
    });

    return response.json(availableDate);
  }
}

export default new AvailableController();