import {fireEvent, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestUserMainAdmin } from '../../store';
import '@testing-library/jest-dom'
import Profile from '../../Pages/Profile/Profile';

describe('Profile',()=>{

    function renderProfile(){
        render(
            <Provider store={storeTestUserMainAdmin}>
                <BrowserRouter>
                    <Profile test='true'/>
                </BrowserRouter>
            </Provider>
        )
    }

    it('Render Loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()

    })

    it('Render inputs disabled',()=>{
        
        renderProfile()

        expect(screen.getByTestId('nameDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('emailDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('birthdayDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('genderDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('cpfDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('rgDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('phoneDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('stateDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('cityDisabled')).toBeInTheDocument()
        expect(screen.getByText('Editar usuário')).toBeInTheDocument()
        
    })

    it('Render inputs actives',()=>{

        renderProfile()

        fireEvent.click(screen.getByText('Editar usuário'))

        expect(screen.getByTestId('name')).toBeInTheDocument()
        expect(screen.getByTestId('birthday')).toBeInTheDocument()
        expect(screen.getByTestId('gender')).toBeInTheDocument()
        expect(screen.getByTestId('phone')).toBeInTheDocument()
        
        expect(screen.getByText('Cancelar')).toBeInTheDocument()
        expect(screen.getByText('Editar')).toBeInTheDocument()
        
    })

    it('Open and close edit form',()=>{

        renderProfile()

        fireEvent.click(screen.getByText('Editar usuário'))

        expect(screen.getByTestId('name')).toBeInTheDocument()
        expect(screen.getByTestId('birthday')).toBeInTheDocument()
        expect(screen.getByTestId('gender')).toBeInTheDocument()
        expect(screen.getByTestId('phone')).toBeInTheDocument()
        
        expect(screen.getByText('Cancelar')).toBeInTheDocument()
        expect(screen.getByText('Editar')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Cancelar'))

        expect(screen.getByTestId('nameDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('emailDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('birthdayDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('genderDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('cpfDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('rgDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('phoneDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('stateDisabled')).toBeInTheDocument()
        expect(screen.getByTestId('cityDisabled')).toBeInTheDocument()
        expect(screen.getByText('Editar usuário')).toBeInTheDocument()
        
    })

})