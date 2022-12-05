using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;  //required for the input fields and text
using UnityFBXExporter;


public class SaveFile
{

	public string name;
	public string description;
	public GameObject rootObjectToExport;
	public string RelativeFolderPath;
	public string FileName;
	public string TextureFolderName;
	public Material defaultMaterial;

	private string totalFilePath;
	private string timestamp;

	// add other fields for things like pointclouds, meshes, or 2d drawings (could be part of original line list)
	// [SerializeField] public List<Mes

	public SaveFile(string name, string description, List<LineRenderer> lineRenderers, Material defaultMaterial, GameObject defaultTubeRenderer)
	{
		this.name = name;
		this.description = description;

		this.rootObjectToExport = new GameObject();
		this.RelativeFolderPath = "/Ignore/RuntimeExport/";
		this.FileName = name;
		this.TextureFolderName = "FBXTextures/";
		this.timestamp = System.DateTime.UtcNow.ToString("yyyyMMddHHmmss");

		foreach(LineRenderer lineRenderer in lineRenderers)
		{
			lineRenderer.Simplify(Mathf.Max(lineRenderer.startWidth, lineRenderer.endWidth)/10.0f);

			GameObject tempChildObj = GameObject.Instantiate(defaultTubeRenderer);
			TubeRenderer tempTubeRenderer = tempChildObj.GetComponent<TubeRenderer>();
			Vector3[] positionsList = new Vector3[lineRenderer.positionCount];
			lineRenderer.GetPositions(positionsList);
			tempTubeRenderer.SetPositions(positionsList);
			tempTubeRenderer.SetRadii(lineRenderer.startWidth, lineRenderer.endWidth);
			tempChildObj.GetComponent<MeshRenderer>().material = new Material(defaultMaterial);
			tempChildObj.GetComponent<MeshRenderer>().material.color = lineRenderer.startColor;



			tempChildObj.transform.parent = this.rootObjectToExport.transform;

		}

		if(System.IO.Path.GetExtension(this.FileName).ToLower() != ".fbx")
		{
			this.FileName = this.FileName + "_" + this.timestamp + ".fbx";
		}
		else
		{
			this.FileName = this.FileName.Substring(0, this.FileName.Length-4) + "_" + this.timestamp + ".fbx";
		}

#if UNITY_IOS
		this.totalFilePath = Application.persistentDataPath + this.RelativeFolderPath + this.FileName;
#else
		this.totalFilePath = Application.dataPath + this.RelativeFolderPath + this.FileName;
#endif

		this.ExportGameObject();
		GameObject.Destroy(this.rootObjectToExport);
	}

	public string getTotalFilePath()
	{
		return this.totalFilePath;
	}

	public string getFileName()
	{
		return this.FileName;
	}

	public string getName()
	{
		return this.name;
	}

	public string getTimestamp()
	{
		return this.timestamp;
	}

	public string getDescription()
	{
		return this.description;
	}

	public bool ExportGameObject()
	{
		return ExportGameObject(this.rootObjectToExport, this.RelativeFolderPath, this.FileName, this.TextureFolderName);
	}

	/// <summary>
	/// Will export to whatever folder path is provided within the Assets folder
	/// </summary>
	/// <param name="rootGameObject"></param>
	/// <param name="folderPath"></param>
	/// <param name="fileName"></param>
	/// <param name="textureFolderName"></param>
	/// <returns></returns>
	public static bool ExportGameObject(GameObject rootGameObject, string folderPath, string fileName, string textureFolderName)
	{
		if(rootGameObject == null)
		{
			Debug.Log("Root game object is null, please assign it");
			return false;
		}

		// forces use of forward slash for directory names
		folderPath = folderPath.Replace('\\', '/');
		textureFolderName = textureFolderName.Replace('\\', '/');

#if UNITY_IOS
		folderPath = Application.persistentDataPath + folderPath;
#else
		folderPath = Application.dataPath + folderPath;
#endif


		if(System.IO.Directory.Exists(folderPath) == false)
		{
			System.IO.Directory.CreateDirectory(folderPath);
		}

		if(System.IO.Path.GetExtension(fileName).ToLower() != ".fbx")
		{
			Debug.LogError(fileName + " does not end in .fbx, please save a file with the extension .fbx");
			return false;
		}

		if(folderPath[folderPath.Length - 1] != '/')
			folderPath += "/";

		if(System.IO.File.Exists(folderPath + fileName))
			System.IO.File.Delete(folderPath + fileName);

		bool exported = FBXExporter.ExportGameObjAtRuntime(rootGameObject, folderPath, fileName, textureFolderName, true);

#if UNITY_EDITOR
		UnityEditor.AssetDatabase.Refresh();
#endif
		return exported;
	}

	public void Draw()
	{
		// foreach(Line line in this.lines)
		// {
		// 	line.Draw();
		// }
	}

}

