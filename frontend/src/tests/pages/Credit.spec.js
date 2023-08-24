import {render,screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, storeTestCommonAdministrator} from '../../store';
import '@testing-library/jest-dom'
import Credit from '../../Pages/Credit/Credit'


describe('Credit',()=>{

    it('Render loader',()=>{

        //I didn't put test={true} because I wanted to see the slice pending loading

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Credit/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('Loader')).toBeInTheDocument()
        
    })

    it('Render credit information',()=>{
        render(
            <Provider store={storeTestCommonAdministrator}>
                <BrowserRouter>
                    <Credit test={true}/>
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByText('Mineira')).toBeInTheDocument()
        expect(screen.getByText('mineira@gmail.com')).toBeInTheDocument()
        expect(screen.getByText('Feminino')).toBeInTheDocument()
        expect(screen.getByText('01/01/2005')).toBeInTheDocument()
        expect(screen.getByText('(85) 3454-0228')).toBeInTheDocument()
        expect(screen.getByText('701.837.383-22')).toBeInTheDocument()
        expect(screen.getByText('34.624.624-6')).toBeInTheDocument()
        expect(screen.getByText('PR')).toBeInTheDocument()
        expect(screen.getByText('Pinhais')).toBeInTheDocument()
        expect(screen.getByText('0805 / 07044-9')).toBeInTheDocument()
        expect(screen.getByText('R$ 100')).toBeInTheDocument()
        expect(screen.getByText('R$ 0')).toBeInTheDocument()
        expect(screen.getByText('R$ 200')).toBeInTheDocument()
        expect(screen.getByTestId('back')).toBeInTheDocument()
        expect(screen.getByTestId('backMobile')).toBeInTheDocument()
 
    })

    

})