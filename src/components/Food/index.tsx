import { useEffect, useState } from 'react';
import { FiEdit3, FiLoader, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image?: string;
}

interface FoodProps {
   food: Food,
   handleDelete: (id: number) => void;
   handleEditFood: (food: Food) => void;
}

export default function Food(props: FoodProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const { available } = props.food;    
    setIsAvailable(available);
  }, []);

  useEffect(() => {
    async function load() {
      const response = await api.get<Food[]>('/foods');
      setFoods(response.data);
    }

    load();
  }, []);
  
  async function toggleAvailable() {
    const { food } = props;
    
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable );
  }

  async function setEditingFood() {
    const { food, handleEditFood } = props;

    handleEditFood(food);
  }

  return (      
        {foods.map(food => (
          <Container available={isAvailable}  key={food.id}>       
         
            <header key={food.id}>
              <img src={food.image} alt={food.name} />
            </header>
            <section className="body">
              <h2>{food.name}</h2>
              <p>{food.description}</p>
              <p className="price">
                R$ <b>{food.price}</b>
              </p>
            </section>
            <section className="footer">
              <div className="icon-container">
                <button
                  type="button"
                  className="icon"
                  onClick={setEditingFood}
                  data-testid={`edit-food-${food.id}`}
                >
                  <FiEdit3 size={20} />
                </button>

                <button
                  type="button"
                  className="icon"
                  onClick={() => props.handleDelete(food.id)}
                  data-testid={`remove-food-${food.id}`}
                >
                  <FiTrash size={20} />
                </button>
              </div>

              <div className="availability-container">
                <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

                <label htmlFor={`available-switch-${food.id}`} className="switch">
                  <input
                    id={`available-switch-${food.id}`}
                    type="checkbox"
                    checked={isAvailable}
                    onChange={toggleAvailable}
                    data-testid={`change-status-food-${food.id}`}
                  />
                  <span className="slider" />
                </label>
              </div>
            </section>
         
          </Container>    
        ))}
  );
};
