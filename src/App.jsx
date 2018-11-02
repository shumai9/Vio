import React, { Component } from 'react';
import book from './components/book.json';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      status: '',
      result: '',
      booking: {}
    };
       
  }
  clickHandler =(e) => { 
    console.log('hit', e);
  }
  componentDidMount(){
      let self = this;
    var recognition = new ( 
      window.mozSpeechRecognition || window.webkitSpeechRecognition ||
      window.SpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 5;
    recognition.start();
      
    recognition.onsoundstart = function (event) {
      console.log('Speech has been detected');
      self.setState({ status: 'Listening...' });
    };
    recognition.onend = function () {
      self.setState({ status: 'Ready' });
      recognition.start();
    };

    recognition.onresult =(e)=>{
      self.setState ({
        result: e.results[0][0].transcript,
        booking: book
      });
      


    //   fetch('./book.json', { method: "GET",}          
    //     ).then(res => res.json())
    //     .then((response) => {        
    //       self.setState({- {list.data}</li>
    //         booking: response
    //     })
    //   }).catch((error) =>{
    //     console.log('loged', error);
    //     console.log(this.state.booking);
    //   }) 
    }
  }
    

  render() {    
    return (
      <div className="App" >
        <header className="App-header">
          <nav><h1 className="App-logo">Vio</h1></nav>
        </header>
        <main>
          <h1>Welcome...</h1>
          <h2>Room number? Please</h2>
          <div className="result">
            <p id="status"><strong> Status: </strong> { this.state.status} </p>
            <p id="speech"> <strong>Checking booking :</strong> { this.state.result}  </p>           
            <ul id="answer"><strong>Booking details:</strong>{ book.data.map((list) => {
                  return ( 
                    <li id={list.id} key= {list.room}>
                      {list.name} - {list.room}
                  </li>);
                })
              }
             </ul>           
          </div>
        </main>
      </div>
    );
  }
}


export default App;
