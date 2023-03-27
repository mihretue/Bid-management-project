export function validator(input){
//Email Validation
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
        if(input.pass!==input.cPass){
            return 'un';
        }
        else{
            return '0';
        }
        }
      }
}
}





// if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)==false){
//     return 'Email';
// }else{
//     if(input.pass.length<8 || input.cPass.length<8)
//         return('passLength')
//     else{
//         if(input.pass!==input.cPass){
//             return('passUnmatching!');
//         }
//         else{
//             return('0');
//         }
//       }
// }





}