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
    } else if (response.status === 400) {
      alert(`Error: ${response.status}, ${response.statusText}
        Sähköposti on todennäköisesti käytössä tai salasana on alle 5 merkkiä`);
    } else if (response.status === 404) {
      alert("Error: " + response.status + `: ${response.statusText}`);
    }
    throw new Error(`Error ${response.status} occured`);
  }

  console.log(response);
  return await response.json();
};
export { fetchData };
