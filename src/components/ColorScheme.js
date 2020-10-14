import React, {Component} from 'react';
import tree from "./knn.js"
import tinycolor from "./tinycolor"

var userColor = [];
var clickedColors = [];

class MyColor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colors : [],
            distance : 1.0
        }
    }

    componentDidMount() {
        this.setState(
            {...this.state,
                colors : generateRandomColors(12)
            }
        )
    }
    
    getColor(clickedColor){
        clickedColors.push(clickedColor)
        this.findKnn(clickedColor).forEach(element => {
            userColor.push(element);
        });
        
        // console.log(clickedColor);
        var newColors = this.generateNeighbourColor(clickedColor);
        this.updateColor(newColors);
    }

    generateNeighbourColor(clickedColor){
        var ColorScheme = require('color-scheme');
        var scm = new ColorScheme();
        var hsl = new tinycolor(clickedColor).toHsl();
        scm.from_hue(hsl.h)
        scm.scheme("triade")
        scm.distance(this.state.distance)
        scm.web_safe(true)
        var newcolors = scm.colors();
        var arr = [];
        for(var i = 0; i < newcolors.length; i++){
            var color = {
                id: i,
                colorcode: "#"+newcolors[i]
            }
            arr.push(color)
        }

        return arr;
    }

    updateColor(arr){
        var dis = this.state.distance > 0.3 ? this.state.distance - this.state.distance*0.1 : 1.0;
        this.setState({
            ...this.state.colors,
            colors: arr,
            distance: dis
        })
        // console.log(this.state.colors);
        // console.log(this.state.distance);
    }

    findKnn(usercolor){
        var color = new tinycolor(usercolor).toRgb();
        var search = {Red : color.r, Green : color.g, Blue : color.b };
        var nearest = tree.nearest(search, 5);
        nearest.sort(function(a,b){return a[1]-b[1]});
        
        return nearest;
    }

    render() {
        // console.log('render called');
        // console.log(this.state.colors);

        return (
            <div className="">
                <ul class="colorlist" >Your Choices!
                    {
                        clickedColors.map((element, id) => (
                            <li key={id} style={{backgroundColor : element}}>{element}</li>
                        ))
                    }
                </ul>
                <div className="container first d-flex justify-content-around">
                {
                    this.state.colors.map ((element, i) => (
                        <div key={i} className="square col-3 align-self-center" onClick={() => this.getColor(element.colorcode) } 
                                style={{backgroundColor : element.colorcode}}>{element.colorcode}
                        </div>
                    ))
                }
                </div>
                {/* <br></br>
                <br></br>
                <br></br> */}
                <hr></hr>
                <p>Colors You might like!</p>
                <div className="container second neighbours d-flex justify-content-around">
                    {
                        userColor.map((element, i) =>(
                            // console.log(element)
                            <div key={i} className="square neighbour col-2" style={{backgroundColor : element[0].Hex}}>
                                {element[0].Name + "\n" + element[0].Hex}</div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
        //get random color and push into arr
        var color = {
            id: i,
            colorcode: randomColor()
        }
		arr.push(color)
	}
	//return that array
	return arr;
}

function randomColor(){
	return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}


export default MyColor;