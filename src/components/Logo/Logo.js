import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import icon3 from './icon3.png'

const Logo=()=>{
	return(
			<div className='ma4 mt0'>
				 <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
				 <div className="Tilt-inner pa3" >
				 <img style={{paddingtop:'5px'}} alt='logo' src={icon3}/> 
				 </div>
				 </Tilt>
			</div>
		);
}

export default Logo;