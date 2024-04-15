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
        fontSize:`calc(${dim}/2.5)`
    }
    return <div style={style}>
        <div style={{display:'flex', margin:'auto', color:'#fff'}}><b>{getInitials(txt)}</b></div>
    </div>

}

export const Bullet = (props) =>{
    const {dim, txt} = props
    const style={
        width:'13px',
        height:'13px',
        background:color(txt)[0],
        color:"#fff",
        display:"flex",
        fontSize:`calc(${dim}/2)`,
        borderRadius:'50%',
        margin:'auto'
    }
    return <div style={{height:'100%',display:'flex'}}><div style={style}>
        <div style={{margin:'auto 0px auto 0px'}}></div>
    </div></div>

}

//export const colorBank = ['#D85252','#D88152','#D8BA52','#D4D852','#ADD852','#6AD852','#52D8A1','#52D8D8','#52A1D8','#526CD8','#7052D8','#9352D8','#C252D8','#D85297']
//export const colorBank = ['#D85252','#D88152','#D8BA52','#ADD852','#52D8A1','#52A1D8','#526CD8','#7052D8','#9352D8','#C252D8','#D85297']
export const colorBankAlpha = ['#D85297','#9352D8','#3498DB','#7052D8', '#2ECC71','#526CD8', '#1ABC9C','#8E44AD', 
'#E67E22','#27AE60','#2C3E50','#C252D8','#8AB038','#B8683C','#CD44AE','#7446D6','#239CC6','#A167B9','#6DA22A','#B83C3C',
'#D67F44','#0B905D','#23636D','#C54062','#575AAB', '#1AB578','#8078D4', '#0EB1B1','#27AE60','#9352D8',
'#D85297','#9352D8','#3498DB','#7052D8', '#2ECC71','#526CD8', '#1ABC9C','#8E44AD', 
'#E67E22','#27AE60','#2C3E50','#C252D8','#8AB038','#B8683C','#CD44AE','#7446D6','#239CC6','#A167B9','#6DA22A','#B83C3C',
'#D67F44','#0B905D','#23636D','#C54062','#575AAB', '#1AB578','#8078D4', '#0EB1B1','#27AE60','#9352D8'
  ];

export const colorBankBravo = ['#D85297','#52D8A1','#9352D8','#3498DB','#D8BA52','#7052D8', '#2ECC71','#526CD8','#E74C3C', '#1ABC9C','#8E44AD', 
'#E67E22','#27AE60','#2C3E50', '#F39C12','#C252D8','#ADD852','#D88152',
'#CD44AE','#52D8A1','#7446D6','#239CC6','#D8BA52','#575AAB', '#1AB578','#8078D4','#E74C3C', '#0EB1B1','#A167B9', 
'#D67F44','#0B905D','#23636D', '#F39C12','#C54062','#ADD852','#D88152',
'#D85297','#52D8A1','#9352D8','#239CC6','#D8BA52','#7052D8', '#2ECC71','#526CD8','#E74C3C', '#1ABC9C','#8E44AD', 
'#E67E22','#27AE60','#2C3E50', '#F39C12','#C252D8','#ADD852','#D88152',
'#D85297','#52D8A1','#7446D6','#3498DB','#D8BA52','#7052D8', '#1AB578','#526CD8','#E74C3C', '#1ABC9C','#8E44AD', 
'#E67E22','#27AE60','#2C3E50', '#F39C12','#C252D8'
  ];

export const ColorSelection1 = (count) =>{
    if(count+1 >= colorBankAlpha.length){
        return colorBankAlpha[0]
    }
    else
        return colorBankAlpha[count+1]
}


/*
export const color = (word) =>{
    const min = 0;
    const gradients = colorBankAlpha
    const max = gradients?.length - 1;
    let hash = 0;
  
    const range = max - min + 1;

    for (let i = 0; i < word?.length; i++) {
        hash += (word.charCodeAt(i));
    }
    hash=hash + word?.length ;
    
    const scaledHash = hash % max ;

    const val =  min + scaledHash;
    
    return [gradients[val],val]

}*/

export const color = (word) => {
    const gradients = colorBankAlpha;
    const max = gradients?.length - 1;
  
    // Use a more robust hashing method
    let hash = 0;
    if (word) {
      for (let i = 0; i < word.length; i++) {
        hash = (hash << 5) - hash + word.charCodeAt(i);
      }
    }
  
    // Ensure hash is positive
    hash = Math.abs(hash);
  
    // Use a prime number to reduce clustering and scale the hash
    const scaledHash = (hash * 31) % (max + 1);
  
    return [gradients[Math.floor(scaledHash)], Math.floor(scaledHash)];
  };
  


const Box = (props) =>{
    const {dim, txt} = props
    const style={
        width:dim,
        height:dim,
        background:color(txt)[0],
        color:"#fff",
        display:"flex",
        borderRadius:'5px',
        fontSize:`calc(${dim}/2.5)`
    }
    return <div style={style}>
        <div style={{display:'flex', margin:'auto', color:'#fff'}}><b>{txt.slice(0,2)}</b></div>
    </div>
}



export {Box}
//export default {color};