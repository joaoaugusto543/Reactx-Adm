import {fireEvent, render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator } from '../../store';
import '@testing-library/jest-dom'
import Security from '../../Pages/Security/Security'


describe('Security',()=>{

    it('Render loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Security/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()
        
    })

    it('Render form code',()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Security test={true}/>
                </BrowserRouter>
            </Provider>
        )

        fireEvent.click(screen.getByText('Editar senha'))

        expect(screen.getByTestId('formCode')).toBeInTheDocument()

 
    })

})