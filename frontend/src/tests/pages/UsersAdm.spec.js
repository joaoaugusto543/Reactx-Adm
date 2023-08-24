import {fireEvent, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator, storeTestUserMainAdmin } from '../../store';
import '@testing-library/jest-dom'
import UsersAdm from '../../Pages/UsersAdm/UsersAdm';

describe('usersAdm', ()=>{

    it('Render Loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UsersAdm/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()

    })

    it('Render admin users with common admin',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersAdm test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const links=await screen.findAllByText('Ver')

        links.map(link=>{
            expect(link).toBeInTheDocument()
        })

        expect(screen.getByText('Maria Eunice')).toBeInTheDocument()
        
    })

    it('Render admin users with main admin',async ()=>{
        render(
            <Provider store={storeTestUserMainAdmin}>
                <BrowserRouter>
                    <UsersAdm test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const links=await screen.findAllByText('Ver')

        const deleteButtons=await screen.findAllByText('Excluir')

        links.map(link=>{
            expect(link).toBeInTheDocument()
        })

        deleteButtons.map(buttonDelete=>{
            expect(buttonDelete).toBeInTheDocument()
        })

        expect(screen.getByText('Maria Eunice')).toBeInTheDocument()

    })

    it('Render warning delete userAdm',async ()=>{
        render(
            <Provider store={storeTestUserMainAdmin}>
                <BrowserRouter>
                    <UsersAdm test={true}/>
                </BrowserRouter>
            </Provider>
        )
        
        const deleteButton=(await screen.findAllByText('Excluir'))[0]
        
        fireEvent.click(deleteButton)
        
        expect(screen.getByText('Tem certeza que deseja excluir o usuário Maria Eunice?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        //action buttons disappear when warning is activated
    
        const banButtons=screen.queryByText('Excluir')
        
        expect(banButtons).toBeFalsy()

    })

    it('Close warning delete',async ()=>{
        render(
            <Provider store={storeTestUserMainAdmin}>
                <BrowserRouter>
                    <UsersAdm test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const deleteButton=(await screen.findAllByText('Excluir'))[0]

        fireEvent.click(deleteButton)

        expect(screen.getByText('Tem certeza que deseja excluir o usuário Maria Eunice?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Não'))
        
        const warning=screen.queryByText('Tem certeza que deseja excluir o usuário Maria Eunice?')

        expect(warning).toBeFalsy()

        //action buttons appear when warning is activated

        const deleteButtons=screen.queryAllByText('Excluir')
        
        expect(deleteButtons.length).not.toBe(0)

        
    })
})