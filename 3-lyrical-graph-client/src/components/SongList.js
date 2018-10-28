import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { NavLink } from 'react-router-dom';

import fetchSongs from '../queries/fetchSongs.graphql';
import deleteSong from '../queries/deleteSong.graphql';

class SongList extends Component {

        _renderList(songs) {
                return songs.map(song => {
                        return <li className="collection-item" key={song.id}> 
                                        <NavLink  to={`/songs/${song.id}`} >{song.title}</NavLink >
                                        <i onClick={this.delete.bind(this, song.id)} className="material-icons">delete</i>
                                </li>
                });
        }

        delete(id){
                this.props.mutate({
                        variables: { id },
                        refetchQueries: [{ query: fetchSongs }]
                });                
        }

        render() {

                if (this.props.data.loading) return <div className="loading">Loading...</div>;

                const {songs} = this.props.data;

                return (
                        <div>
                                <ul className="collection">
                                        {this._renderList(songs)}
                                </ul>
                                <NavLink to="song/new" className="btn-floating btn-large red right" style={{ textAling: 'center'}} >
                                        <i className="material-icons">adds</i>
                                </NavLink>
                        </div>
                )
        }
}

export default graphql(fetchSongs)(
        graphql(deleteSong)(SongList)
);