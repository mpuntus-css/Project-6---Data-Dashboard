let accessToken = null;
let tokenExpiresAt = null;

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_SECRET = import.meta.env.VITE_APP_ACCESS_SECRET;

const requestNewToken = async () => {
  const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: API_KEY,
      client_secret: API_SECRET,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000; 
  return accessToken;
};


export const getAccessToken = async () => {
  if (!accessToken || Date.now() >= tokenExpiresAt) {
    return await requestNewToken();
  }
  return accessToken;
};

export async function fetchPetById(token, id) {
  const url = `https://api.petfinder.com/v2/animals/${id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch pet by ID");
  }
  const data = await response.json();
  return data.animal;
}

export const fetchPets = async (token, params = "") => {
  const res = await fetch(`https://api.petfinder.com/v2/animals?limit=20${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pet data");
  }

  const data = await res.json();
  return data.animals;
};
