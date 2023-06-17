export function validator(input,type){
//Email Validation
if(type=="signup"){
if(input.userName.length<3){
    return('ul')
}else{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)==false){
    return 'Em';
}else{
    if(input.pass.length<8)
        return 'pl'
    else{
        if(input.cPass.length<8){
        return 'cpl' 
        }
        else{
            const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const uppercasePassword =   uppercaseRegExp.test(input.pass);
    const lowercasePassword =   lowercaseRegExp.test(input.pass);
    const digitsPassword =      digitsRegExp.test(input.pass);
    const specialCharPassword = specialCharRegExp.test(input.pass);
     if(!uppercasePassword){
       return 'upc' 
    }else if(!lowercasePassword){
       return 'loc' 
    }else if(!digitsPassword){
        return 'dig' 
    }else if(!specialCharPassword){
        return 'spec' 
    }else if(input.pass!==input.cPass){
        return 'un';
    }
    else{
        return '0';
    }
    }
      }
}
}
}else if (type=="login"){
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)==false){
    return 'Em';
}else{
    if(input.pass.length<8)
        return 'pl'
}
}
    else{
    if(input.id.length<15)
    return 'idl'
    else {
        ;
    }
}













}
