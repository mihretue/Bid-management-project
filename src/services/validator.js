export function validator(input){
//Email Validation
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)==false){
    return 'Email';
}else{
    if(input.pass.length<8 || input.cPass.length<8)
        return('passLength')
    else{
        if(input.pass!==input.cPass){
            return('passUnmatching!');
        }
        else{
            return('0');
        }
      }
}





}