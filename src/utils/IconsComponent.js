import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro'

export const Options = (props) => <FontAwesomeIcon className="pointer" {...props} icon={solid("ellipsis-vertical")}/>
export const Close = (props) => <FontAwesomeIcon className="pointer" {...props} icon={solid("close")}/>
export const MyDay = (props) => <FontAwesomeIcon className="pointer" {...props} icon={regular("sun")}/>
export const Clock = (props) => <FontAwesomeIcon className="pointer" {...props} icon={regular("clock")}/>
export const Calendar = (props) => <FontAwesomeIcon className="pointer" {...props} icon={regular("calendar")}/>
export const CalendarRepeat = (props) => <FontAwesomeIcon className="pointer" {...props} icon={regular("calendar-plus")}/>
export const ClockRotate = (props) => <FontAwesomeIcon className="pointer" {...props} icon={solid("clock-rotate-left")}/>
export const Today = (props) => <FontAwesomeIcon className="pointer" {...props} icon={solid("calendar-day")}/>
export const File = (props) => <FontAwesomeIcon className="pointer" {...props} icon={solid("paperclip")}/>
export const Tomorrow = (props) => <FontAwesomeIcon className="pointer"  {...props} icon={regular("circle-right")}/>
export const NextWeek = (props) => <FontAwesomeIcon className="pointer" {...props} icon={regular("circle-play")}/>
export const Reminder = (props) => <FontAwesomeIcon className="pointer" {...props} icon={regular("bell")}/>
export const PickDate = (props) => <FontAwesomeIcon className="pointer" {...props} icon={regular("calendar-days")}/>
