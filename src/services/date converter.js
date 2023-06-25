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
      }else if(type=="tenders"){
const now = new Date();
const userInput = new Date(input);
if (userInput.getTime() === now.getTime()) {
  return "now"
} 
else if (userInput.getTime() < now.getTime()) {
    return "past"
} 
else {
  return "future"
}
    }
        else if(type=='tenders2'){
                const dateObj = new Date(input);
                const year = dateObj.getFullYear();
                const month = dateObj.toLocaleString('default', { month: 'long' });
                const date = dateObj.getDate();
                const day = dateObj.toLocaleString('default', { weekday: 'long' });
                const hour = dateObj.getHours();
                const minute = dateObj.getMinutes();
                const second = dateObj.getSeconds();
                const meridiem = hour >= 12 ? "PM" : "AM";
                const hour12 = hour % 12 || 12;
                const formattedDateTime = `${day}, ${month} ${date}, ${year} ${hour12}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} ${meridiem}`;
                return formattedDateTime;
        }else{
          ;
        }
    }   