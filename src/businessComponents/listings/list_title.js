import {MdOutlineSettings} from 'react-icons/md'


const ListTitle = (props) =>{
    const {title} = props

    return <div className="stdBorder" style={{borderTop:"0px",borderLeft:"0px",borderRight:"0px",height:'60px',display:'flex'}}>

        <div className="mainTitleIcons" style={{display:'flex',width:'100%',margin:'0px auto 0px 20px',border:'0px dashed #666'}}>

            <div style={{display:'flex',marginRight:'10px',borderRadius:'5px',background:`#eee`,color:'#888',height:'40px',width:'40px'}}><MdOutlineSettings style={{fontSize:'25px',display:'flex',margin:'auto'}}/></div>
            <b>{title}</b>
        </div>

    </div>

}

export default ListTitle