import React, {Component}  from 'react';
import Slide from './Slide/Slide';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      images : [],
      loading : false,
      error : null
    }
  }

  // use Fetch to get image data
  async getImages() {
    return fetch('https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=dogs&image_type=photo&per_page=6', {
      method: 'GET'
    }).then(async (response) => {
      var data = await response.json(); // use await to resolve promise
      this.setState({images: data.hits});
      console.log(data.hits);
    }).catch(function(err) { //TODO add error handling 
      this.setState({ error: true }); 
    });
  }

  componentDidMount() {
    this.getImages();
  }

  render() {
    return (
      <div className="App">
        <h1>Carousel test</h1>
        <div className="carousel">
          <div className="carousel-wrapper">
            <div className="carousel-inner">
              {this.state.images.map((image, i) => (
                <Slide {...image} key={image.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="button-group">
          <div className="button previous">Prev</div>
          <div className="button next">Next</div>
        </div>
      </div>
    );
  }
}

export default App;
