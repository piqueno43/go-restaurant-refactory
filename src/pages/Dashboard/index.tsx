import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;  
  available: boolean;
}

export default function Dashboard () {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    loadFoods();
  }, []);

 

  const handleAddFood = async (food : IFoodPlate): Promise<void> => {
    
    try {      
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);      

    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: IFoodPlate) : Promise<void> => {
    try {
      const response = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodUpdated = foods.map(foodItem =>  {
        if (foodItem.id === editingFood.id) {
          return response.data;
        }
        return foodItem;
      });

      setFoods(foodUpdated);
          
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {    

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods([...foodsFiltered]);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);    
    setModalOpen(!toggleEditModal);
  }

  const handleEditFood = (food: IFoodPlate) => {    
    setEditingFood(food);
    setEditModalOpen(!editModalOpen);
  }

  

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );  
};
