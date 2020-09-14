import React , {Component} from 'react';
import Navigation from './components/Nav/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImagelinkForm from './components/imagelinkForm/ImagelinkForm';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import SignIn from './components/signin/SignIn';
import Register from './components/Register/Register';

import './App.css';


// const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '5765c7eeaf4843cd947a3136c12a5eaa'
});


const particelsOptions={
              particles: {
                 number:{
                  value:100,
                  density:{
                    enable:true,
                    value_area:800
                  }
                 }
                }

}

class App extends Component {
constructor(){
  super();
  this.state={
    input:'',
    imageUrl:'',
    box:{},
    route:'SignIn',
    isSignedIn:false
  }
}

calculateFaceLocation=(data)=>{
const clarifyFace=data.outputs[0].data.regions[0].region_info.bounding_box;
const image=document.getElementById('inputimage');

const width=Number(image.width);
const height=Number(image.height);

 console.log(width,height);

 return{
  
  topRow: clarifyFace.top_row * height,
  rightCol: width-(clarifyFace.right_col * width),
  bottomRow: height-(clarifyFace.bottom_row * height),
  leftCol: clarifyFace.left_col * width
  
 }
}

displayFaceBox=(box)=>{
  console.log(box);
  this.setState({box:box});
}


oninputechange=(event)=>{
this.setState({input: event.target.value});
}


onButtonSubmit=()=>{
  this.setState({imageUrl:this.state.input })

app.models.predict(
  Clarifai.FACE_DETECT_MODEL,
 this.state.input)
.then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))

 .catch((err) => console.log(err))

  

}


onRouteChange=(route)=>{
  if(route==='signout'){
    this.setState({isSignedIn:false})

  }else if(route==='home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route});
}

  render(){
     return (
    <div className="App">
     <Particles className='particels'
              params={particelsOptions}
             
            />
     <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
    {this.state.route==='home'
    ? <div>

      <Logo/>
      <Rank/>
      <ImagelinkForm 
      oninputechange={this.oninputechange}
      onButtonSubmit={this.onButtonSubmit}/>
            
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>  
       </div>
        :(
          this.state.route==='SignIn'
          ?<SignIn onRouteChange={this.onRouteChange}/>
          :<Register onRouteChange={this.onRouteChange}/>
          )
    
    
     }
    </div>
   );
  }
 
}

export default App;
