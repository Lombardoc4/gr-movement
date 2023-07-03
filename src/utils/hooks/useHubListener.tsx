import { Hub } from "aws-amplify";
import { useEffect } from "react";

const useHubListener = (
    source: string,
    event: string,
    callback: () => void,
) => {
    
    Hub.listen(source, (data) => {
        if (data.payload.event === event) {
            callback();
        }
    })
    
}

export default useHubListener;
