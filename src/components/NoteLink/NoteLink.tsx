import {useNavigate} from "react-router-dom";
import styles from './styles.module.css';
type NoteLinkProps = {
    name: string,
    uuid: string
}
export default function NoteLink({name, uuid}: NoteLinkProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/notes/${uuid}`)
    }
    return (
        <span onClick={handleClick} className={styles.noteLink}>{name}</span>
    );
}

