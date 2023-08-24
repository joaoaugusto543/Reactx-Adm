import {render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator} from '../../store';
import '@testing-library/jest-dom'
import UserWaiting from '../../Pages/userWaiting/userWaiting';


describe('UserWaiting',()=>{

    it('Render loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserWaiting/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()
        
    })

    it('Render admin user waiting information',()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UserWaiting test={true}/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByText('João Augusto Correia Lopes')).toBeInTheDocument()
        expect(screen.getByText('reactxEmail@gmail.com')).toBeInTheDocument()
        expect(screen.getByText('Masculino')).toBeInTheDocument()
        expect(screen.getByText('06/06/2005')).toBeInTheDocument()
        expect(screen.getByText('(33) 3295-2414')).toBeInTheDocument()
        expect(screen.getByText('456.823.477-81')).toBeInTheDocument()
        expect(screen.getByText('41.873.261-6')).toBeInTheDocument()
        expect(screen.getByText('PE')).toBeInTheDocument()
        expect(screen.getByText('Belém do São Francisco')).toBeInTheDocument()
        expect(screen.getByTestId('back')).toBeInTheDocument()
        expect(screen.getByTestId('backMobile')).toBeInTheDocument()

    })

})