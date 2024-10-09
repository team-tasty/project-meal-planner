import { useNavigate } from "react-router-dom";

const UserLandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Meal Planner</h1>
      <h2>Follow the steps below to get started!</h2>
      <h3>Step 1: Search from hundreds of recipes.</h3>
      <h3>Step 2: Save your favorites.</h3>
      <h3>Step 3: Start building your meal plan.</h3>
      <h3>Step 4: Drag and drop your favorites to different days.</h3>
      <h3>Step 5: Generate a grocery list from your completed meal plan.</h3>

      <button onClick={() => navigate("/recipes")}>Get Started</button>
    </div>
  );
};

export default UserLandingPage;
