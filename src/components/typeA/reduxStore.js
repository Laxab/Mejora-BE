
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    cartCount:0,
    cartItems: [],
    cartUser:{},
    products:[],
    backdrop:{status:false},
    banner:{category:"OIL_PRODUCTS"},
    sidenav:[{name:"Orders", icon:"DA", listing:false},{name:"Inventory", icon:"IN", listing:true}]
};

function reducer(state = initialState, action) {
switch (action.type) {
    case 'ADD_PRODUCTS':
        return{
            ...state, products:[...state.products, action.payload]
        }
    case 'EDIT_PRODUCTS':
        return {
            ...state,
            products: state.products.map(item => {
                if((item.pid === action.payload.pid)&&(item.did === action.payload.did)){
                    return {...item, selected: action.action}
                }
                return item;
            })
        }
    case 'UPDATE_CARTCOUNT':
        return { ...state, cartCount: action.count};
    case 'CHANGE_CATEGORY':
        return { ...state, banner:{...state.banner,category:action.payload}};
    case 'CART_ADD':
        return {...state, cartCount: state.cartCount + 1,cartItems:[...state.cartItems,action.payload]}
    case 'CART_ITEMSUPDATE':
        return {
            ...state,
            cartItems: state.cartItems.map(item => {
                if((item.pid === action.payload.pid)&&(item.did === action.payload.did)){
                    return {...item, totalItems: action.totalItems, totalMrp: action.totalMrp}
                }
                return item;
            })
        }
    case 'CART_DELETE':{
        return {
            ...state, 
            cartCount: action.count,
            cartItems:state.cartItems.filter(item => !(item.pid === action.payload.pid && item.did === action.payload.did))
        }
    }
    case 'CART_DELETE_ALL':
        return {...state, cartCount: 0,cartItems:[]}
    case 'CART_USER':
        return {...state ,cartUser:action.payload}
    case 'BACKDROP_OFF':
        return {...state, backdrop:{...state.backdrop,status:false}}
    case 'BACKDROP_ON':
        return {...state, backdrop:{...state.backdrop,status:true}}
    default:
    return state;
}
}

const store = configureStore({
reducer
});

export default store;