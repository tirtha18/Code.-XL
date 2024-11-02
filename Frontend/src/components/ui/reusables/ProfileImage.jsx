import React, { useState } from "react";
import { UserCircle } from "lucide-react";

const ProfileImage = ({ avatar, fallbackImage }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-32 h-32 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600">
        <div className="absolute inset-0 rounded-full bg-zinc-800">
          <div className="absolute inset-[3px] rounded-full overflow-hidden bg-zinc-800">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <UserCircle className="w-16 h-16 text-green-500" />
              </div>
            )}

            <img
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoading || imageError ? "opacity-0" : "opacity-100"
              }`}
              src={avatar || fallbackImage}
              alt="Profile"
              onError={() => {
                setImageError(true);
                setIsLoading(false);
              }}
              onLoad={() => setIsLoading(false)}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
