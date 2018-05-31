import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import likeLyric from '../queries/likeLyric.graphql';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {

    like(id, likes){
        this.props.mutate({
            variables: { id },
            optimisticResponse : {
                __typename : 'Mutation',
                likeLyric: {
                    id,
                    __typename : 'LyricType',
                    likes: ++likes
                }
            }
        });
    }

    render() {

        const { lyrics } = this.props;

        return (<ul className="collection" >
            {!!lyrics &&
                lyrics.map(lyric => {
                    return (<li className="collection-item" key={lyric.id}>
                        {lyric.content}
                        <span><i onClick={this.like.bind(this, lyric.id, lyric.likes)} className="material-icons">thumb_up</i> {lyric.likes}</span>
                    </li>)
                })}
        </ul>);
    }
}

export default graphql(likeLyric)(LyricList);