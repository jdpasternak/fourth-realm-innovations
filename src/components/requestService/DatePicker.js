import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext } from "react";
import RequestServiceContext from "./RequestServiceContext";

const DatePicker = (props) => {
  const { formData, setFormData } = useContext(RequestServiceContext);

  const handleChange = (value) => {
    setFormData({
      ...formData,
      browseDate: value,
      appointmentTime: value.isSame(formData.browseDate)
        ? formData.appointmentTime
        : null,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        label={"Service Date"}
        value={formData?.browseDate}
        onChange={handleChange}
        disablePast
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
