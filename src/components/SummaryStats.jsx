import { ageToYears } from "../stats";

function SummaryStats({ pets }) {
  const totalPets = pets.length;

  const ageValues = pets
    .map((pet) => ageToYears(pet.age))
    .filter((age) => age !== null);
  const averageAge = (
    ageValues.reduce((sum, age) => sum + age, 0) / ageValues.length
  ).toFixed(1);

  const typeCounts = pets.reduce((counts, pet) => {
    const type = pet.type || "Unknown";
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  return (
    <div>
      <h3>Summary Statistics</h3>
      <div className="summary">
        <ul>
          <li>Total pets: {totalPets}</li>
          <li>Average age: {averageAge} years</li>
          <li>
            Pets by type:
            <ul>
              {Object.entries(typeCounts).map(([type, count]) => (
                <li key={type}>
                  {type}: {count}
                </li>
              ))}
            </ul>
          </li>
        </ul>
       </div>
    </div>
  );
}

export default SummaryStats;
