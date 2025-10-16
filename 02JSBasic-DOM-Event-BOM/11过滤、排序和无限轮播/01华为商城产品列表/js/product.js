const productionEl = document.querySelector(".production");

const serverEl = document.querySelector(".server");
const sortEl = document.querySelector(".sort");

const serverURL = "https://res.vmallres.com/pimages";
const activeArr = [];
let preActive = sortEl.querySelector(".active");
let newArr = null;
let sortT = "综合";

serverEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("not")) return;
  event.target.classList.toggle("active");

  const content = event.target.textContent.trim()
  if (event.target.classList.contains("active")) {
    activeArr.push(content);
  } else {
    const index = activeArr.indexOf(content);
    activeArr.splice(index, 1);
  };

  filterSort();

  dom(newArr);
});

sortEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("not") || preActive === event.target) return;
  preActive.classList.remove("active");
  event.target.classList.add("active");
  preActive = event.target;

  sortT = event.target.textContent.trim();

  filterSort();

  dom(newArr)
});



dom(resultList);
function dom(arr) {
  productionEl.innerHTML = "";
  for (const item of arr) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");
    productionEl.append(itemEl);
  
    const imgEl = document.createElement("img");
    imgEl.src = `${serverURL}${item.photoPath}428_428_${item.photoName}`;
    imgEl.alt = item.name;
    itemEl.append(imgEl);
  
    const titleEl = document.createElement("div");
    titleEl.classList.add("title");
    titleEl.textContent = item.name;
    itemEl.append(titleEl);
  
    const descEl = document.createElement("div");
    descEl.classList.add("desc");
    descEl.textContent = item.promotionInfo;
    itemEl.append(descEl);
  
    const priceEl = document.createElement("div");
    priceEl.classList.add("price");
    priceEl.textContent = `¥${item.price}`;
    itemEl.append(priceEl);
  
    const activitiesEl = document.createElement("div");
    activitiesEl.classList.add("activities");
    for (const tip of item.promoLabels) {
      const tipEl = document.createElement("span");
      tipEl.classList.add("tip");
      tipEl.textContent = tip;
      activitiesEl.append(tipEl);
    }
    itemEl.append(activitiesEl);
  
    const commentEl = document.createElement("div");
    commentEl.classList.add("comment");
    const spanEl1 = document.createElement("span");
    spanEl1.textContent = `${item.rateCount}人评论`;
    commentEl.append(spanEl1);
    const spanEl2 = document.createElement("span");
    spanEl2.textContent = `${item.goodRate}% 好评`;
    commentEl.append(spanEl2);
    itemEl.append(commentEl);
  }

  for (let i = 0; i < 3; i++) {
    const emptyEl = document.createElement("div");
    productionEl.append(emptyEl);
  }
}

function filterSort() {
  newArr = [...resultList].filter(item1 => {
    let flag = true;
    for (const item2 of activeArr) {
      if (!item1.services.includes(item2)) {
        flag = false;
        break;
      }
    }
    return flag;
  });

  switch(sortT) {
    case "评论数":
      newArr = newArr.sort((item1, item2) => {
        return item2.rateCount - item1.rateCount
      })
      break;
    case "价格":
      newArr = newArr.sort((item1, item2) => {
        return item2.price - item1.price
      })
      break;
    default:
      newArr = newArr;
  }
}
