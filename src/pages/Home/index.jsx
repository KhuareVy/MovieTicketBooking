import React from 'react'
import Slider from '../../components/Slider'
import MovieMenu from '../../components/MovieMenu'
import MovieList from '../../testComponents/MovieList'

const Home = () => {
  return (
    <div>
        <Slider />
        <MovieMenu/>
        <MovieList/>
    </div>
  )
}

export default Home