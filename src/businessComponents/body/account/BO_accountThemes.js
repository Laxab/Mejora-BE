
import { colorBankAlpha, color, colorBankBravo } from "../../others/others_colors"
import {icon} from '../../../components/typeC/icons'

const accountThemes = () =>{

    const temp = ["Identity", "RBAC", "Sessions", "WAF", "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kite", "Lima", "Mike", "November", "Oscar", "Peter", "Quebec", "Romeo", "Sierra", "Tango", "Umbrella", "Victor", "Wiskey", "Xmas", "Yankee", "Zebra"]

    const printTitle = (data) =>{
        return <div style={{display:'flex',margin:'20px 0px 10px 0px'}}>
            <div 
                className="backgroundShaded10" 
                style={{padding:'10px 15px',margin:'auto',borderRadius:'5px'}}
            >
                <h3>{data}</h3>
            </div>
        </div>
    }
    const dispColorBox = (color, i) =>{

        if(i%10 === 0){
            return <>
                <tr style={{margin:'0px',padding:'0px',borderCollapse:'collapse',border:'0px solid red'}}></tr>
                <td style={{borderCollapse:'collapse',background:`${color}`,width:'100px',height:'50px',color:'#fff',display:'flex'}}>
                    <div style={{margin:'auto',color:'#fff'}}>
                        {color}
                    </div>
                </td>
            </>
        }
        else {
            return <td style={{borderCollapse:'collapse',background:`${color}`,width:'100px',height:'50px',color:'#fff'}}>
                <div style={{margin:'auto',color:'#fff'}}>
                    {color}
                </div>
            </td>
        }

    }
    const iconName = [
        "MdDashboard", "MdAssessment", "MdInventory", "MdAccountCircle", "MdAdminPanelSettings",
        "LuSettings",
        "FaBusinessTime",
        "RiBillFill", "RiBook2Fill","RiMoneyPoundCircleFill","RiMoneyDollarCircleFill",
        "BsFillPeopleFill",
        "IoIosPeople","IoIosChatbubbles","IoMdSettings","IoIosSpeedometer",
        "PiShareNetworkFill",
        "TbReportSearch"
      ]

    return <div style={{margin:'20px'}}>


        {printTitle('Display Icons')}
        <div style={{display:'flex', flexWrap:'wrap',width:'1000px',border:'0px dashed red'}}>
            {
                iconName.map((item,i)=>{
                    return <div className="stdbox" style={{width:'80px',height:'75px',margin:'10px 5px', flex:'1 1 10%'}}>
                        <div style={{fontSize:'50px'}}>{icon(item)}</div>
                        <div style={{fontSize:'12px',marginTop:'-5px'}}>{item}</div>
                    </div>
                })
            }
        </div>


        {printTitle('Gradient: colorBankAlpha')}
        <table style={{width:'1000px',borderCollapse:'collapse',border:'0px solid red',fontSize:'small'}}>
        {
            colorBankAlpha.map((item, i)=>{
                return dispColorBox(item, i)
            })
        }
        </table>

        {printTitle('Gradient: colorBankBravo')}
        <table style={{width:'1000px',borderCollapse:'collapse',border:'0px solid red',fontSize:'small'}}>
        {
            colorBankBravo.map((item, i)=>{
                return dispColorBox(item, i)
            })
        }
        </table>
        <div style={{margin:'20px'}}>&nbsp;</div>


        {printTitle('Listing Visualization')}
        {

            temp.map((item,index)=>(
                <div key={index} 
                    style={{height:'60px',display:'flex',justifyContent:'flex-start'}}>
                    <div style={{display:'flex',margin:"auto 5px auto 20px",borderRadius:'5px',background:`${color(item)[0]}`,color:'#fff',height:'40px',width:'40px'}}>
                        <div style={{display:'flex',margin:'auto',color:'#fff'}}><b>{item.slice(0,2)}</b></div>
                    </div>
                    <div style={{display:'flex',margin:"auto auto auto 5px",border:'0px solid red',textAlign:'left',flexDirection:'column',width:'80%'}}>
                        <div style={{position:'relative',top:'0px'}}><b>{item}</b>,  Hash: {color(item)[1]}, Color: {color(item)[0]}</div>
                    </div>
                </div>
            ))
        }
        <div style={{margin:'20px'}}>&nbsp;</div>

    </div>
}

export default accountThemes