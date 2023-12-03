import dayjs from "dayjs";

const generateAppointmentsNextXDays = (days) => {
  let appointmentsList = [];

  for (let i = 1; i < days; i++) {
    for (let j = 9; j < 18; j++) {
      const appointment = dayjs()
        .add(i, "day")
        .hour(j)
        .minute(0)
        .second(0)
        .millisecond(0);
      appointmentsList.push(appointment);
    }
  }

  return appointmentsList;
};

const generateAppointmentsNext30Days = () => {
  return generateAppointmentsNextXDays(30);
};

export { generateAppointmentsNext30Days };
