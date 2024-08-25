import { useParams } from 'react-router-dom';

function Profile() {
    const { nickname } = useParams();
    return <h2>This {nickname} page</h2>;
}

export default Profile;
