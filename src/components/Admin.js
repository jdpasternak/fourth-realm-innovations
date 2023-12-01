import {
  Box,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useAdminData = () => {
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/admin"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    // fetchData();
    setAdminData({
      operatingHours: [
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "17:00",
          START_TIME: "10:00",
          DAY_OF_WEEK: "1",
          ID: "1",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "2",
          ID: "2",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "3",
          ID: "3",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "4",
          ID: "4",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "5",
          ID: "5",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "6",
          ID: "6",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "10:00",
          DAY_OF_WEEK: "7",
          ID: "7",
        },
      ],
      operatingHoursExclusions: [
        {
          DATE: "2023-11-23",
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22T12:24:00-05:00",
          END_TIME: "11:59",
          START_TIME: "00:00",
          ID: "1",
        },
      ],
      appointments: [
        {
          city: "Centersville",
          appointmentTime: "2023-11-22T10:00:00-05:00",
          serviceCategories: "category1,category2,category3",
          zip: "83405",
          id: "1",
          email: "jdp.pasternak@gmail.com",
          phone: "8082163534",
          name: "Jake Pasternak",
          address1: "123 ABC Street",
          state: "California",
        },
      ],
    });
  }, []);
  return adminData;
};

const generateAvailableAppointments = (adminData) => {
  console.log(
    "START generateAvailableAppointments\n" + ("*".repeat(48) + "\n").repeat(2)
  );
  console.log("Inside generateAvailableAppointments, adminData:", adminData);
  //  Determine today [new dayjs()]
  let today = new dayjs();
  console.log("Inside generateAvailableAppointments, today:", today.format());
  for (let i = 0; i < 31; i++) {
    // console.log("i", i);
    let workingDate = today.add(i, "day");
    console.log("*".repeat(48));
    console.log(
      "Inside generateAvailableAppointments, workingDate:",
      workingDate.format("MM/DD/YYYY")
    );
    // console.log(workingDate);
    const operatingHours = adminData.operatingHours.find(
      (x) => x.DAY_OF_WEEK - 1 == workingDate.day()
    );
    console.log(
      `Inside generateAvailableAppointments, operatingHours: ${operatingHours.START_TIME} - ${operatingHours.END_TIME}`
    );

    // Determine number of working hour blocks in the day
    const [startHour, startMinute] =
      operatingHours.START_TIME.split(":").map(Number);
    const startTime = workingDate
      .hour(startHour)
      .minute(startMinute)
      .second(0)
      .millisecond(0);
    const [endHour, endMinute] = operatingHours.END_TIME.split(":").map(Number);
    const endTime = workingDate
      .hour(endHour)
      .minute(endMinute)
      .second(0)
      .millisecond(0);

    console.log(
      "Inside generateAvailableAppointments, startTime:",
      startTime.format("hh:mm A")
    );
    console.log(
      "Inside generateAvailableAppointments, endTime:",
      endTime.format("hh:mm A")
    );

    const hours = Math.abs(startTime.diff(endTime, "hour"));
    console.log("Inside generateAvailableAppointments: hours", hours);

    // EXCLUSIONS
    console.log(adminData.operatingHoursExclusions);
    const operatingHoursExclusions = adminData.operatingHoursExclusions.filter(
      (x) => {
        let xDate = dayjs(x.DATE);
        console.log(xDate);
        return xDate.isSame(workingDate, "day");
      }
    );
    console.log(
      "Inside generateAvailableAppointments: operatinHoursExclusions",
      operatingHoursExclusions
    );

    // Generate a dayjs of the start time for each hour of the day
    let startTimes = [];
    // for (let i = 0; i < hours; i++) {
    //     let entry = startTime.add(i, "hour")
    //   operatingHours.map(x => if (entry.isBefore))
    //   startTimes.push(startTime.add(i, "hour"));
    // }
    console.log(startTimes);

    //  What day is today + i?
    //  Get operating hours for that day
    //  INITIAL GENERATION
    //  1) find number of hour blocks in a day's operating hours
    //      i.e. if hours are 0800 to 1700, that's 17-8=9 hours.
    //      There will be appointments for all hours up unitl the last hour
    //      (meaning 1600 will be the last scheduleable block)
    //  2) create a list of hour blocks that are excluded for that day, if any
    //      i.e. a list of datetimes
    //  3) compare these two lists and remove any from the available
    //  where they appear in the exclusions list.
    //
  }
};

const Admin = () => {
  const adminData = useAdminData();

  const {
    FRI_OPERATING_HOURS: operatingHours,
    FRI_OPERATING_HOURS_EXCLUSIONS: operatingHoursExclusions,
    FRI_APPOINTMENTS: appointments,
  } = adminData;

  useEffect(() => {
    console.log("in useEffect");
    generateAvailableAppointments({
      operatingHours: [
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "17:00",
          START_TIME: "10:00",
          DAY_OF_WEEK: "1",
          ID: "1",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "2",
          ID: "2",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "3",
          ID: "3",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "4",
          ID: "4",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "5",
          ID: "5",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "08:00",
          DAY_OF_WEEK: "6",
          ID: "6",
        },
        {
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22:T12:30:00-05:00",
          END_TIME: "18:00",
          START_TIME: "10:00",
          DAY_OF_WEEK: "7",
          ID: "7",
        },
      ],
      operatingHoursExclusions: [
        {
          DATE: "2023-11-23",
          LAST_UPDATED_BY: "JAKEPASTERNAK",
          LAST_UPDATED: "2023-11-22T12:24:00-05:00",
          END_TIME: "11:59",
          START_TIME: "00:00",
          ID: "1",
        },
      ],
      appointments: [
        {
          city: "Centersville",
          appointmentTime: "2023-11-22T10:00:00-05:00",
          serviceCategories: "category1,category2,category3",
          zip: "83405",
          id: "1",
          email: "jdp.pasternak@gmail.com",
          phone: "8082163534",
          name: "Jake Pasternak",
          address1: "123 ABC Street",
          state: "California",
        },
      ],
    });
  }, [operatingHours, operatingHoursExclusions, appointments]);

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h2">Admin Console</Typography>
      <Box sx={{ my: 4 }}>
        {!operatingHours || !operatingHoursExclusions || !appointments ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Typography>Operating Hours</Typography>
            <Table sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  {Object.keys(operatingHours[0])
                    .reverse()
                    .map((key) => (
                      <TableCell ket={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {operatingHours
                  .sort((a, b) => a.ID - b.ID)
                  .map((x) => (
                    <TableRow>
                      {Object.values(x)
                        .reverse()
                        .map((y) => (
                          <TableCell>
                            {true ? <Input value={y} /> : { y }}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography>Operating Hours Exclusions</Typography>
            <Table sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  {Object.keys(operatingHoursExclusions[0])
                    .reverse()
                    .map((key) => (
                      <TableCell ket={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {operatingHoursExclusions
                  .sort((a, b) => a.ID - b.ID)
                  .map((x) => (
                    <TableRow>
                      {Object.values(x)
                        .reverse()
                        .map((y) => (
                          <TableCell>{y}</TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography>Appointments</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(appointments[0])
                    .reverse()
                    .map((key) => (
                      <TableCell ket={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments
                  .sort((a, b) => a.ID - b.ID)
                  .map((x) => (
                    <TableRow>
                      {Object.values(x)
                        .reverse()
                        .map((y) => (
                          <TableCell>{y}</TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Admin;
