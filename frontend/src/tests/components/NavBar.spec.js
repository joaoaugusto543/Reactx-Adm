import {render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar'
import { Provider } from 'react-redux';
import { storeTestCommonAdministrator, storeTestUserMainAdmin } from '../../store';
import '@testing-library/jest-dom'

describe('NavBar',()=>{
    it('Render links common administrator',()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <NavBar test={true}/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Perfil')).toBeInTheDocument()
        expect(screen.getByText('Administradores')).toBeInTheDocument()
        expect(screen.getByText('Usuários em espera')).toBeInTheDocument()
        expect(screen.getByText('Usuários')).toBeInTheDocument()
        expect(screen.getByText('Usuários banidos')).toBeInTheDocument()
        expect(screen.getByText('Pedidos de crédito')).toBeInTheDocument()
        expect(screen.getByText('Segurança')).toBeInTheDocument()
        expect(screen.getByText('Sair')).toBeInTheDocument()
        
    })

    it('Render links main admin',()=>{
        render(
            <Provider store={storeTestUserMainAdmin}>
                <BrowserRouter>
                    <NavBar test={true}/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Perfil')).toBeInTheDocument()
        expect(screen.getByText('Criar administrador')).toBeInTheDocument()
        expect(screen.getByText('Administradores')).toBeInTheDocument()
        expect(screen.getByText('Usuários em espera')).toBeInTheDocument()
        expect(screen.getByText('Usuários')).toBeInTheDocument()
        expect(screen.getByText('Usuários banidos')).toBeInTheDocument()
        expect(screen.getByText('Pedidos de crédito')).toBeInTheDocument()
        expect(screen.getByText('Segurança')).toBeInTheDocument()
        expect(screen.getByText('Sair')).toBeInTheDocument()
        
    })

})