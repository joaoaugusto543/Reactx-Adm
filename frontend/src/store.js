import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlices'
import usersAdmReducer from './slices/userAdmSlices'
import usersWaitingReducer from './slices/userWaitingSlices'
import usersReducer from './slices/userSlices'
import accountReducer from './slices/accountsSlices'
import usersBannedReducer from './slices/usersBannedSlices'
import creditReducer from './slices/creditSlices'
import codeReducer from './slices/codeSlices'
import { createStore } from 'redux'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        userAdm:usersAdmReducer,
        userWaiting:usersWaitingReducer,
        user:usersReducer,
        account:accountReducer,
        userBanned:usersBannedReducer,
        credit:creditReducer,
        code:codeReducer
    }
})

//tests

const initialState={
    userAdm:{
        loading:false,
        userAdm:{
            id: '9a0c1bac-fcb1-4f0d-8b18-28cb05656fe4',
            name: 'João Augusto Correia Lopes',
            email: 'joaoaugustoclopes@gmail.com',
            cpf: '338.192.710-82',
            rg: '21.437.252-6',
            phone: '(85) 3392-8960',
            birthday: '02/06/2005',
            gender: 'Masculino',
            state: 'RS',
            city: 'Taquara',
            mainadmin: true
        },

        usersAdm:[
            {
                id: '9a0c1bac-fcb1-4f0d-8b18-28cb05656fe4',
                name: 'João Augusto Correia Lopes',
                email: 'joaoaugustoclopes@gmail.com',
                cpf: '338.192.710-82',
                rg: '21.437.252-6',
                phone: '(85) 3392-8960',
                birthday: '02/06/2005',
                gender: 'Masculino',
                state: 'RS',
                city: 'Taquara',
                mainadmin: false  
            },
            {
                id: '8e830fee-9bd4-4142-8c03-f8bde85dd48a',
                name: 'Maria Eunice',
                email: 'mariaecorreialopes@gmail.com',
                cpf: '844.901.668-18',
                rg: '46.685.153-2',
                phone: '(81) 3661-2852',
                birthday: '07/06/1945',
                gender: 'Feminino',
                state: 'PB',
                city: 'Areial',
                mainadmin: false
            }
    ]
    },

    userWaiting:{
        loading:false,
        userWaiting:{
            id: 'f021117d-8f56-40d5-b9c3-da0c5ad86b29',
            name: 'João Augusto Correia Lopes',
            email: 'reactxEmail@gmail.com',
            cpf: '456.823.477-81',
            rg: '41.873.261-6',
            phone: '(33) 3295-2414',
            birthday: '06/06/2005',
            gender: 'Masculino',
            state: 'PE',
            city: 'Belém do São Francisco'
          },

        usersWaiting:[
            {
                id: 'f021117d-8f56-40d5-b9c3-da0c5ad86b29',
                name: 'João Augusto Correia Lopes',
                email: 'reactxEmail@gmail.com',
                password: '$2a$08$cQBus/O9cGT.gst7nxNT0up66aaV20k2LdgWt5Au1VqKtBNIS6VrS',
                cpf: '456.823.477-81',
                rg: '41.873.261-6',
                phone: '(33) 3295-2414',
                birthday: '06/06/2005',
                gender: 'Masculino',
                state: 'PE',
                city: 'Belém do São Francisco'
            },
            {
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                name: 'Ernesto',
                email: 'ernesto@gmail.com',
                cpf: '136.728.314-09',
                rg: '32.606.134-4',
                phone: '(79) 2817-1826',
                birthday: '06/06/2005',
                gender: 'Masculino',
                state: 'PE',
                city: 'Belém do São Francisco'
            }
        ]
    },
    user:{
        loading:false,
        user:{
            id: '60a35fb6-d542-4ad0-98d3-70a5adf13881',
            name: 'Mineira',
            email: 'mineira@gmail.com',
            cpf: '701.837.383-22',
            rg: '34.624.624-6',
            phone: '(85) 3454-0228',
            birthday: '01/01/2005',
            gender: 'Feminino',
            state: 'PR',
            city: 'Pinhais',
            idaccount: 'bac0efc2-4ee5-4617-8a74-9aa31dbaab0a'
        },
        users:[
            {
              id: '60a35fb6-d542-4ad0-98d3-70a5adf13881',
              name: 'Mineira',
              email: 'mineira@gmail.com',
              cpf: '701.837.383-22',
              rg: '34.624.624-6',
              phone: '(85) 3454-0228',
              birthday: '01/01/2005',
              gender: 'Feminino',
              state: 'PR',
              city: 'Pinhais',
              idaccount: 'bac0efc2-4ee5-4617-8a74-9aa31dbaab0a'
            },
            {
                id: '16a4f8ff-eecf-413e-ab85-094e56b033d6',
                name: 'João Francisco de Vargas Lopes',
                email: 'reactxEmail@gmail.com',
                cpf: '956.948.628-72',
                rg: '22.551.742-4',
                phone: '(63) 3239-9079',
                birthday: '23/09/1962',
                gender: 'Masculino',
                state: 'RS',
                city: 'Cachoeira do Sul',
                idaccount: 'c62ea49a-3090-4ceb-9daa-2817d62f0905'
              }
        ]
    },

    userBanned:{
        loading:false,
        userBanned:{
            id: '30e4e591-9887-4916-9844-f19753ddc9eb',
            name: 'Lopes',
            email: 'reactxEmail@gmail.com',
            cpf: '834.943.513-50',
            rg: '34.876.386-3',
            phone: '(14) 2380-2307',
            birthday: '07/06/2005',
            gender: 'Masculino',
            state: 'PE',
            city: 'Barreiros',
        },

        usersBanned:[
            {
                id: '30e4e591-9887-4916-9844-f19753ddc9eb',
                name: 'Lopes',
                email: 'reactxEmail@gmail.com',
                cpf: '834.943.513-50',
                rg: '34.876.386-3',
                phone: '(14) 2380-2307',
                birthday: '07/06/2005',
                gender: 'Masculino',
                state: 'PE',
                city: 'Barreiros',
              },
              {
                id: '480f905c-538f-49bb-a7bc-93a41ab22044',
                name: 'Lopes Matheus',
                email: 'reactxEmail@gmail.com',
                cpf: '977.121.938-35',
                rg: '15.183.064-3',
                phone: '(85) 3392-8960',
                birthday: '07/06/2005',
                gender: 'Feminino',
                state: 'PR',
                city: 'Arapongas',
              }
        ]
    },

    account:{
        account:{
            id: 'bac0efc2-4ee5-4617-8a74-9aa31dbaab0a',
            code: '0805 / 07044-9',
            credit: 0,
            money: 100,
            extrato: []
        }
    },

    credit:{
        creditApplications:[
            {
              id: '60a35fb6-d542-4ad0-98d3-70a5adf13881',
              name: 'Mineira',
              email: 'mineira@gmail.com',
              cpf: '701.837.383-22',
              rg: '34.624.624-6',
              phone: '(85) 3454-0228',
              birthday: '01/01/2005',
              gender: 'Feminino',
              state: 'PR',
              city: 'Pinhais',
              idaccount: 'bac0efc2-4ee5-4617-8a74-9aa31dbaab0a',
              value:200
            },
            {
                id: '16a4f8ff-eecf-413e-ab85-094e56b033d6',
                name: 'João Francisco de Vargas Lopes',
                email: 'reactEmail@hotmail.com',
                cpf: '956.948.628-72',
                rg: '22.551.742-4',
                phone: '(63) 3239-9079',
                birthday: '23/09/1962',
                gender: 'Masculino',
                state: 'RS',
                city: 'Cachoeira do Sul',
                idaccount: 'c62ea49a-3090-4ceb-9daa-2817d62f0905',
                value:200
            }
        ],

        requestedCredits:{
              id: '60a35fb6-d542-4ad0-98d3-70a5adf13881',
              name: 'Mineira',
              email: 'mineira@gmail.com',
              cpf: '701.837.383-22',
              rg: '34.624.624-6',
              phone: '(85) 3454-0228',
              birthday: '01/01/2005',
              gender: 'Feminino',
              state: 'PR',
              city: 'Pinhais',
              idaccount: 'bac0efc2-4ee5-4617-8a74-9aa31dbaab0a',
              value:200
        }
    },

    code:{
        encryptedCode:'yfg2q6g23trffe325234d'
    }
    
    
}

const stateUserMainAdmin={
   ...initialState,
   auth:{
    loading:false,
    auth:{
        id: '9a0c1bac-fcb1-4f0d-8b18-28cb05656fe4',
        name: 'João Augusto Correia Lopes',
        email: 'reactxTest@gmail.com',
        mainadmin: true
    }
   }
}

const reducerUserMainAdmin=(state=stateUserMainAdmin)=>{
    return state
}

export const storeTestUserMainAdmin=createStore(reducerUserMainAdmin)

const stateUserCommonAdministrator={
    ...initialState,
    auth:{
        loading:false,
        auth:{
            id: '9a0c1bac-fcb1-4f0d-8b18-28cb05656fe4',
            name: 'João Augusto Correia Lopes',
            email: 'reactxTest@gmail.com',
            mainadmin: false
        }
       }
}

const reducerCommonAdministrator=(state=stateUserCommonAdministrator)=>{
    return state
}

export const storeTestCommonAdministrator=createStore(reducerCommonAdministrator)





