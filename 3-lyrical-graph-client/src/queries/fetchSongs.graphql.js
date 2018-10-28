import gql from 'graphql-tag';

export default gql`
query fetchSongs{
        songs{
                id
                title
                lyrics {
                        id
                }
        }
}`;
