import {history} from "@@/core/history";

console.log('app.tsx')
history.listen((location: { pathname: any; }, action: any) => {
  console.log('3. location', location);
  // unlisten();
});
