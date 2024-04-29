import { useSelector } from "react-redux"


const ReduxDebug = () =>{

    const state = useSelector(state => state)

    return <div>
    
    {
        state.reduxdebugger
        &&
        <pre style={{padding:'50px',height:'60vh',background:'#222222',position:'absolute',right:'10px',color:'#74FA6B',bottom:'10px',overflow:'auto'}}>
            {JSON.stringify(state,2,2)}
        </pre>
    }

    </div>
}

export default ReduxDebug