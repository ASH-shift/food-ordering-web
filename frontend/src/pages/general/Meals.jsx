import React, { useEffect, useState } from "react";
import axios from "axios";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then(res => setMeals(res.data.foodItems))
      .catch(err => console.log(err));
  }, []);

  const addMealToCart = (meal) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(meal);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${meal.name} added to cart`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white", textAlign: "center" }}>All Meals</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "14px",
        marginTop: "20px"
      }}>
        {meals.map(m => (
          <div key={m._id} style={{
            background: "#111",
            borderRadius: "10px",
            padding: "10px",
            color: "white"
          }}>
            <video src={m.video} style={{ width: "100%", borderRadius: "10px" }} autoPlay muted loop />

            <h3>{m.name}</h3>
            <p style={{ opacity: 0.7 }}>{m.description}</p>
            <p style={{ fontWeight: "bold" }}>₹{m.price ?? 249}</p>

            <button
              onClick={() => addMealToCart(m)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "#3b82f6",
                color: "white",
                fontWeight: "600",
                border: "none",
                cursor: "pointer"
              }}>
              + Add Meal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
