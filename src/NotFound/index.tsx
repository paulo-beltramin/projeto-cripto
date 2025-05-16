import { Link } from "react-router"
import style from './style.module.scss'
export const NotFound = () => {
  return (
    <main >
      <div className={style.container}>
        <h1>Esta pagina não existe...</h1>
        <Link to={'/'}>Voltar a Home</Link>
      </div>
    </main>
  )
}
