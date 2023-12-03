import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { data } from "../../static";
import { useContext } from "react";
import RequestServiceContext from "./RequestServiceContext";

const CustomListSubheader = (props) => {
  return <ListSubheader {...props}>{props.children}</ListSubheader>;
};

const ServiceCategorySelect = (props) => {
  const { formData, setFormData } = useContext(RequestServiceContext);

  const servicesList = data.pages.find(
    (x) => x.name === "ScheduleService"
  ).services;

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    setFormData({
      ...formData,
      [name]:
        name === "serviceCategories"
          ? typeof value === "string"
            ? value.split(",")
            : value
          : value,
    });
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel htmlFor="service-category">Service Categories</InputLabel>
      <Select
        id="service-category"
        label="Service Category"
        name="serviceCategories"
        onChange={handleChange}
        multiple
        value={props.serviceCategories || []}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {servicesList.map((service, i) => [
          <CustomListSubheader
            key={service.category}
            sx={{ fontSize: "1.5rem" }}
          >
            {service.category}
          </CustomListSubheader>,
          service.options.map((serviceOptions, j) => [
            <CustomListSubheader
              key={serviceOptions.subcategory}
              sx={{ fontSize: "1rem" }}
            >
              {serviceOptions.subcategory}
            </CustomListSubheader>,
            serviceOptions.items.map((item, k) => (
              <MenuItem
                key={item}
                value={item}
                divider={
                  j === service.options.length - 1 &&
                  k === serviceOptions.items.length - 1
                }
              >
                {item}
              </MenuItem>
            )),
          ]),
        ])}
      </Select>
      <FormHelperText htmlFor="service-category">
        Select from the wide variety of services we offer
      </FormHelperText>
    </FormControl>
  );
};

export default ServiceCategorySelect;
