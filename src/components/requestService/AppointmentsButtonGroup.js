import { Button, ButtonGroup, Typography } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { generateAppointmentsNext30Days } from "./utils";
import dayjs from "dayjs";
import RequestServiceContext from "./RequestServiceContext";

const AppointmentsButtonGroup = (props) => {
  const { formData, setFormData, validationErrors } = useContext(
    RequestServiceContext
  );

  const [appointmentsList, setAppointmentsList] = useState(
    generateAppointmentsNext30Days()
  );

  const handleChange = useCallback(
    (event) => {
      const {
        target: { value, name },
      } = event;

      setFormData((formData) => ({
        ...formData,
        [name]:
          name === "serviceCategories"
            ? typeof value === "string"
              ? value.split(",")
              : value
            : value,
      }));
    },
    [setFormData]
  );

  return (
    <>
      <ButtonGroup
        display={"flex"}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          border: validationErrors?.appointmentTime
            ? "#d32f2f solid 1px"
            : "none",
        }}
      >
        {appointmentsList
          .filter((x) => x.isSame(dayjs(formData?.browseDate), "day"))
          .map((appt) => (
            <Button
              key={appt}
              variant={
                formData?.appointmentTime === appt ? "contained" : "text"
              }
              onClick={() =>
                handleChange({
                  target: { name: "appointmentTime", value: appt },
                })
              }
              sx={{ borderRadius: 0 }}
            >
              {appt.format("h:mm A")}
            </Button>
          ))}
      </ButtonGroup>
      {validationErrors?.appointmentTime && (
        <Typography
          sx={{ color: "#d32f2f", ml: "14px", mt: "3px", fontSize: "0.75rem" }}
        >
          {validationErrors?.appointmentTime}
        </Typography>
      )}
    </>
  );
};

export default AppointmentsButtonGroup;
