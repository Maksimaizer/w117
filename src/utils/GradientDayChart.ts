


export function setGradientBar(maxTemp: number, minTemp:number): string {
     let colorMaxTemp = "";
     let colorMinTemp = "";

           if(maxTemp >= 10) colorMaxTemp = "rgba(219, 161, 5, 1)";
           else if(maxTemp < 10 &&  maxTemp > 0) colorMaxTemp = "rgba(255, 215, 105, 1)";
           else if(maxTemp <= 0 &&  maxTemp >= -10)colorMaxTemp = "rgba(222, 237, 252, 1)";
           else if(maxTemp < -10) colorMaxTemp = "rgba(132, 193, 255, 1)";

           if(minTemp >= 10) colorMinTemp = "rgba(255, 204, 0, 1)";
           else if(minTemp < 10 &&  minTemp > 0) colorMinTemp = "rgba(255, 251, 234, 1)";
           else if(minTemp <= 0 &&  minTemp >= -10) colorMinTemp = "rgba(89, 191, 255, 1)";
           else if(minTemp < -10) colorMinTemp = "rgba(4, 135, 222, 1)";


     return `${colorMaxTemp}, ${colorMinTemp}`;
}

