function dateconverter(input,type){
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
          const gmtPlus3Time = new Date(input.getTime() + (3 * 60 * 60 * 1000));
          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const dayOfWeek = daysOfWeek[gmtPlus3Time.getDay()];
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const month = months[gmtPlus3Time.getMonth()];
          const dateOfMonth = gmtPlus3Time.getDate();
          const year = gmtPlus3Time.getFullYear();
          const hour = gmtPlus3Time.getHours();
          const minute = gmtPlus3Time.getMinutes();
          const formattedDate = `${dayOfWeek}, ${month} ${dateOfMonth}, ${year} ${hour}:${minute}`;
        
          return formattedDate;
      }else{
        ;}
    }   

module.exports=dateconverter;