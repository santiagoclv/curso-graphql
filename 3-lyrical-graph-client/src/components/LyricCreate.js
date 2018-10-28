import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import addLyric from '../queries/addLyric.graphql';

class LyricCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        let { songId } = this.props;
        let { content } = this.state;

        this.props.mutate({
            variables: {
                content: content,
                songId: songId
            }
        });
        this.setState({ content: "" });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <label>Add a lyric</label>
                <input onChange={(event) => { this.setState({ content: event.target.value }) }}
                    type="text"
                    value={this.state.content} />
            </form>
        )
    }
}

export default graphql(addLyric)(LyricCreate);