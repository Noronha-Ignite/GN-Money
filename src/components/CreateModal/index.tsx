import React, { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';

import { TransactionsContext } from '../../contexts/TransactionsContext';
import { TransactionType } from '../../models/TransactionType';

import CloseSVG from '../../assets/close.svg';
import IncomeSVG from '../../assets/income.svg';
import OutcomeSVG from '../../assets/outcome.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface CreateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onRequestClose }) => {
  const { createTransaction } = useContext(TransactionsContext);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState<number | null>(null);

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Income
  );

  async function handleCreate(event: FormEvent) {
    event.preventDefault();

    if (!value || !title || !category) return;

    await createTransaction({
      title,
      category,
      amount: value,
      type: transactionType,
    });

    clearFields();
    onRequestClose();
  }

  function clearFields() {
    setTitle('');
    setCategory('');
    setValue(null);
    setTransactionType(TransactionType.Income);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button type='button' onClick={onRequestClose} className='react-modal-close'>
        <img src={CloseSVG} alt='Fechar Modal' />
      </button>

      <Container onSubmit={handleCreate}>
        <h2>Cadastrar transação</h2>

        <input
          type='input'
          placeholder='Título'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type='number'
          placeholder='Valor'
          value={value || ''}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            activeColor='green'
            isActive={transactionType === TransactionType.Income}
            type='button'
            onClick={() => setTransactionType(TransactionType.Income)}
          >
            <img src={IncomeSVG} alt='Entrada' />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            activeColor='red'
            isActive={transactionType === TransactionType.Outcome}
            type='button'
            onClick={() => setTransactionType(TransactionType.Outcome)}
          >
            <img src={OutcomeSVG} alt='Entrada' />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder='Categoria'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type='submit'>Cadastrar</button>
      </Container>
    </Modal>
  );
};

export default CreateModal;
