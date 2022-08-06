import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'


export const Favorite = ({onClick, isFavorite}) => <FontAwesomeIcon className="pointer "
                                                                    onClick={onClick}
                                                                    icon={isFavorite ? solid("star") : regular("star")} />
