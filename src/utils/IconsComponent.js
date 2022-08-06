import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  solid, regular  } from '@fortawesome/fontawesome-svg-core/import.macro'

export const Options = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={solid("ellipsis-vertical")} />
export const Close = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={solid("close") }/>
export const MyDay = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={regular("sun") }/>
export const Clock = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={regular("clock") }/>
export const Calendar = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={regular("calendar") }/>
export const CalendarRepeat = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={regular("calendar-plus") }/>
export const ClockRotate = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={solid("clock-rotate-left") }/>
export const File = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={solid("paperclip") }/>
export const Tomorrow = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={regular("circle-right") }/>
export const NextWeek = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={regular("circle-play") }/>
export const Reminder = ({onClick}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={regular("bell") }/>
