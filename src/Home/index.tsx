import { BsSearch } from "react-icons/bs"

import style from './style.module.scss'

export const Home = () => {
  return (
    <>
       <form className={style.forms}>
        <input type="text" placeholder="Digite o nome da moeda... bitcoin" />
        <button><BsSearch size={24}/></button>
       </form>
    </>
  )
}
