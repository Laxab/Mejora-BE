import { BarChart, Bar, XAxis, YAxis, Area, Tooltip, AreaChart, LineChart, Line, PieChart, Pie } from 'recharts';
import { BsBarChartFill } from "react-icons/bs";
import { FaChartPie, FaChartLine, FaChartArea } from "react-icons/fa";
import { charlieColors } from '../../../others/others_colors';
import { Box } from '../../../others/others_colors';
import { useSelector } from 'react-redux';


const renderIcon = (icon) =>{

    if(icon==="Bar Graph") return <BsBarChartFill/>
    else if(icon==="Area Graph") return <FaChartArea/>
    else if(icon==="Line Graph") return <FaChartLine/>
    else if(icon==="Pie Chart") return <FaChartPie/>
    else return <FaChartPie/>
}

const renderHeader = (title,type) => {
    return  <div className="stdBorder" style={{display:'flex',borderLeft:'0px',borderRight:'0px',borderTop:'0px',padding:'20px', textAlign:'left'}}>
                <div style={{margin:'auto auto auto 0px', display:'flex'}}>
                    <Box dim={'45px'} txt={title?.replace(/\s/g, '')}/>

                    <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 10px',textAlign:'left'}}>
                        <div style={{fontSize:'large'}}><b>{title}</b></div>
                    </div>
                </div>
                <div style={{margin:'auto 0px auto auto'}}>
                    <div className='backgroundColor2Shade1' style={{padding:'7px 10px 5px 10px',borderRadius:'3px'}}>
                        {renderIcon(type)}
                    </div>
                </div>
            </div>
}


export const RenderChart = (props) =>{
    const state = useSelector(state => state)
    const {data, title, chartType} = props;

    if(chartType==="Bar Graph") return ReBarChart(data,title,chartType)
    else if(chartType==="Area Graph") return ReAreaChart(data,title,chartType)
    else if(chartType==="Line Graph") return ReLineChart(data,title,chartType)
    else if(chartType==="Pie Chart") return RePieChart(data,title,chartType)
    else if(chartType==="Counter Small") return CounterSmall(data,title,chartType)
}

export function formatNumber(number) {
    if (number >= 1e9) { // 1 billion
      const formattedNumber = (number / 1e9).toFixed(1);
      return `${formattedNumber} B`;
    } else if (number >= 1e6) { // 1 million
      const formattedNumber = (number / 1e6).toFixed(1);
      return `${formattedNumber} M`;
    } else if (number >= 1e3) { // 1 thousand
      const formattedNumber = (number / 1e3).toFixed(1);
      return `${formattedNumber} K`;
    }
    return number.toString();
  }
export const CounterSmall = (data, title,chartType) =>{
    try{
        const keys = Object.keys(data[0])?.slice(1,Object.keys(data[0]).length);
        return <div style={{width:'100%', display:'flex'}}>
            <div className="stdBackground stdBorder" style={{margin:'auto', borderRadius:'9px', height:'130px', display:'flex'}}>

                <div style={{textAlign:'left',padding:'0px 20px', margin:'auto'}}>
                    <div style={{display:'flex'}}>
                        <div style={{padding:'5px 0px 10px 0px', width:'160px'}}>
                            <div style={{fontSize:'small'}}>{Object.keys(data[0])}</div>
                            {
                                formatNumber(data[0][Object.keys(data[0])[0]]).length > 3
                                ?
                                <div style={{ paddingTop: '0px', fontSize: '40px'}}>
                                    <b>{formatNumber(data[0][Object.keys(data[0])[0]])}</b>
                                </div>
                                :
                                <div style={{ paddingTop: '0px', fontSize: '50px'}}>
                                    <b>{formatNumber(data[0][Object.keys(data[0])[0]])}</b>
                                </div>
                            }

                        </div>
                        <div style={{margin:'auto auto auto auto'}}>
                            <Box dim={'45px'} txt={title?.replace(/\s/g, '')} />
                        </div>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <b>{title}</b>
                    </div>
                </div>
            </div>
        </div>
    }
    catch{return <div style={{width:'100%', display:'flex'}}></div>}
}

export const RePieChart = (data, title,chartType) =>{
    try{
        const keys = Object.keys(data[0])?.slice(1,Object.keys(data[0]).length);
        return <div style={{width:'100%', display:'flex'}}>
            <div className="stdBackground stdBorder" style={{margin:'auto', borderRadius:'9px'}}>
                {renderHeader(title,chartType)}
                <div style={{padding:'20px'}}>
                    <PieChart width={300+(20*keys.length)} height={235+(20*keys.length)}>
                        {
                            keys.map((item,i)=>{
                                const   pieKey = item
                                const   data2= data.map(item => ({
                                            ...item,
                                            [pieKey]: parseInt(item[pieKey], 10)
                                        }));
                                if(i===0)
                                    return  <Pie 
                                                data={data2} 
                                                dataKey={pieKey} 
                                                cx="50%" cy="50%" 
                                                innerRadius={40} outerRadius={90} 
                                                fill={charlieColors(pieKey)} 
                                                label
                                            />
                                else
                                    return  <Pie 
                                                data={data2} 
                                                dataKey={pieKey} 
                                                cx="50%" cy="50%" 
                                                innerRadius={70+(i*10)} outerRadius={90+(i*10)} 
                                                fill={charlieColors(pieKey)} 
                                                label 
                                            />
                            })
                        }
                    </PieChart>
                </div>
            </div>
        </div>
    }
    catch{return <div style={{width:'100%', display:'flex'}}></div>}
}

export const ReBarChart = (data, title,chartType) =>{
    try{
        const keys = Object.keys(data[0])?.slice(1,Object.keys(data[0]).length);
        return <div style={{width:'100%', display:'flex'}}>
            <div className="stdBackground stdBorder" style={{margin:'auto', borderRadius:'9px'}}>
                {renderHeader(title,chartType)}
                <div style={{padding:'20px'}}>
                    <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{top: 20,right: 30,left: 20,bottom: 5}}
                    >
                        <XAxis dataKey={Object?.keys(data[0])[0]} style={{fontSize:'small'}} />
                        <YAxis style={{fontSize:'small'}} />
                        <Tooltip />
                        {
                            keys.map((item,i)=>(
                                <Bar dataKey={item} stackId="a" fill={charlieColors(item)} />
                            ))
                        }
                    </BarChart>
                </div>
            </div>
        </div>
    }
    catch{return <div style={{width:'100%', display:'flex'}}></div>}
}

const ReAreaChart = (data, title,chartType) =>{
    //const {data, title, chartType} = props;
    try{
        const keys = Object.keys(data[0])?.slice(1,Object.keys(data[0]).length);
        return <div style={{width:'100%', display:'flex'}}>
            <div className="stdBackground stdBorder" style={{margin:'auto', borderRadius:'9px'}}>
                {renderHeader(title,chartType)}
                <div style={{padding:'20px'}}>
                    <AreaChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{top: 20,right: 30,left: 20,bottom: 5}}
                    >
                        <XAxis dataKey={Object?.keys(data[0])[0]} style={{fontSize:'small'}} />
                        <YAxis style={{fontSize:'small'}} />
                        <Tooltip />
                        {
                            keys.map((item,i)=>(
                                <Area dataKey={item} stackId="a" fill={charlieColors(item)} />
                            ))
                        }
                    </AreaChart>
                </div>
            </div>
        </div>
    }
    catch{return <div style={{width:'100%', display:'flex'}}></div>}
}

const ReLineChart = (data, title,chartType) =>{
    try{
        const keys = Object.keys(data[0])?.slice(1,Object.keys(data[0]).length);
        return <div style={{width:'100%', display:'flex'}}>
            <div className="stdBackground stdBorder" style={{margin:'auto', borderRadius:'9px'}}>
                {renderHeader(title,chartType)}
                <div style={{padding:'20px'}}>
                    <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{top: 20,right: 30,left: 20,bottom: 5}}
                    >
                        <XAxis dataKey={Object?.keys(data[0])[0]} style={{fontSize:'small'}} />
                        <YAxis style={{fontSize:'small'}} />
                        <Tooltip />
                        {
                            keys.map((item,i)=>(
                                <Line dataKey={item} stackId="a" fill={charlieColors(item)} />
                            ))
                        }
                    </LineChart>
                </div>
            </div>
        </div>
    }
    catch{return <div style={{width:'100%', display:'flex'}}></div>}
}