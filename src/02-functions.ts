import {Friend, Colleague, EmailContact, FriendName } from './myTypes'
import { friends } from './01-basics'
import { colleagues } from './01-basics'

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))


function highestExtension(cs: Colleague[]) {
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}
// console.log(highestExtension(colleagues.current));

function addColleague(cs: Colleague[], n: string, d: string, em: string){
    const newC: Colleague = {
        name: n,
        department: d,
        contact: {
            email: em,
            extension: highestExtension(cs).contact.extension + 1,
        },
    };
    cs.push(newC);
    return cs;
}

// addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
// console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));


function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW(colleagues.current, (a, b) => (a.name.length - b.name.length),1));

function findFriends(
    friends: Friend[],
    filter: (f: Friend) => boolean
): FriendName[] {
    const filtered = friends.filter(filter);
    const result: FriendName[] = filtered.map((fn) => ({name: fn.name}));
    return result;
}

// console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
// console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friend: Friend, interest: string) {
  if (friend.interests === undefined) {
    friend.interests = [interest];
  } else {
    friend.interests.push(interest);
  }
  return friend.interests;
}


console.log(addInterest(friends[0], 'Politics'))