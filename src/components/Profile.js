import React, { useEffect, useState } from "react";

function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/protected", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>{profileData.message}</p>
    </div>
  );
}

export default Profile;
