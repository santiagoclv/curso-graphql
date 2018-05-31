import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import addSongs from '../queries/addSong.graphql';

class SongCreate extends Component {

        constructor(props){
                super(props);

                this.state = {
                        title : ''
                };
        }

        onSubmit(event){
                event.preventDefault();
                this.props.mutate({
                        variables: {
                                title: this.state.title
                        }
                }).then( () => {
                       hashHistory.push('/');
                });                
        }


        render() {
                return (
                        <div>
                                <Link to="/" >Back</Link>
                                <h3>Create a New Song</h3>
                                <form onSubmit={this.onSubmit.bind(this)} >
                                        <label>Song Name</label>
                                        <input onChange={ (event) => {this.setState({title : event.target.value}) }}
                                                value={this.state.title} />
                                </form>
                        </div>
                )
        }
}

export default graphql(addSongs)(SongCreate);