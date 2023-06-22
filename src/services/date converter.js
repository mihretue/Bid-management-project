export function dateconverter(input,type){
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      if(type=="signup"){
      const currentDate = new Date(input.bDay);
      const monthName = months[currentDate.getMonth()];
      const date = currentDate.getDate();
      const year = currentDate.getFullYear();
      const formattedDate = `${monthName} ${date}, ${year}`;
      return formattedDate;}
      else if(type=="bidpost"){

      }else{
        ;}
    }   