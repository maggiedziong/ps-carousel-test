import React, {Component}  from 'react';
import Slide from './Slide/Slide';
import './App.scss';

/* TODO 
  - add font
  - add touchevents for mobile
  - make the carousel infinite?
  - if making infinite, will need to change positioning to absolute
*/

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      images : [],
      loading : false,
      error : null,
      slideWidth : 300,
      currentIndex : 0, //Can set this to 2 if the carousel should fill full width on load / could work out the number programtically also
      offset: 0
    }
  }

  // use Fetch to get image data
  async getImages() {
    return fetch('https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=dogs&image_type=photo&per_page=6', {
      method: 'GET'
    }).then(async (response) => {
      var data = await response.json(); // use await to resolve promise
      this.setState({images: data.hits}); // filter down to hits here
      console.log(data.hits);
    }).catch(function(err) { //TODO add error handling 
      this.setState({ error: true }); 
    });
  }

  // changed to an async function so that we can wait for 
  // the images before initialising the carousel
  async componentDidMount() { 
    await this.getImages();
    this.carouselInit();
    window.addEventListener('resize', this.centerActive);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.centerActive);
  }
  
   // set up carousel track width
  carouselInit = () => {
    const imgs = this.state.images.length;
    const width = this.state.slideWidth * imgs;
    const trackWidth = document.getElementsByClassName('carousel-inner')[0];

    trackWidth.style.width = width + 'px';

    this.centerActive();
  }

  // center active slide
  centerActive = () => {
    const visibleWidth = document.querySelector('.carousel-wrapper').offsetWidth;
    const halfSlide = this.state.slideWidth / 2;
    const centerOffset = (this.state.slideWidth * (this.state.currentIndex + 1)) - halfSlide;
    const trackOffset = (visibleWidth / 2) - centerOffset;

    
    this.setState(prevState => ({
      offset: trackOffset
    }))
  }

  prevSlide = () => {
    if(this.state.currentIndex === 0)
      return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      offset: prevState.offset + this.state.slideWidth
    }));
  }

  nextSlide = () => {
    if(this.state.currentIndex === this.state.images.length - 1) 
      return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      offset: prevState.offset - this.state.slideWidth
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Carousel test</h1>
        <div className="carousel">
          <div className="carousel-wrapper">
            <div className="carousel-inner" style={{transform: `translateX(${this.state.offset}px)`}}>
              {this.state.images.map((image, i) => (
                <Slide {...image} key={image.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="button-group">
          <div className="button previous" onClick={this.prevSlide}>Prev</div>
          <div className="button next" onClick={this.nextSlide}>Next</div>
        </div>
      </div>
    );
  }
}

export default App;
