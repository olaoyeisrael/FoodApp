import { useEffect, useState } from "react";
import Card from "../UI/Cards";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const handleFetchMeals = async () => {
    try {
      const response = await fetch(
        "https://react-project-311c0-default-rtdb.firebaseio.com/meal.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      // this json object transform the json to JS object we can use in our code

      const loadedMeal = [];
      for (const key in data) {
        loadedMeal.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      // const transformMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.eposode_id,
      //     title: movieData.title,
      //     releaseDate: movieData.release_date,
      //     openingText: movieData.opening_crawl,
      //   };
      // });
      setMeals(loadedMeal);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error){
    return (
      <section className={classes.MealError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;
