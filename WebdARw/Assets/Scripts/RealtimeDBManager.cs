using System.Collections;
using System.Collections.Generic;
using System.Threading;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using TMPro;

// Firebase imports
using Firebase;
using Firebase.Database;
using Firebase.Storage;
using Firebase.Extensions;


public class RealtimeDBManager : MonoBehaviour
{

    public UnityEvent OnFirebaseInitialized = new UnityEvent();

    public TMP_InputField fileInstanceNameField;
    public TMP_InputField fileInstanceDescriptionField;
    public Button submit;
    public Material defaultMaterial;
    public GameObject defaultTubeRenderer;

    private DatabaseReference mDatabaseRef;
    private FirebaseStorage mStorage;
    private StorageReference mStorageRef;

    void Start()
    {
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task =>
        {
            if (task.Exception != null)
            {
                Debug.LogError($"Failed to initialize Firebase with {task.Exception}");
                return;
            }
            OnFirebaseInitialized.Invoke();
        });
        mDatabaseRef = FirebaseDatabase.DefaultInstance.RootReference;
        mStorage = FirebaseStorage.DefaultInstance;
        // mStorageRef = mStorage.GetReferenceFromUrl("gs://webdarw-14bca.appspot.com");
        mStorageRef = mStorage.RootReference;
    }

    private void Awake()
    {
        submit.onClick.AddListener(Save);
    }

    public void Save()
    {
        string saveName = fileInstanceNameField.text;
        string description = fileInstanceDescriptionField.text;

        if (ARDraw.lineList.Count == 0) // remove later when adding other lines or point clouds
            return;

        SaveFile newSaveFile = new SaveFile(saveName, description, ARDraw.lineList, defaultMaterial, defaultTubeRenderer);

        // push data files (fbx, image) up to google firestore
        // google firebase realtime db used for file location, name, description for quick lookup
        string storageLocation = PushFile(newSaveFile.getTotalFilePath(), newSaveFile.getFileName(), newSaveFile.getName(), mStorageRef);

        pushSaveFileData(newSaveFile.getName(), storageLocation);


    }

    public void pushSaveFileData(string name, string fbxStorageLocation)
    {
        SaveFileData newData = new SaveFileData(name, fbxStorageLocation);
        string json = JsonUtility.ToJson(newData);

        string key = mDatabaseRef.Child("fbxEntries").Push().Key;
        var task = mDatabaseRef.Child("fbxEntries").Child(key).SetValueAsync(json);
        // yield return new WaitUntil(predicate: () => task.IsCompleted);

        // if (task.Exception != null)
        // {
        //     Debug.LogWarning(message: $"Failed to register task with {task.Exception}");
        // }
        // else
        // {
        //     Debug.Log("SUCCESS: Entry written to Google Firebase Realtime DB!");
        // }
    }

    public string PushFile(string localFile, string fileName, string name, StorageReference mStorageRef)
    {
        // Start uploading a file
        string storageLocation = "fbxfiles/" + name + "/" + fileName;
        var task = mStorageRef.Child(storageLocation)
            .PutFileAsync("file://" + localFile, null,
                new StorageProgress<UploadState>(state => {
                    // called periodically during the upload
                    Debug.Log(string.Format("Progress: {0} of {1} bytes transferred.",
                        state.BytesTransferred, state.TotalByteCount));
                }), CancellationToken.None, null);
        task.ContinueWithOnMainThread(resultTask => {
            if (!resultTask.IsFaulted && !resultTask.IsCanceled) {
                Debug.Log("Upload finished.");
            }
            System.IO.File.Delete("/private" + localFile); // Delete local file
        });

        return storageLocation;
    }

    public void Load()
    {
        // do nothing for now
    }

}


public class SaveFileData
{
    public string name;
    public string fbxStorageLocation;

    public SaveFileData(string name, string fbxStorageLocation)
    {
        this.name = name;
        this.fbxStorageLocation = fbxStorageLocation;
    }
}