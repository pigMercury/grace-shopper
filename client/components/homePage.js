import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="home-page">
      <img
        className="profile"
        src="http://www.thebrunettediaries.com/sites/default/files/styles/news_full/public/uploads/2018/07/1.jpg?itok=PbWumzj6"
      />
      <br />
      <div className="about-us">
        <p>
          Have you already visited all the best vacation hot spots, and want
          something further off the beaten path? Do you want to plan a trip that
          will <em>really</em> impress your loved ones?{' '}
        </p>
        <p>
          At Timelink Travel Services, we pride ourselves on offering the most
          unique vacations on the market! With destinations across the centuries
          and around the globe, you can really appreciate the breadth of human
          experience&mdash;and we're adding new destinations all the time!
        </p>
      </div>
      <br />
      <Link to="/destination">Browse all our fabulous destinations today!</Link>
      <br />
      <br />
      <br />
      <Link to={`/destination/${Math.floor(Math.random() * (7 - 1) + 1)}`}>
        Random Destination
      </Link>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default HomePage
