import { Restaurant } from "../interfaces/Restaurant";
import { fetchData } from "./fetchdata";
import { WeeklyMenu, DailyMenu } from "../interfaces/menus";

const dailyMenu = async (restaurantId: string): Promise<void> => {
  const dailyMenu: DailyMenu = await fetchData(
    `/restaurants/daily/${restaurantId}/fi`
  );

  const modal = document.getElementById(
    "dailyMenu"
  ) as HTMLDialogElement | null;
  if (!modal) {
    throw new Error("Modalia ei löydy");
  } else {
    const h3 = document.getElementById("dailyH3") as HTMLHeadingElement | null;

    const getDate = new Date();
    const date = new Intl.DateTimeFormat("fi-FI", {
      dateStyle: "full",
      timeZone: "Europe/Helsinki",
    }).format(getDate);
    if (h3) {
      h3.textContent = date;
    }
    console.log(date);
  }
};

const weeklyMenu = async (restaurantId: string): Promise<void> => {
  const weeklyMenu: WeeklyMenu = await fetchData(
    `/restaurants/weekly/${restaurantId}/fi`
  );
  const modal = document.getElementById(
    "weeklyMenu"
  ) as HTMLDialogElement | null;
  if (!modal) {
    throw new Error("Modalia ei löydy");
  } else {
  }
};

const restaurantInfo = async (
  restaurant: Restaurant
): Promise<HTMLDivElement> => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  div.classList.add("restaurantModal");

  const todayMenuBtn = document.createElement("button");
  const weeklyMenuBtn = document.createElement("button");
  todayMenuBtn.classList.add("modalBtn");
  weeklyMenuBtn.classList.add("modalBtn");

  todayMenuBtn.addEventListener("click", () => {
    dailyMenu(restaurant._id);
  });
  weeklyMenuBtn.addEventListener("click", () => {
    weeklyMenu(restaurant._id);
  });

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("menuBtnContainer");
  btnContainer.append(todayMenuBtn, weeklyMenuBtn);

  h3.textContent = `${restaurant.name} - ${restaurant.company}`;
  p.innerHTML = `<b>${restaurant.address}</b> <br> ${restaurant.postalCode} ${restaurant.city}`;
  todayMenuBtn.textContent = "Today's Menu";
  weeklyMenuBtn.textContent = "Week's Menu";
  div.append(h3, p, btnContainer);

  // await weeklyMenu(restaurant._id);

  return div;
};

export { restaurantInfo };
