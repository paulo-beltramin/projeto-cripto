import { Link, useNavigate } from "react-router"
import { useState, type FormEvent, useEffect } from "react"
import { BsSearch } from "react-icons/bs"

import style from './style.module.scss'

type bitProps = {
  id: string,
  name: string,
  symbol: string,
  marketCapUsd: string,
  priceUsd: number,
  volumeUsd24Hr: string,
  changePercent24Hr: string,
  formatedPrice?: string,
  priceCompact?: string,
  volumePrice?: string
}

type dataProps = {
  data: bitProps[]
}


export const Home = () => {
  const [input, setInput] = useState('')
  const [coins, setCoins] = useState<bitProps[]>([])
  const [offset, setOffSet] = useState(0)

  useEffect(() => {
    getDataCoins()
  }, [offset])


  const getDataCoins = async () => {
    fetch(`https://rest.coincap.io/v3/assets?limit=20&offset=${offset}&apiKey=d5cd8b5f4795ffd9c12b1a43f37ce62c0a81b28228663228abb8c4a0f5f444dc`)
      .then((res) => res.json()
      )
      .then((data: dataProps) => {
        const dados = data.data

        const price = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        })

        const compactPrice = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact'
        })

        const formaterPrice = dados.map(item => {
          const priceFormater = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            priceCompact: compactPrice.format(Number(item.marketCapUsd)),
            volumePrice: compactPrice.format(Number(item.volumeUsd24Hr))
          }

          return priceFormater
        })

        setCoins([...coins, ...formaterPrice]
      })

  }
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input === '') return;

    navigate(`/detail/${input}`)

  }

  const getMoreCoins = () => {

    if (offset === 0) {
      setOffSet(10)
      return
    }

    setOffSet(offset + 10)
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
            {coins.map(item => (
              <>
                <tr key={item.id}>
                  <div className={style.container_table__logo}>
                    <img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="logo cripto moeda" />
                    <td><Link to={''}>{item.name} | {item.symbol}</Link></td>
                  </div>
                  <td>{item.priceCompact}</td>
                  <td>{item.formatedPrice}</td>
                  <td>{item.volumePrice}</td>
                  <td className={Number(item.changePercent24Hr) > 0 ?
                    style.container_table__positivo : style.container_table__negativo

                  }>{Number(item.changePercent24Hr).toFixed(2)}</td>
                </tr >
              </>
            ))}
          </tbody>
        </table>

        <button onClick={getMoreCoins}>Ver +</button>
      </section >
    </>
  )
}
