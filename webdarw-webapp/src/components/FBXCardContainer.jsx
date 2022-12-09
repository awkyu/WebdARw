import FBXCard from "./FBXCard"

function FBXCardContainer({dbInformation, setFbxVisible, setFbxReference, fbxFile, setSearchParams, setAlertOpen, setCopiedContent}) {

    let visibleFBXList = [];
    if (dbInformation) {
        visibleFBXList = Object.keys(dbInformation).map(key => {
            let elementObj = JSON.parse(dbInformation[key]);
            return <FBXCard key={key} name={elementObj["name"]} description={"Filler Text"} reference={elementObj["fbxStorageLocation"]} setFbxReference={setFbxReference} setFbxVisible={setFbxVisible} fbxFile={fbxFile} setSearchParams={setSearchParams} setAlertOpen={setAlertOpen} setCopiedContent={setCopiedContent}/>
        });
    }

    return(
        <div
            style={{display: "flex", flexFlow: "row wrap", justifyContent: 'center', margin: "10px"}}>
            {visibleFBXList}
        </div>
    );
}

export default FBXCardContainer;