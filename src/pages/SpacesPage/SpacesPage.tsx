import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SpacesPage.module.css';
import SpacesHeader from '@components/Spaces/SpacesHeader/SpacesHeader';
import SpacesSearchBar from '@components/Spaces/SpacesSearchBar/SpacesSearchBar';
import EmptySpaces from '@components/Spaces/EmptySpaces/EmptySpaces';
import SpacesList from '@components/Spaces/SpacesList/SpacesList';
import type { Space } from '@customTypes/Space';
import { useModal } from '../../context/ModalContext';

// TODO: replace with real API data
const MOCK_SPACES: Space[] = [
  {
    id: '1',
    name: 'Marketing Team',
    description: 'Marketing campaigns and strategy',
    role: 'admin',
    memberCount: 12,
    noteCount: 45,
    gradient: 'purple-pink',
      access:
      'private',
  },
  {
    id: '2',
    name: 'Product Development',
    description: 'Product roadmap and features',
    role: 'contributor',
    memberCount: 8,
    noteCount: 67,
    gradient: 'blue-cyan',
    access:
      'public',
  },
  {
    id: '3',
    name: 'Design Resources',
    description: 'Shared design assets and guidelines',
    role: 'viewer',
    memberCount: 25,
    noteCount: 123,
    gradient: 'green',
    access:
      'public',
  },
  {
    id: '4',
    name: 'Engineering',
    description: 'Technical documentation and architecture',
    role: 'admin',
    memberCount: 15,
    noteCount: 89,
    gradient: 'blue-cyan',
    access:
      'private',
  },
];

export default function SpacesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { setCreateSpaceModal } = useModal();
  const navigate = useNavigate();

  const handleCreateSpace = () => {
    setCreateSpaceModal(true);
  };

  const handleSpaceClick = (id: string) => {
    navigate(`/spaces/${id}`);
  };

  const filteredSpaces = MOCK_SPACES.filter((space) =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <SpacesHeader onCreateSpace={handleCreateSpace} />
        <SpacesSearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className={styles.content}>
        {filteredSpaces.length === 0 && searchQuery === '' ? (
          <EmptySpaces onCreateSpace={handleCreateSpace} />
        ) : filteredSpaces.length === 0 ? (
          <EmptySpaces onCreateSpace={handleCreateSpace} />
        ) : (
          <SpacesList spaces={filteredSpaces} onSpaceClick={handleSpaceClick} />
        )}
      </div>
    </main>
  );
}
