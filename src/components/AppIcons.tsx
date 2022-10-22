import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { default as cn } from "classnames";
import { memo } from "react";

const Icon = (props: any, icon: IconProp) => (
  <i {...props} className={cn(props.className, { pointer: true })}>
    <FontAwesomeIcon icon={icon} />
  </i>
);

const Options = (props: any) => Icon(props, solid("ellipsis-vertical"));
const Favorite = (props: any) => {
  const { isImportant, ...rest } = props;
  return Icon(rest, isImportant ? solid("star") : regular("star"));
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
const User = (props: any) => Icon(props, regular("user"));
const Plus = (props: any) => Icon(props, solid("plus"));
const NewGroup = (props: any) => Icon(props, regular("object-ungroup"));
const Group = (props: any) => Icon(props, solid("bars-staggered"));
const List = (props: any) => Icon(props, solid("bars"));
const Search = (props: any) => Icon(props, solid("magnifying-glass"));
const Planned = (props: any) => Icon(props, regular("rectangle-list"));
const All = (props: any) => Icon(props, solid("infinity"));
const Task = (props: any) => Icon(props, solid("house"));
const Close = (props: any) => Icon(props, solid("xmark"));
const Angle = (props: any) => {
  const { isCollapsed, ...rest } = props;
  return Icon(rest, isCollapsed ? solid("angle-right") : solid("angle-down"));
};

const Icons = {
  Options: memo(Options),
  Favorite: memo(Favorite),
  MyDay: memo(MyDay),
  Clock: memo(Clock),
  Calendar: memo(Calendar),
  CalendarRepeat: memo(CalendarRepeat),
  ClockRotate: memo(ClockRotate),
  Today: memo(Today),
  File: memo(File),
  Tomorrow: memo(Tomorrow),
  NextWeek: memo(NextWeek),
  Week: memo(Week),
  Month: memo(Month),
  Year: memo(Year),
  Weekdays: memo(Weekdays),
  Reminder: memo(Reminder),
  PickDate: memo(PickDate),
  Trash: memo(Trash),
  User: memo(User),
  Plus: memo(Plus),
  NewGroup: memo(NewGroup),
  Group: memo(Group),
  List: memo(List),
  Search: memo(Search),
  Planned: memo(Planned),
  All: memo(All),
  Task: memo(Task),
  Angle: memo(Angle),
  Close: memo(Close),
};

export default Icons;
