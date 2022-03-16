import React from "react";

const Weather = (props) => {
  const icon = `https://openweathermap.org/img/wn/${props.icon}@2x.png`;
  const iconDay1 = `https://openweathermap.org/img/wn/${props.cityDay.day1_icon}@2x.png`;
  const iconDay2 = `https://openweathermap.org/img/wn/${props.cityDay.day2_icon}@2x.png`;
  const iconDay3 = `https://openweathermap.org/img/wn/${props.cityDay.day3_icon}@2x.png`;
  const iconDay4 = `https://openweathermap.org/img/wn/${props.cityDay.day4_icon}@2x.png`;
  
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var time = date + '.' + month + '.' + year;
    return time;
  }
  
  function err(){
    return(
      <div className="alert alert-danger mx-5" role="alert">
      העיר לא נמצאה או שלא הוכנסה שום עיר, נסה שוב בבקשה
       </div>
    )
  }
  

return (
<div className = "container"> 
<div> {props.erorr?err():null} </div>

<h1>{props.name} </h1>
<h5>{props.date}</h5>
<h5 className = "py-2">
{props.icon?<img src={icon}/>:null}
</h5>
{props.name? (<h1 className = "py-2"> {props.temp}&deg; </h1> ):null}

<h3> 
{props.name? (<span className = "px-4"> {props.tempMax}&deg; </span>):null}
{props.name? (<span className = "px-4"> {props.tempMin}&deg; </span>):null}
</h3>

<h3 className = "py-3">{props.description}</h3>

{props.name? (<table className="tableCenter">
  <tr>
    <td className = "px-5">{timeConverter(props.cityDay.day1_date)}</td> 
    <td className = "px-5">{timeConverter(props.cityDay.day2_date)}</td> 
    <td className = "px-5">{timeConverter(props.cityDay.day3_date)}</td> 
    <td className = "px-5">{timeConverter(props.cityDay.day4_date)}</td> 
  </tr>
  <tr>
    <td>{props.cityDay.day1_temp}&deg;</td>
    <td>{props.cityDay.day2_temp}&deg;</td>
    <td>{props.cityDay.day3_temp}&deg;</td>
    <td>{props.cityDay.day4_temp}&deg;</td>
  </tr>
  <tr>
    <td><img src={iconDay1}/></td>
    <td><img src={iconDay2}/></td>
    <td><img src={iconDay3}/></td>
    <td><img src={iconDay4}/></td>
  </tr>
</table>):null}

</div>
);

}

export default Weather;