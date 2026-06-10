import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './SpacesPage.module.css';
import SpacesHeader from '@components/Spaces/SpacesHeader/SpacesHeader';
import SpacesSearchBar from '@components/Spaces/SpacesSearchBar/SpacesSearchBar';
import EmptySpaces from '@components/Spaces/EmptySpaces/EmptySpaces';
import SpacesList from '@components/Spaces/SpacesList/SpacesList';
import {useModal} from '../../context/ModalContext';
import {useRead} from "@hooks/api/useRead.ts";
import type {Space} from "@customTypes/Space.ts";


export default function SpacesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const {setCreateSpaceModal} = useModal();
    const navigate = useNavigate();

    const {data: spaces} = useRead('spaces');

    const handleCreateSpace = () => {
        setCreateSpaceModal(true);
    };

    const handleSpaceClick = (id: string) => {
        navigate(`/spaces/${id}`);
    };

    const filteredSpaces = spaces?.data?.filter((space: { name: string; description: string; }) =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className={styles.container}>
            <div className={styles.topBar}>
                <SpacesHeader onCreateSpace={handleCreateSpace}/>
                <SpacesSearchBar value={searchQuery} onChange={setSearchQuery}/>
            </div>

            <div className={styles.content}>
                {filteredSpaces?.length === 0 && searchQuery === '' ? (
                    <EmptySpaces onCreateSpace={handleCreateSpace}/>
                ) : filteredSpaces?.length === 0 ? (
                    <EmptySpaces onCreateSpace={handleCreateSpace}/>
                ) : (
                    <SpacesList spaces={filteredSpaces} onSpaceClick={handleSpaceClick}/>
                )}
            </div>
        </main>
    );
}
