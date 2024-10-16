const apiUrl = "https://media1.edu.metropolia.fi/restaurant/api/v1";

const fetchData = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(apiUrl + url, options);
  if (!response.ok) {
    if (response.statusText === "Unauthorized") {
      return {
        status: response.status,
        errorText: response.statusText,
        message: "Kirjautuminen epäonnistui: Väärä salasana tai käyttäjätunnus",
      } as T;
    }
    throw new Error(`Error ${response.status} occured`);
  }

  console.log(response);
  return await response.json();
};
export { fetchData };
