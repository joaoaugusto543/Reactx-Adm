import {fireEvent, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator } from '../../store';
import '@testing-library/jest-dom'
import Users from '../../Pages/Users/Users';

describe('Users', ()=>{

    it('Render Loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Users/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()

    })

    it('Render users',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Users test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const links=await screen.findAllByText('Ver')

        const banButtons=await screen.findAllByText('Banir')

        links.map(link=>{
            expect(link).toBeInTheDocument()
        })

        banButtons.map(banButton=>{
            expect(banButton).toBeInTheDocument()
        })

        expect(screen.getByText('Mineira')).toBeInTheDocument()
        
    })

    it('Render warning ban',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Users test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const banButton=(await screen.findAllByText('Banir'))[0]

        fireEvent.click(banButton)

        expect(screen.getByText('Tem certeza que deseja banir o usuário Mineira?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        //action buttons disappear when warning is activated

        const banButtons=screen.queryByText('Banir')
        
        expect(banButtons).toBeFalsy()
        
    })

    it('Close warning ban',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Users test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const banButton=(await screen.findAllByText('Banir'))[0]

        fireEvent.click(banButton)

        expect(screen.getByText('Tem certeza que deseja banir o usuário Mineira?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Não'))
        
        const warning=screen.queryByText('Tem certeza que deseja banir o usuário Mineira?')

        expect(warning).toBeFalsy()

        //action buttons appear when warning is activated

        const banButtons=screen.queryAllByText('Banir')
        
        expect(banButtons.length).not.toBe(0)
    })


})