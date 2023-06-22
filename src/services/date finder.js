export function datefinder(){
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
      
      const currentDate = new Date(Date.now());
      const monthName = months[currentDate.getMonth()];
      const dayName = currentDate.toLocaleString('en-us', { weekday: 'long' });
      const date = currentDate.getDate();
      const year = currentDate.getFullYear();
      const time = currentDate.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
      
      const formattedDate = `${dayName}, ${monthName} ${date}, ${year} ${time}`;
      return formattedDate;
    }   