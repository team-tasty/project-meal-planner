import { useNavigate } from "react-router-dom";

const UserLandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-landing-pic bg-right-bottom h-[90vh] flex flex-col justify-center place-items-center">
        <div className="bg-[#D9D9D9]/85 p-3 rounded-[5px] flex flex-col">
          <h1
            className="self-center mb-4 text-2xl"
          >Welcome to Meal Planner</h1>
          <h2
            className="self-center mb-4 text-lg"
          >Follow the steps below to get started!</h2>
          <h3
            className="mb-1"
          >Step 1: Search from hundreds of recipes.</h3>
          <h3
            className="mb-1"
          >Step 2: Save your favorites.</h3>
          <h3
            className="mb-1"
          >Step 3: Start building your meal plan.</h3>
          <h3
            className="mb-1"
          >Step 4: Drag and drop your favorites to different days.</h3>
          <h3
            className="mb-4"
          >Step 5: Generate a grocery list from your completed meal plan.</h3>
          <span className="self-center">
            <button 
              className="mb-4"
              onClick={() => navigate("/app/recipes")}>Get Started</button>
          </span>
          <p 
            className="font-montserratRegular self-center text-sm"
          >Photo by Syd Wachs on Unsplash</p>
        </div>
      </div>
    </>
  );
};

export default UserLandingPage;
