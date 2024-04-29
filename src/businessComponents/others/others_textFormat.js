

export const sliceText = (len, txt) =>{
    /**
     * This method returns concatinated text if the overall size is crossing the length specified
     * Usage Example: sliceText (5, "Alphonso is a great fruit")
     * Would Output: "Alpho..."
     */
    var finalText=""
    if(txt?.length){
        finalText = txt?.length>len?txt?.slice(0,len)+"...":txt
        return finalText
    }
    else
        alert(txt.length)
    
}