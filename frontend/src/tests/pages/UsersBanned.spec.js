import {fireEvent, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator } from '../../store';
import '@testing-library/jest-dom'
import UsersBanned from '../../Pages/UsersBanned/UsersBanned';

describe('UsersBanned', ()=>{

    it('Render Loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UsersBanned/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()

    })

    it('Render users banned',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersBanned test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const links=await screen.findAllByText('Ver')

        const unbanButtons=await screen.findAllByText('Desbanir')

        links.map(link=>{
            expect(link).toBeInTheDocument()
        })

        unbanButtons.map(unbanButton=>{
            expect(unbanButton).toBeInTheDocument()
        })

        expect(screen.getByText('Lopes')).toBeInTheDocument()
        
    })

    it('Render warning unban',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersBanned test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const unbanButton=(await screen.findAllByText('Desbanir'))[0]

        fireEvent.click(unbanButton)

        expect(screen.getByText('Tem certeza que deseja desbanir o usuário Lopes?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

         //action buttons disappear when warning is activated

         const unbanButtons=screen.queryByText('Desbanir')
 
         expect(unbanButtons).toBeFalsy()
        
    })

    it('Close warning unban',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersBanned test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const unbanButton=(await screen.findAllByText('Desbanir'))[0]

        fireEvent.click(unbanButton)

        expect(screen.getByText('Tem certeza que deseja desbanir o usuário Lopes?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Não'))
        
        const warning=screen.queryByText('Tem certeza que deseja desbanir o usuário Lopes?')

        expect(warning).toBeFalsy()

        
        //action buttons appear when warning is activated

        const unbanButtons=screen.queryAllByText('Desbanir')

        expect(unbanButtons.length).not.toBe(0)
        
    })

    
})