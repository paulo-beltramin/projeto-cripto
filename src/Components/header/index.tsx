import { Link } from 'react-router'
import logo from '../../assets/logo.svg'

import style from './style.module.scss'


export const Header = () => {


    return (
        <div>
            <header className={style.container}>
               <Link to={'/'}> <img src={logo} alt="" /></Link>
            </header>
        </div>
    )
}
