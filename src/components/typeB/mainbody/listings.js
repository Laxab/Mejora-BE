
import BizListings from '../../../businessComponents/listings/bizListings'
// Redux definitions
const { useSelector } = require("react-redux")

const Listings = (props) =>{

    // Primary Definitions
    const state     = useSelector((state)=>state)
    //const dispatch  = useDispatch()

    // Secondary Definitions

    // Business Methods
    const checkListing = () =>{
        try{
            if(state.selectedMenu.isMenu.listing)
                return state.selectedMenu.isMenu.listing
            else
                return state.selectedMenu.menu[state.selectedMenu.isMenu].listing
        }
        catch{}
    }

    // JSX
    return <>
        {
            checkListing()
            ?
            <div className="listingBodyOn" style={{width:props.size}}>
                <BizListings/>
                
            </div>
            :
            <div className="listingBodyOff">
            </div>
        }
    </>
}

export default Listings