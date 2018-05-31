import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

import fetchSong from '../queries/fetchSong.graphql';

class SongDetail extends Component {

    render() {
    if (this.props.data.loading) return <div className="loading">Loading...</div>;

    const { song } = this.props.data;
    
    return (
      <div>
          <Link to="/" >Back</Link>
          <h3>{song.title}</h3>
          <LyricList lyrics={song.lyrics} />
          <LyricCreate songId={song.id} />
      </div>
    )
  }
}


export default graphql(fetchSong, { 
    options: (props) => { return { variables : { id: props.params.id } } }
})(SongDetail);