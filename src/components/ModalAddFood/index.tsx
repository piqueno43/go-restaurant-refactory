import { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import { Input } from '../Input'

type createFoodData = {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface IModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;  
  handleAddFood: (food: createFoodData) => Promise<void>;
}

export default function ModalAddFood ({handleAddFood, isOpen, setIsOpen}: IModalAddFoodProps) {  

  const formRef = useRef(null);
  
  function handleSubmit(data: createFoodData) {    
    handleAddFood(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <Form
    ref={formRef}
    onSubmit={handleSubmit}>
      <h1>Novo Prato</h1>
      <Input name="image" placeholder="Cole o link aqui" />

      <Input name="name" placeholder="Ex: Moda Italiana" />
      <Input name="price" placeholder="Ex: 19.90" />

      <Input name="description" placeholder="Descrição" />
      <button type="submit" data-testid="add-food-button">
        <p className="text">Adicionar Prato</p>
        <div className="icon">
          <FiCheckSquare size={24} />
        </div>
      </button>
    </Form>
  </Modal>
  )
}

