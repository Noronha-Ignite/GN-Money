import { useState } from 'react';
import CreateModal from './components/CreateModal';

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  return (
    <>
      <GlobalStyles />
      <Header onOpenCreateModal={ handleOpenCreateModal } />
      <Dashboard />
      <CreateModal isOpen={ isCreateModalOpen } onRequestClose={ handleCloseCreateModal } />
    </>
  );
}
