import { useParams } from '@solidjs/router';

export default function Comment() {
    const params = useParams();
    return(
        <div>
            {parseInt(params.id)}
        </div>
    );
}