import React, { Component } from "react";
import "./Postear.css";

class Postear extends Component {
    state = {  }
    render() { 
        return ( 
     
    <h2>Publicar</h2>
   
<div class="card">
  
  <div class="container">
    <h4><b>Enrique</b></h4> 
    <p>xxxxxxx</p> 
    <form>
  <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
  <button class="button">Publicar</button>
</form>
  </div>
</div>



          
         );
    }
}
 
export default Postear;