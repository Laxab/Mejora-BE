
import assetSelection from './sketches/br_assetSelection.png'
import collaboration from './sketches/collaboration.svg'
import br_noData from './sketches/br_noData.png'
import br_noData2 from './sketches/br_noData2.png'

const BO_sket_main = (prop) =>{
    const {title, select} = prop

    const imageLoad = (select) => {
        if(select === 'assetSelection')
            return <img src={assetSelection} style={{height:'350px',border:'0px dashed blue',margin:'-40px -10px -10px -10px'}} alt="" />
        else if(select === 'collaboration')
            return <img src={collaboration} style={{height:'350px',border:'0px dashed blue',margin:'-40px -10px -10px -10px'}} alt="" />
        else if(select === 'br_noData')
            return <img src={br_noData} style={{height:'350px',border:'0px dashed blue',margin:'-40px -10px -10px -10px'}} alt="" />
        else if(select === 'br_noData2')
            return <img src={br_noData2} style={{height:'350px',border:'0px dashed blue',margin:'-40px -10px -10px -10px'}} alt="" />

    }

    const sketching = (select) =>{
        return  <div>
            <div style={{marginTop:'20px'}}>{imageLoad(select)}</div>
            <h3 style={{marginTop:'-30px'}}>{title}</h3>
        </div>
    }

    return <div>
        {
            sketching(select)
        }
        {/*}
        <a style={{fontSize:'small',letterSpacing:'1px',position:'absolute',bottom:'10px',right:'10px'}} rel="noreferrer" href="https://storyset.com/" target="_blank">Image by Storyset</a>
        {*/}
    </div>
}
export default BO_sket_main