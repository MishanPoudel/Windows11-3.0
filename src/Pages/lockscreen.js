import Login from "../components/user/Login";
import { useImagePreloader } from "../hooks";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const WALLPAPER_URL = "https://images8.alphacoders.com/134/1346089.png";

function Lockscreen() {
  // Preload wallpaper for instant display
  const wallpaperLoaded = useImagePreloader([WALLPAPER_URL]);
  
  if (!wallpaperLoaded) {
    return (
      <div className="absolute bg-black h-screen w-full flex items-center justify-center">
        <div className="absolute bottom-32">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div
        className="absolute bg-black h-screen w-full"
        style={{
          background: `url(${WALLPAPER_URL}) no-repeat center center`,
          backgroundSize: "cover",
          filter: "blur(4px)",
        }}
      ></div>

      <div className="absolute left-0 top-0 h-screen w-full flex flex-col items-center justify-center z-10">
        <Login />
      </div>
    </>
  );
}

export default Lockscreen;
