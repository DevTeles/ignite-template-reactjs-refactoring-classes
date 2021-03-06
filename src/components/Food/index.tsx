import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Food } from '../../types';
import { Container } from './styles';
import { useState } from 'react';
import { useFoods } from '../../hooks/useFoods';

interface FoodProps{
  food: Food;
  handleDelete:(id: number)=>void;
  handleEditFood:(food :Food)=> void;
}
export function FoodComponent (props : FoodProps){
  const [ food, setFood ] = useState<Food>(props.food);
  const {changeAvailability} = useFoods();

 async function toggleAvailable(){
    changeAvailability(food);
    setFood({...food, available: !food.available});
  }

  function setEditingFood() {
    const { food, handleEditFood } = props;
    handleEditFood(food);
  }

return(
<Container available={food.available}>
        <header>
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
            <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={food.available}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
 </Container>)
}