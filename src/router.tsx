import { createBrowserRouter } from 'react-router'
import { Home } from './Home'
import { Detail } from './Sobre/Detail'
import { NotFound } from './NotFound'
import { Layout } from './Components/layout'


export const router = createBrowserRouter([
    {    element: <Layout/>,
        children: [
            {

                path: '/',
                element: <Home />
            },

            {
                path:'/detail/:id',
                element:<Detail/>
            },

            {
                path:"*",
                element:<NotFound/>
            }
        
        
        ]
    }
])