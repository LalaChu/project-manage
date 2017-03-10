import React from 'react'
import {Link} from 'react-router'

const MenuLink = ({filter, children, onClick}) => {
 return(
    <Link to={filter}
        onClick={(e) => {
            {/*e.preventDefault()*/}
            onClick()
        }}
    >
        {children}
    </Link>
)
}
export default MenuLink
