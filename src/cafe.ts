import { MenuItem, ComboDeal, OrderItem } from "./menuTypes";

const soup: MenuItem = {
  id: 1,
  name: "Roast Tomato Soup",
  course: "starter",
  price: 5.5,
  nutrition: {
    calories: 180,
    allergens: ["celery"],
  },
  discountPercent: 100,
};

const risotto: MenuItem = {
  id: 2,
  name: "Mushroom Risotto",
  course: "main",
  price: 14.0,
  nutrition: {
    calories: 620,
    allergens: ["milk"],
  },
  availableFrom: new Date(Number.MAX_VALUE)
};

const brownie: MenuItem = {
  id: 3,
  name: "Chocolate Brownie",
  course: "dessert",
  price: 6.0,
  nutrition: {
    calories: 450,
    allergens: ["milk", "eggs", "gluten"],
  },
};

const menu: MenuItem[] = [soup, risotto, brownie];

const lunchCombo: ComboDeal = {
  id: 101,
  name: "Soup & Sweet",
  items: [soup, brownie],
  price: 10.0,
};

const currentOrder: OrderItem[] = [risotto, lunchCombo, soup];

function describe(item: MenuItem) {
  return `${item.name} (${item.course}) - EUR ${item.price.toFixed(2)}`;
}

function lineTotal(line: OrderItem) {
  if ("items" in line) {
    return line.price; // Combos are sold at their bundle price.
  }
  return line.price;
}


function orderTotal(lines: OrderItem[]) {
  return lines.reduce((total, line) => total + lineTotal(line), 0);
}

function filterMenu(items: MenuItem[], predicate: (item: MenuItem) => boolean) {
  return items.filter(predicate);
}

function cheapest(items: MenuItem[], max: number | undefined = undefined) {
  const sorted = items.sort((a, b) => a.price - b.price);
  return sorted.slice(0, max ?? sorted.length);
}

function firstMatch<T>(data: T[], criteria: (d: T) => boolean): T | undefined{
  return data.find(criteria);
}

function updateItem(item: MenuItem, changes: Partial<MenuItem>) {
  return { ...item, ...changes };
}

type KitchenTicket = Readonly<Pick<MenuItem, "name" | "course">>;

function kitchenTicket(item: MenuItem): KitchenTicket {
  return {
    name: item.name,
    course: item.course,
  };
}

type AllergyCard = Omit<MenuItem, "nutrition"> & {
  warning: string;
};

function allergyCard(item: MenuItem): AllergyCard {
  return {
    id: item.id,
    name: item.name,
    course: item.course,
    price: item.price,
    warning: `Contains: ${item.nutrition.allergens.join(", ")}`,
  };
}

console.log(describe(risotto));
console.log(orderTotal(currentOrder));
console.log(filterMenu(menu, (i) => i.nutrition.calories < 500));
console.log(cheapest(menu, 2));
console.log(cheapest(menu));
console.log(firstMatch(menu, (i) => i.course === "dessert"));
console.log(updateItem(soup, { price: 6.0, discountPercent: 10 }));
console.log(kitchenTicket(brownie));
console.log(allergyCard(brownie));

// kitchenTicket(brownie).name = "Something else"; // Returns error as KitchenTicket is readonly.

console.log(describe(lunchCombo.items[1]), describe(lunchCombo.items[2]));
console.log(updateItem(soup, { price: 7.00 }));
console.log(firstMatch(menu, (i) => i.nutrition.calories < 300));