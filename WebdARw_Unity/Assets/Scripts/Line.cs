using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[Serializable]
public class Line
{
    public Vector3[] positions;
    public Gradient color;
    public AnimationCurve width;

    public Line(LineRenderer lineRenderer)
    {
        positions = new Vector3[lineRenderer.positionCount];
        lineRenderer.GetPositions(positions);
        color = lineRenderer.colorGradient;
        width = lineRenderer.widthCurve;
    }

    public void Draw()
    {
        GameObject newLineRenderer = GameObject.Instantiate(ARDraw.staticLinePrefab, Vector3.zero, Quaternion.identity);
        LineRenderer lineRenderer = newLineRenderer.GetComponent<LineRenderer>();
        lineRenderer.positionCount = positions.Length;
        lineRenderer.SetPositions(positions);
        lineRenderer.colorGradient = color;
        lineRenderer.widthCurve = width;
    }
}
