import { Hub } from "aws-amplify";
import React, { createContext, useEffect, useState } from "react";


const HubSyncContext = createContext<boolean>(false);

function HubSyncProvider({children} : {children: React.ReactNode}){
  const [synced, setSynced] = useState(false);
  

  useEffect(() => {
    const hubListener =Hub.listen('datastore', (data) => {
        if (data.payload.event === "syncQueriesReady") {
            setSynced(true);
        }
    })
    
    return () => hubListener();
    }, []);
    
    // console.log('context', myData)

  return (
    <HubSyncContext.Provider value={synced}>
      {children}
    </HubSyncContext.Provider>
  );
}

export default HubSyncContext;
export { HubSyncProvider };