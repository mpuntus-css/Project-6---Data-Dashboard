import { useEffect, useState } from "react";
import { getAccessToken, fetchPets } from "../petfinder";
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'
import SummaryStats from "./SummaryStats";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const navigate = useNavigate();


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

  const typeCounts = pets.reduce((acc, pet) => {
    acc[pet.type] = (acc[pet.type] || 0) + 1;
    return acc;
  }, {});
  const typeData = Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count,
  }));

  const ageCounts = pets.reduce((acc, pet) => {
    acc[pet.age] = (acc[pet.age] || 0) + 1;
    return acc;
  }, {});
  const ageData = Object.entries(ageCounts).map(([age, count]) => ({
    age,
    count,
  }));


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#8884d8'];

  return (
    <div className="dashboard">
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
            <tr 
              key={pet.id}
              onClick={() => navigate(`/item/${pet.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <td>{pet.name}</td>
              <td>{pet.breeds?.primary || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>


{/* Chart 1: Bar chart for pet types */}
      <h3>Number of Pets by Type</h3>
      <BarChart width={400} height={250} data={typeData}>
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      {/* Chart 2: Pie chart for pet ages */}
      <h3>Distribution of Pet Ages</h3>
      <PieChart width={400} height={250}>
        <Pie
          data={ageData}
          dataKey="count"
          nameKey="age"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {ageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

    </div>
  );
}

export default Dashboard;
