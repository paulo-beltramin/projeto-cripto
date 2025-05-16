import { BsSearch } from "react-icons/bs"

import style from './style.module.scss'
import { Link, useNavigate } from "react-router"
import { useState, type FormEvent } from "react"

export const Home = () => {
  const [input, setInput] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input === '') return;

    navigate(`/detail/${input}`)

  }

  return (
    <>
      <form className={style.forms} onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite o nome da moeda... ex:bitcoin" value={input}
          onChange={e => setInput(e.target.value)} />
        <button type="submit"><BsSearch size={24} /></button>
      </form>

      <section className={style.container_table}>
        <table>
          <thead>
            <tr>
              <th>Moeda</th>
              <th>Valor mercado</th>
              <th>Preço</th>
              <th>Volume</th>
              <th>Mudança 24H</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><Link to={''}>Bitcoin - BTC</Link></td>
              <td>1T</td>
              <td>8.000</td>
              <td>2B</td>
              <td className={style.container_table__positivo}>1,20</td>
            </tr>
          </tbody>
        </table>

        <button>Ver +</button>
      </section>
    </>
  )
}
