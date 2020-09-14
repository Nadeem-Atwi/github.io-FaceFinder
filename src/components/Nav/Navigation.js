import React from 'react';

const Navigation=({onRouteChange,isSignedIn})=>{
	
			if(isSignedIn){
				return(
			<nav style={{display: 'flex',justifyContent:'flex-end'}}>
			<p  onClick={() => onRouteChange('signout')} className='f3_link dim blackunderline pa3 pointer'>sign out</p>
			</nav>
			);
		}else {
			return(
			<nav style={{display: 'flex',justifyContent:'flex-end'}}>
			<p  onClick={() => onRouteChange('SignIn')} className='f3_link dim blackunderline pa3 pointer'>sign in</p>
			<p  onClick={() => onRouteChange('Register')} className='f3_link dim blackunderline pa3 pointer'>Register</p>
			</nav>
			
			);
		}
		
}

export default Navigation;