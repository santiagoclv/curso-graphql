import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class SongList extends Component {


        _renderList() {
                return this.props.data.songs.map( song => {
                        return <li className="collection-item" key={song.id}> { song.title } </li>
                });
        }


        render() {

                if ( this.props.data.loading ) return <div className="loading">Loading...</div>;

                return (
                        <ul className="collection">
                                {this._renderList()}
                        </ul>
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