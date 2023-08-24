import {render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator } from '../../store';
import '@testing-library/jest-dom'
import UserAdm from '../../Pages/UserAdm/UserAdm';


describe('UserAdm',()=>{

    it('Render loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserAdm/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()
        
    })

    it('Render admin user information',()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UserAdm test={true}/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByText('João Augusto Correia Lopes')).toBeInTheDocument()
        expect(screen.getByText('joaoaugustoclopes@gmail.com')).toBeInTheDocument()
        expect(screen.getByText('Masculino')).toBeInTheDocument()
        expect(screen.getByText('02/06/2005')).toBeInTheDocument()
        expect(screen.getByText('(85) 3392-8960')).toBeInTheDocument()
        expect(screen.getByText('338.192.710-82')).toBeInTheDocument()
        expect(screen.getByText('21.437.252-6')).toBeInTheDocument()
        expect(screen.getByText('RS')).toBeInTheDocument()
        expect(screen.getByText('Taquara')).toBeInTheDocument()
        expect(screen.getByTestId('back')).toBeInTheDocument()
        expect(screen.getByTestId('backMobile')).toBeInTheDocument()

        
    })

    

})