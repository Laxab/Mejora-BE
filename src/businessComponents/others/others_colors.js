




export const color = (word) =>{
    const min = 0;
    const gradients = ["#4B8197","#15729A","#32BAB4","#C9844E","#9A1572","#E56868","#5932BA","#159A5E"]
    const max = gradients.length - 1;
    let hash = 0;
  
    const range = max - min + 1;

    for (let i = 0; i < word.length; i++) {
        hash += (word.charCodeAt(i));
    }
    hash=hash % range ;
    hash=hash + word.length ;
    hash=hash % range ;
    
    const scaledHash = hash % range ;

    const val =  min + scaledHash;
    
    return [gradients[val],val]

}


const Box = (props) =>{
    const {dim, txt} = props
    const style={
        width:dim,
        height:dim,
        background:color(txt)[0],
        color:"#fff",
        display:"flex",
        borderRadius:'5px',
        fontSize:`calc(${dim}/2)`
    }
    return <div style={style}>
        <div style={{display:'flex', margin:'auto'}}><b>{txt.slice(0,2)}</b></div>
    </div>
}



export {Box}
//export default {color};