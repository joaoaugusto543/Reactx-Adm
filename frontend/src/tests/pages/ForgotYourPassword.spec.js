import {fireEvent, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { storeTestCommonAdministrator } from '../../store';
import '@testing-library/jest-dom'
import ForgotYourPassword from '../../Pages/ForgotYourPassword/ForgotYourPassword'


describe('ForgotYourPassword',()=>{

    it('Render form code',()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <ForgotYourPassword test={true}/>
                </BrowserRouter>
            </Provider>
        )

        fireEvent.click(screen.getByText('Enviar'))

        expect(screen.getByTestId('formCode')).toBeInTheDocument()

 
    })

})