import colors from "./colors.json";

var kdTree = require("./kdTree").kdTree;

var tree;

function colorDistance(a, b) {
    var dr = a.red - b.red;
    var dg = a.green - b.green;
    var db = a.blue - b.blue;
    var redMean = (a.red + b.red)/2;
    return (2+redMean/256)*dr*dr + 4*dg*dg + (2 + (255 - redMean)/256)*db*db;
}

tree = new kdTree(colors, colorDistance, ["Red", "Green", "Blue"]);

export default tree;