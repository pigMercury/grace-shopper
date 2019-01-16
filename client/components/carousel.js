const bootstrap = require('bootstrap')
import React, {Component} from 'react'

class Carousel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        {/* <!-- Indicators --> */}
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active" />
          <li data-target="#myCarousel" data-slide-to="1" />
          <li data-target="#myCarousel" data-slide-to="2" />
          <li data-target="#myCarousel" data-slide-to="3" />
          <li data-target="#myCarousel" data-slide-to="4" />
          <li data-target="#myCarousel" data-slide-to="4" />
        </ol>

        {/* <!-- Wrapper for slides --> */}
        <div className="carousel-inner">
          <div className="item active">
            <img src={this.props.image2} alt="image2" key="2" />
          </div>

          <div className="item">
            <img src={this.props.image3} alt="image3" key="3" />
          </div>

          <div className="item">
            <img src={this.props.image4} alt="image4" key="4" />
          </div>

          <div className="item">
            <img src={this.props.image5} alt="image5" key="5" />
          </div>

          <div className="item">
            <img src={this.props.image6} alt="image6" key="6" />
          </div>
        </div>

        {/* <!-- Left and right controls --> */}
        <a
          className="left carousel-control"
          href="#myCarousel"
          data-slide="prev"
        >
          <span className="glyphicon glyphicon-chevron-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control"
          href="#myCarousel"
          data-slide="next"
        >
          <span className="glyphicon glyphicon-chevron-right" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    )
  }
}

export default Carousel
