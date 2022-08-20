import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Icon = (props: any, icon: IconProp) => (
  <FontAwesomeIcon {...props} icon={icon} />
);

const Options = (props: any) => Icon(props, solid("ellipsis-vertical"));
const Favorite = (props: any) => {
  const { isFavorite, ...rest } = props;
  return Icon(rest, isFavorite ? solid("star") : regular("star"));
};
const MyDay = (props: any) => Icon(props, regular("sun"));
const Clock = (props: any) => Icon(props, regular("clock"));
const Calendar = (props: any) => Icon(props, regular("calendar"));
const CalendarRepeat = (props: any) => Icon(props, regular("calendar-plus"));
const ClockRotate = (props: any) => Icon(props, solid("clock-rotate-left"));
const Today = (props: any) => Icon(props, solid("calendar-day"));
const File = (props: any) => Icon(props, solid("paperclip"));
const Tomorrow = (props: any) => Icon(props, regular("circle-right"));
const NextWeek = (props: any) => Icon(props, regular("circle-play"));
const Week = (props: any) => Icon(props, solid("calendar-week"));
const Month = (props: any) => Icon(props, solid("calendar-check"));
const Year = (props: any) => Icon(props, solid("calendar"));
const Weekdays = (props: any) => Icon(props, solid("calendar-plus"));
const Reminder = (props: any) => Icon(props, regular("bell"));
const PickDate = (props: any) => Icon(props, regular("calendar-days"));
const Trash = (props: any) => Icon(props, regular("trash-can"));

const Icons = {
  Options,
  Favorite,
  MyDay,
  Clock,
  Calendar,
  CalendarRepeat,
  ClockRotate,
  Today,
  File,
  Tomorrow,
  NextWeek,
  Week,
  Month,
  Year,
  Weekdays,
  Reminder,
  PickDate,
  Trash,
};

export default Icons;
