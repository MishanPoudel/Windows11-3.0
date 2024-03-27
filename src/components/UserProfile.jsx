import React from "react";

function UserProfile({ name }) {
  const userInitials = generateInitials(name);

  return (
    <div className="flex items-center justify-center w-36 h-full bg-blue-500 rounded-full text-white text-2xl font-bold select-none">
      <div className="text-white text-4xl font-normal">{userInitials}</div>
    </div>
  );
}

function generateInitials(name) {
  const words = name.split(" ");
  const initials = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
}

export default UserProfile;
