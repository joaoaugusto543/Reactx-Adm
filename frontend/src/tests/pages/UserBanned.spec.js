import {render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator} from '../../store';
import '@testing-library/jest-dom'
import UserBanned from '../../Pages/UserBanned/UserBanned';


describe('UserBanned',()=>{

    it('Render loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserBanned/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()
        
    })

    it('Render user banned information',()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <UserBanned test={true}/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByText('Lopes')).toBeInTheDocument()
        expect(screen.getByText('reactxEmail@gmail.com')).toBeInTheDocument()
        expect(screen.getByText('Masculino')).toBeInTheDocument()
        expect(screen.getByText('07/06/2005')).toBeInTheDocument()
        expect(screen.getByText('(14) 2380-2307')).toBeInTheDocument()
        expect(screen.getByText('834.943.513-50')).toBeInTheDocument()
        expect(screen.getByText('34.876.386-3')).toBeInTheDocument()
        expect(screen.getByText('PE')).toBeInTheDocument()
        expect(screen.getByText('Barreiros')).toBeInTheDocument()
        expect(screen.getByText('0805 / 07044-9')).toBeInTheDocument()
        expect(screen.getByText('R$ 100')).toBeInTheDocument()
        expect(screen.getByText('R$ 0')).toBeInTheDocument()
        expect(screen.getByTestId('back')).toBeInTheDocument()
        expect(screen.getByTestId('backMobile')).toBeInTheDocument()

    })

    

})