import React,{ useState } from "react";
import "./form.css";

const Form = (props) => {
  const [city, setCity] = useState("");

  function handleChange(event) {  
    setCity(
         event.target.value
  );    
}

  function sendCityF(event){
  event.preventDefault();
  props.sendCity(city);
  setCity("");
}


return <form >
    <div className="input-group mx-auto">
    <input type="text" onChange={handleChange} name="cityName" placeholder="הכנס את שם העיר המבוקשת" value={city} autoComplete="off"/>
    <div className="input-group-append">
    <button onClick={sendCityF} className="btn btn-outline-light">מצא</button>
    </div>
    </div>
    </form>

}
export default Form;