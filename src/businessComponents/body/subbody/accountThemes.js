
import { colorBankAlpha, color, colorBankBravo } from "../../others/others_colors"

const accountThemes = () =>{

    const temp = ["Identity", "RBAC", "Sessions", "WAF", "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kite", "Lima", "Mike", "November", "Oscar", "Peter", "Quebec", "Romeo", "Sierra", "Tango", "Umbrella", "Victor", "Wiskey", "Xmas", "Yankee", "Zebra"]

    const dispColorBox = (color, i) =>{

        if(i%10 === 0){
            return <>
                <tr style={{margin:'0px',padding:'0px',borderCollapse:'collapse',border:'0px solid red'}}></tr>
                <td style={{borderCollapse:'collapse',background:`${color}`,width:'100px',height:'50px',color:'#fff',display:'flex'}}>
                    <div style={{margin:'auto'}}>
                        {color}
                    </div>
                </td>
            </>
        }
        else {
            return <td style={{borderCollapse:'collapse',background:`${color}`,width:'100px',height:'50px',color:'#fff'}}>
                <div style={{margin:'auto'}}>
                    {color}
                </div>
            </td>
        }

    }

    return <div style={{margin:'20px'}}>

        <div style={{margin:'20px'}}>colorBankAlpha ({colorBankAlpha.length})</div>
        <table style={{width:'1000px',borderCollapse:'collapse',border:'0px solid red',fontSize:'small'}}>
        {
            colorBankAlpha.map((item, i)=>{
                return dispColorBox(item, i)
            })
        }
        </table>

        <div style={{margin:'20px'}}>colorBankBravo ({colorBankBravo.length})</div>
        <table style={{width:'1000px',borderCollapse:'collapse',border:'0px solid red',fontSize:'small'}}>
        {
            colorBankBravo.map((item, i)=>{
                return dispColorBox(item, i)
            })
        }
        </table>
        <div style={{margin:'20px'}}>&nbsp;</div>

        {

            temp.map((item,index)=>(
                <div key={index} 
                    style={{height:'60px',display:'flex',justifyContent:'flex-start'}}>
                    <div style={{display:'flex',margin:"auto 5px auto 20px",borderRadius:'5px',background:`${color(item)[0]}`,color:'#fff',height:'40px',width:'40px'}}>
                        <div style={{display:'flex',margin:'auto'}}><b>{item.slice(0,2)}</b></div>
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