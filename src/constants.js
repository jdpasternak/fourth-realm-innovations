import Contact from "./components/Contact";
import HomePage from "./components/HomePage";
import ScheduleService from "./components/ScheduleService";
import Services from "./components/Services";

const HOME_PAGE = "home";
const HOME_PAGE_COMPONENT = <HomePage />;
const SERVICES_PAGE = "services";
const SERVICES_PAGE_COMPONENT = <Services />;
const SCHEDULE_SERVICE_PAGE = "schedule-service";
const SCHEDULE_SERVICE_PAGE_COMPONENT = <ScheduleService />;
const CONTACT_PAGE = "contact";
const CONTACT_PAGE_COMPONENT = <Contact />;

export {
  HOME_PAGE,
  HOME_PAGE_COMPONENT,
  SERVICES_PAGE,
  SERVICES_PAGE_COMPONENT,
  SCHEDULE_SERVICE_PAGE,
  SCHEDULE_SERVICE_PAGE_COMPONENT,
  CONTACT_PAGE,
  CONTACT_PAGE_COMPONENT,
};
