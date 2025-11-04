// myPromise = new Promise(resolve, (rejects) => resolve())
//   .then(() => console.log("resolved"))
//   .catch(() => console.log("rejected"));

let savedResolve, savedReject;

const myPromise = new Promise(resolve, (rejects) => {
  savedResolve = rejects;
  savedReject = rejects;
});

savedResolve("Resolve has been successfully");

myPromise
  .then((value) => console.log("Promise Resolved", value))
  .catch((err) => console.log("Promise Rejected", err));

settimeout(() => {
  savedReject("stop");
}, 3000);
