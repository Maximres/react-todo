import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar  } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar  } from '@fortawesome/free-regular-svg-icons'

export const Favorite = ({onClick, isFavorite}) => <FontAwesomeIcon className="pointer" onClick={onClick} icon={isFavorite ? solidStar : regularStar} />
