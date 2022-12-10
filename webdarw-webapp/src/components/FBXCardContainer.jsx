import { useEffect, useState } from "react";
import FBXCard from "./FBXCard"

function FBXCardContainer({dbInformation, setFbxVisible, setFbxReference, fbxFile, setSearchParams, setAlertOpen, setCopiedContent, itemSearch}) {
    const [visibleFBXList, setVisibleFBXList] = useState([]);

    useEffect(() => {
        if (dbInformation) {
            let filteredFBXList = Object.values(dbInformation).filter(value => {
                if (itemSearch === "" || itemSearch == null)
                    return true;
                let name = JSON.parse(value)["name"];
                return name.toLowerCase().includes(itemSearch.toLowerCase());
            });
    
            filteredFBXList = filteredFBXList.map(value => {
                let elementObj = JSON.parse(value);
                return <FBXCard 
                            key={elementObj["fbxStorageLocation"]} 
                            name={elementObj["name"]} 
                            description={"Filler Text"} 
                            reference={elementObj["fbxStorageLocation"]} 
                            setFbxReference={setFbxReference} 
                            setFbxVisible={setFbxVisible} 
                            fbxFile={fbxFile} 
                            setSearchParams={setSearchParams} 
                            setAlertOpen={setAlertOpen} 
                            setCopiedContent={setCopiedContent}/>
            });
            setVisibleFBXList(filteredFBXList);
        }
    }, [itemSearch, dbInformation, fbxFile]);


    return(
        <div
            style={{display: "flex", flexFlow: "row wrap", justifyContent: 'center', margin: "10px"}}>
            {visibleFBXList}
        </div>
    );
}

export default FBXCardContainer;