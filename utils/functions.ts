export function clearAllIntervals() {
  if (typeof window !== "undefined") {
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function () { },
      Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  }
}

export const myvideosSetter = (v_id: string) => {
  let allMap = localStorage.getItem("myMap");
  let allMapObj = [];
  if (allMap) {
    allMapObj = JSON.parse(allMap);
    if (allMapObj.includes(v_id)) {
      //do nothing
    } else {
      allMapObj.unshift(v_id);
    }
  } else {
    allMapObj.unshift(v_id);
  }
  localStorage.setItem("myMap", JSON.stringify(allMapObj));
};

export const youtubeURLGen = (v_id: string) => {
  const base = "watch?v=";
  return v_id ? base + v_id : undefined;
};
