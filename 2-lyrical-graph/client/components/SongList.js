import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';


class SongList extends Component {


        _renderList() {
                return this.props.data.songs.map(song => {
                        return <li className="collection-item" key={song.id}> {song.title} </li>
                });
        }


        render() {

                if (this.props.data.loading) return <div className="loading">Loading...</div>;

                return (
                        <div>
                                <ul className="collection">
                                        {this._renderList()}
                                </ul>
                                <Link to="songs/new" className="btn-floating btn-large red right" style={{ textAling: 'center'}} >
                                        <i className="material-icons">adds</i>
                                </Link>
                        </div>
                )
        }
}

const query = gql`
{
        songs {
                id
                title
        }
}`;

export default graphql(query)(SongList);