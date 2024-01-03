


function getInitials(fullName) {
    var words = fullName?.split(" ");
    var initials = "";
    for (var i = 0; i < words?.length; i++) {
      initials += words[i].charAt(0);
    }
    return initials.toUpperCase();
  }

export const BoxInitials = (props) =>{
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
        <div style={{display:'flex', margin:'auto'}}><b>{getInitials(txt)}</b></div>
    </div>

}

export const colorBank = ['#9365DF','#2980B9','#45B39D','#D8BA41','#8C2187','#DF657E','#CD65DF','#51AF2C','#2CADAF']

export const color = (word) =>{
    const min = 0;
    const gradients = colorBank
    const max = gradients?.length - 1;
    let hash = 0;
  
    const range = max - min + 1;

    for (let i = 0; i < word?.length; i++) {
        hash += (word.charCodeAt(i));
    }
    hash=hash % range ;
    hash=hash + word?.length ;
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
export default {color};