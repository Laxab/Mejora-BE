
import assetSelection from './sketches/br_assetSelection.png'
import collaboration from './sketches/collaboration.svg'
import br_noData from './sketches/br_noData.png'
import br_noData2 from './sketches/br_noData2.png'

const BO_sket_main = (prop) =>{
    const {title, select} = prop

    const imageLoad = (select) => {
        if(select === 'assetSelection')
            return <img src={assetSelection} style={{height:'350px'}} alt="" />
        else if(select === 'collaboration')
            return <img src={collaboration} style={{height:'350px'}} alt="" />
        else if(select === 'br_noData')
            return <img src={br_noData} style={{height:'350px'}} alt="" />
        else if(select === 'br_noData2')
            return <img src={br_noData2} style={{height:'350px'}} alt="" />

    }

    const sketching = (select) =>{
        return  <div>
            <h2 style={{marginTop:'20px'}}>{title}</h2>
            <div style={{marginTop:'0px'}}>{imageLoad(select)}</div>
        </div>
    }

    return <div>
        {
            sketching(select)
        }
        <a style={{fontSize:'small',letterSpacing:'1px',position:'absolute',bottom:'10px',right:'10px'}} rel="noreferrer" href="https://storyset.com/" target="_blank">Image by Storyset</a>
    </div>
}
export default BO_sket_main