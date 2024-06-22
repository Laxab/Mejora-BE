import customerRepo from "../../customerBusiness/customer.repo";

const initialState = {
    businessNameShort:customerRepo.businessNameShort,
    businessName:customerRepo.businessName,
    businessUnit:customerRepo.businessUnit,
    loginPageFooter:customerRepo.loginPageFooter,
    shortLogoSize:customerRepo.shortLogoSize,
    sidenavSmallLogoSize:customerRepo.sidenavSmallLogoSize,
    sidenavLongLogoSize:customerRepo.sidenavLongLogoSize,
    counter: 0,
    theme:'lightMode', // 'lightMode' 'darkMode' 'darkContrast'
    login:false,
    loginData:{},
    sidenav:[
        {"name":"Account", "position":"bottom", "listing":false}
    ],
    listings:"",
    listingsContents:[],
    listingsLoading:false,
    body:[],
    rightBar:{state:false,title:"",body:"",width:"400px"},
    snackBar:{state:false,message:"",severity:"success"},
    bodyContents:[],
    selectedMenu:{},
    backdrop:{status:false},
    dialogbox:{status:false, title:'', body:'',response:''},
    reset:"",
    struct:[],
    colorCount:0,
    reduxdebugger:false
  };
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'COLOR_COUNT':
            return {...state, colorCount:action.payload}
        case 'STRUCT_SET':
            return {...state, struct:action.payload}
        case 'STRUCT_UNSET':
            return {...state, struct:[]}
        case 'SNACKBAR_ON':
            return {...state, snackBar:{state:true,message:action.message,severity:action.severity}}
        case 'SNACKBAR_OFF':
            return {...state, snackBar:{state:false,message:"",severity:""}}
        case 'RIGHTBAR_ON':
            return {...state,rightBar:{...state.rightBar, state:true,title:action.title,body:action.body,contents:action.contents,width:action.width}}
        case 'RIGHTBAR_OFF':
            return {...state,rightBar:{...state.rightBar, state:false,title:"",body:"",width:"400px"}}
        case 'LISTINGS_LOADING_ON':
            return {...state, listingsLoading:true}
        case 'LISTINGS_LOADING_OFF':
            return {...state, listingsLoading:false}
        case 'LISTINGS_ADD':
            return {...state, listingsContents:action.payload}
        case 'LISTINGS_OFF':
            return {...state, listingsContents:[]}
        case 'RESET':
            return {...state, reset:action.payload}
        case 'BODYCONTENTS_ADD':
            return {...state, bodyContents:action.payload}
        case 'BODYCONTENTS_OFF':
            return {...state, bodyContents:[]}
        case 'BODY_ADD':
            return {...state, body:action.payload}
        case 'BODY_OFF':
            return {...state, body:[]}
        case 'LOGIN_TRUE':
            return {...state, 
                login:true, 
                loginData:{...state.loginData, sid:action.payload, identity:action.identity},
                sidenav:action.sidenav
            }
        case 'LOGIN_FALSE':
            return {...state, login:false, loginData:{},sidenav:[]}
        case 'BACKDROP_OFF':
            return {...state, backdrop:{...state.backdrop,status:false}}
        case 'BACKDROP_ON':
            return {...state, backdrop:{...state.backdrop,status:true}}
        case 'DIALOG_ON':
            return {
                ...state,
                dialogbox: {
                    ...state.dialogbox,
                    status: true,
                    title: action.title,
                    body: action.body,
                    return: action.return
                }
            };              
        case 'DIALOG_OFF':
            return {...state, dialogbox:{...state.dialogbox, status:false, title:'', body:''}}
        case 'LIST':
            return {...state,listings:action.list}
        case 'INCREMENT':
            return {...state,counter: state.counter + 1};
        case 'DECREMENT':
            return {...state,counter: state.counter - 1};
        case 'SELECTMENU':
            return {...state,selectedMenu: action.payload};
        case 'SELECTMENUBUTTON':
            return {...state,selectedMenu: {...state.selectedMenu, isMenu:action.payload}};
        case 'CHANGETHEME':
            return {...state,theme:action.payload};
        default:
            return state;
    }
  };
  
  export default counterReducer;
  