
//import { useSelector } from 'react-redux'
import BizBody from '../../../businessComponents/body/bizBody'

const Body = () => {
    //const state = useSelector(state => state)
    return <div classname="scrollbarTypeDefault" style={{border:'0px dashed RED',height:'calc(100vh - 61px)',overflowY:'auto'}}>
        <BizBody/>
        
        {/*}
        <div style={{position:'fixed',width:'700px',height:'400px',background:'#fff',border:'1px dashed red',overflow:'auto',top:'40%'}}>
        
            <pre style={{textAlign:'left',paddingTop:'30px'}}>
            state.listings: {JSON.stringify(state?.listings,2,2)}
            </pre>
            <pre style={{textAlign:'left',paddingTop:'30px'}}>
            state.selectedMenu.isMenu: {JSON.stringify(state?.selectedMenu?.isMenu,2,2)}
            </pre>
            <pre style={{textAlign:'left',paddingTop:'30px'}}>
            state?.bodyContents?.rbac: {JSON.stringify(state?.bodyContents?.rbac,2,2)}
            </pre>
            <pre style={{textAlign:'left',paddingTop:'30px'}}>
            state?.selectedMenu?.menu: {JSON.stringify(state?.selectedMenu?.menu,2,2)}
            </pre>
        </div>
{*/}
    </div>
}

export default Body