import {fireEvent, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator } from '../../store';
import '@testing-library/jest-dom'
import UsersWaiting from '../../Pages/UsersWaiting/UsersWaiting';

describe('UsersWaiting', ()=>{

    it('Render Loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UsersWaiting/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()

    })

    it('Render users waiting',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersWaiting test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const links=await screen.findAllByText('Ver')

        const buttonAuthorizes=await screen.findAllByText('Autorizar')

        const denyButtons=await screen.findAllByText('Negar')

        links.map(link=>{
            expect(link).toBeInTheDocument()
        })

        buttonAuthorizes.map(buttonAuthorize=>{
            expect(buttonAuthorize).toBeInTheDocument()
        })

        denyButtons.map(denyButton=>{
            expect(denyButton).toBeInTheDocument()
        })

        expect(screen.getByText('João Augusto Correia Lopes')).toBeInTheDocument()
        
    })

    it('Render warning deny',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersWaiting test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const buttonAuthorize=(await screen.findAllByText('Negar'))[0]

        fireEvent.click(buttonAuthorize)

        expect(screen.getByText('Tem certeza que deseja negar o usuário João Augusto Correia Lopes?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        //action buttons disappear when warning is activated

        const buttonsAuthorize=screen.queryByText('Autorizar')
        const buttonsDeny=screen.queryByText('Negar')
 
        expect(buttonsAuthorize).toBeFalsy()
        expect(buttonsDeny).toBeFalsy()
        
    })

    it('Render warning authorization',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersWaiting test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const buttonAuthorize=(await screen.findAllByText('Autorizar'))[0]

        fireEvent.click(buttonAuthorize)

        expect(screen.getByText('Tem certeza que deseja autorizar o usuário João Augusto Correia Lopes?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        //action buttons disappear when warning is activated

        const buttonsAuthorize=screen.queryByText('Autorizar')
        const buttonsDeny=screen.queryByText('Negar')
 
        expect(buttonsAuthorize).toBeFalsy()
        expect(buttonsDeny).toBeFalsy()
        
    })

    it('Close warning deny',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersWaiting test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const buttonAuthorize=(await screen.findAllByText('Negar'))[0]

        fireEvent.click(buttonAuthorize)

        expect(screen.getByText('Tem certeza que deseja negar o usuário João Augusto Correia Lopes?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Não'))
        
        const warning=screen.queryByText('Tem certeza que deseja negar o usuário João Augusto Correia Lopes?')

        expect(warning).toBeFalsy()

        
        //action buttons appear when warning is activated

        const buttonsAuthorize=await screen.queryAllByText('Autorizar')
        const buttonsDeny=await screen.queryAllByText('Negar')

        expect(buttonsAuthorize.length).not.toBe(0)
        expect(buttonsDeny.length).not.toBe(0)
        
    })

    it('Close warning authorization',async ()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UsersWaiting test={true}/>
                </BrowserRouter>
            </Provider>
        )

        const buttonAuthorize=(await screen.findAllByText('Autorizar'))[0]

        fireEvent.click(buttonAuthorize)

        expect(screen.getByText('Tem certeza que deseja autorizar o usuário João Augusto Correia Lopes?')).toBeInTheDocument()
        expect(screen.getByText('Sim')).toBeInTheDocument()
        expect(screen.getByText('Não')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Não'))
        
        const warning=screen.queryByText('Tem certeza que deseja autorizar o usuário João Augusto Correia Lopes?')

        expect(warning).toBeFalsy()

        const buttonsAuthorize=await screen.queryAllByText('Autorizar')
        const buttonsDeny=await screen.queryAllByText('Negar')

        expect(buttonsAuthorize.length).not.toBe(0)
        expect(buttonsDeny.length).not.toBe(0)
        
    })


})