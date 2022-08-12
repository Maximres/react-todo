import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro'

export const Options = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("ellipsis-vertical")}/>
export const Favorite = (props: any) => {
    const {isFavorite, ...rest} = props;
    return <FontAwesomeIcon className="pointer " {...rest}
                     icon={ (isFavorite ? solid("star") : regular("star")) }/>
}
export const MyDay = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={regular("sun")}/>
export const Clock = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={regular("clock")}/>
export const Calendar = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={regular("calendar")}/>
export const CalendarRepeat = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={regular("calendar-plus")}/>
export const ClockRotate = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("clock-rotate-left")}/>
export const Today = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("calendar-day")}/>
export const File = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("paperclip")}/>
export const Tomorrow = (props: any) => <FontAwesomeIcon className="pointer"  {...props} icon={regular("circle-right")}/>
export const NextWeek = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={regular("circle-play")}/>
export const Week = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("calendar-week")}/>
export const Month = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("calendar-check")}/>
export const Year = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("calendar")}/>
export const Weekdays = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={solid("calendar-plus")}/>
export const Reminder = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={regular("bell")}/>
export const PickDate = (props: any) => <FontAwesomeIcon className="pointer" {...props} icon={regular("calendar-days")}/>
