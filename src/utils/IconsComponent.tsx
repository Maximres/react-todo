import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { default as cn } from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Icon = (props: any, icon: IconProp) => (
  <FontAwesomeIcon
    {...props}
    className={cn(props.className, {pointer: true})}
    icon={icon}
  />
);

export const Options = (props: any) => Icon(props, solid("ellipsis-vertical"));
export const Favorite = (props: any) => {
  const { isFavorite, ...rest } = props;
  return Icon(rest, isFavorite ? solid("star") : regular("star"));
};
export const MyDay = (props: any) => Icon(props, regular("sun"));
export const Clock = (props: any) => Icon(props, regular("clock"));
export const Calendar = (props: any) => Icon(props, regular("calendar"));
export const CalendarRepeat = (props: any) =>
  Icon(props, regular("calendar-plus"));
export const ClockRotate = (props: any) =>
  Icon(props, solid("clock-rotate-left"));
export const Today = (props: any) => Icon(props, solid("calendar-day"));
export const File = (props: any) => Icon(props, solid("paperclip"));
export const Tomorrow = (props: any) => Icon(props, regular("circle-right"));
export const NextWeek = (props: any) => Icon(props, regular("circle-play"));
export const Week = (props: any) => Icon(props, solid("calendar-week"));
export const Month = (props: any) => Icon(props, solid("calendar-check"));
export const Year = (props: any) => Icon(props, solid("calendar"));
export const Weekdays = (props: any) => Icon(props, solid("calendar-plus"));
export const Reminder = (props: any) => Icon(props, regular("bell"));
export const PickDate = (props: any) => Icon(props, regular("calendar-days"));
export const Trash = (props: any) => Icon(props, regular("trash-can"));
