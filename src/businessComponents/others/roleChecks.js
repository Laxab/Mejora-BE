

export const checkSubComponenttmp = (sidenav,selectedMenu, bodyContents, subComponent) =>{
    return(bodyContents)
}

export const checkSubComponent = (sidenav,selectedMenu, bodyContents, subComponent) =>{
    /*
    -- Backup code ---
    if(bodyContents){
        var secondData = selectedMenu?.dynamicListings?.find(item => item.name===bodyContents)
        return secondData?.allowedSubComponents?.includes(subComponent)
    }
    else return true
    */

    const isSubComponentAllowed = (subComponent, rbac) => {
        const isListAllowed = rbac.some(component => component.name === subComponent);
        return isListAllowed
    };
    

    if(bodyContents){
        var secondData = selectedMenu?.dynamicListings?.find(item => item.name===bodyContents)
        return isSubComponentAllowed(subComponent, secondData?.rbac);
        //return secondData?.allowedSubComponents?.includes(subComponent)
    }
    else return true
}
