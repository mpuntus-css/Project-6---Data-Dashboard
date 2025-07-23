import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken, fetchPetById } from "../petfinder";

function DetailView() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const token = await getAccessToken();
        const petData = await fetchPetById(token, id);
        setPet(petData);
      } catch (err) {
        console.error("Failed to fetch pet details", err);
      } finally {
        setLoading(false);
      }
    };
    loadPet();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (!pet) return <p>Pet not found.</p>;

  return (
    <div className="detail-view">
      <h2>{pet.name}</h2>
      <img
        src={pet.photos?.[0]?.medium || "https://via.placeholder.com/200"}
        alt={pet.name}
        style={{ width: "200px", borderRadius: "8px" }}
      />
      <p><strong>Breed:</strong> {pet.breeds?.primary || "Unknown"}</p>
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <p><strong>Gender:</strong> {pet.gender}</p>
      <p><strong>Description:</strong> {pet.description || "No description available."}</p>
      <p><strong>Contact:</strong> {pet.contact?.email || "N/A"}</p>
    </div>
  );
}

export default DetailView;