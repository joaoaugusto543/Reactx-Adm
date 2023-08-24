import {fireEvent, queryByText, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator} from '../../store';
import '@testing-library/jest-dom'
import Credits from'../../Pages/Credits/Credits'

describe('Credits', ()=>{

    it('Render Loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Credits/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()

    })

    it('Render credits',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Credits test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const links=await screen.findAllByText('Ver')

        const acceptButtons=await screen.findAllByText('Aceitar')

        const denyButtons=await screen.findAllByText('Aceitar')

        links.map(link=>{
            expect(link).toBeInTheDocument()
        })

        acceptButtons.map(acceptButton=>{
            expect(acceptButton).toBeInTheDocument()
        })

        denyButtons.map(denyButton=>{
            expect(denyButton).toBeInTheDocument()
        })

        expect(screen.getByText('Mineira')).toBeInTheDocument()
        
    })

    it('Render warning deny',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Credits test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const denyButton=(await screen.findAllByText('Negar'))[0]

        fireEvent.click(denyButton)

        expect(screen.getByText('Tem certeza que deseja negar o pedido do usuário Mineira?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

         //action buttons disappear when warning is activated

         const acceptButtons=screen.queryByText('Aceitar')
         const buttonDenys=screen.queryByText('Negar')
 
         expect(acceptButtons).toBeFalsy()
         expect(buttonDenys).toBeFalsy()

        
    })

    it('Close warning deny',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Credits test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const denyButton=(await screen.findAllByText('Negar'))[0]

        fireEvent.click(denyButton)

        expect(screen.getByText('Tem certeza que deseja negar o pedido do usuário Mineira?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Não'))
        
        const warning=screen.queryByText('Tem certeza que deseja negar o pedido do usuário Mineira?')

        expect(warning).toBeFalsy()

        
        //action buttons appear when warning is activated

        const acceptButtons=await screen.queryAllByText('Aceitar')
        const buttonDenys=await screen.queryAllByText('Negar')

        expect(acceptButtons.length).not.toBe(0)
        expect(buttonDenys.length).not.toBe(0)
        
    })

    it('Render warning accept',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Credits test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const acceptButton=(await screen.findAllByText('Aceitar'))[0]

        fireEvent.click(acceptButton)

        expect(screen.getByText('Tem certeza que deseja aceitar o pedido do usuário Mineira?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        //action buttons disappear when warning is activated

        const acceptButtons=screen.queryByText('Aceitar')
        const buttonDenys=screen.queryByText('Negar')

        expect(acceptButtons).toBeFalsy()
        expect(buttonDenys).toBeFalsy()

        
    })

    it('Close warning accept',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Credits test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const acceptButton=(await screen.findAllByText('Aceitar'))[0]

        fireEvent.click(acceptButton)

        expect(screen.getByText('Tem certeza que deseja aceitar o pedido do usuário Mineira?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Não'))
        
        const warning=screen.queryByText('Tem certeza que deseja aceitar o pedido do usuário Mineira?')

        expect(warning).toBeFalsy()

        //action buttons appear when warning is activated

        const acceptButtons=await screen.queryAllByText('Aceitar')
        const buttonDenys=await screen.queryAllByText('Negar')

        expect(acceptButtons.length).not.toBe(0)
        expect(buttonDenys.length).not.toBe(0)
        
    })

})