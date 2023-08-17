




export const color = (word) =>{
    const min = 0;
    const gradients = ["#9A1572","#15729A","#159A5E","#869A15","#BB830B","#32BAB4","#5932BA","#BA3232"]
    const max = gradients.length - 1;
    let hash = 0;
  
    for (let i = 0; i < word.length; i++) {
        hash += word.charCodeAt(i);
    }
    
    const range = max - min + 1;
    const scaledHash = hash % range;

    const val =  min + scaledHash;
    
    return gradients[val]

}


const Box = (props) =>{
    const {dim, txt} = props
    const style={
        width:dim,
        height:dim,
        background:color(txt),
        color:"#fff",
        display:"flex",
        borderRadius:'5px',
        fontSize:`calc(${dim}/2)`
    }
    return <div style={style}>
        <div style={{display:'flex', margin:'auto'}}><b>{txt}</b></div>
    </div>
}



export {Box}
export default {color};