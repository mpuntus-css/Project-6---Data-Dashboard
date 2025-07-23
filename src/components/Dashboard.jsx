import { useEffect, useState } from "react";
import { getAccessToken, fetchPets } from "../petfinder";
import SummaryStats from "./SummaryStats";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");



  useEffect(() => {
    const loadPets = async () => {
      try {
        const token = await getAccessToken();
        const animals = await fetchPets(token);
        setPets(animals);
      } catch (err) {
        console.error("Failed to fetch pets", err);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

    if (loading) return <p>Loading pets...</p>;

    
    const filteredPets = pets.filter((pet) => {
        const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "All" || pet.type === filterType;
        return matchesSearch && matchesType;
    });

  return (
    <div>
    
        <h2>Pet Dashboard</h2>

        <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '200px',
              marginLeft: '1rem'
            }}
        >
            <option value="All">All Types</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
        </select>

        <input
            type="text"
            placeholder="Search by pet name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '400px'
            }}
        />

      <SummaryStats pets={pets} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.name}</td>
              <td>{pet.breeds?.primary || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
