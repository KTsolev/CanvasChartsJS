var Init = function(id,array)
{
	var self = this;
	self.values = array;
	self.xArray = [];	
	self.yArray = [];
	self.xArray[0] = 0;
	self.yArray[0] = 0;
	self.cnv = document.getElementById(id);       
	self.iWidth = self.cnv.width + 30;
    self.iHeight = self.cnv.height + 20;
    self.ctx = self.cnv.getContext('2d');

    self.drawGrid = function () 
    {
            self.gridOptions = 
            {
                minorLines: 
                {
                    separation: 5,
                    color: '#B6FAF7'
                },
                majorLines: 
                {
                    separation: 30,
                    color: '#5996FF'
                },
                text:
                {
                	separation: 30,
                	color: '#FF2491',
                	font: "10pt Verdana"	
                },
                graph:
                {
                	type: 'line',
                	separation: 30,
                    width: 20,
                	color: '#FF2491',
                    value: 0,
                    x: 0,
                    y: 0,
                    allValues : 0,
                    coordinates: []
                }
            };

            self.drawGridLines(self.gridOptions.minorLines);
            self.drawGridLines(self.gridOptions.majorLines);
            self.addLabelsToAxis(self.gridOptions.text);
            
            for (var i = 0; i < self.values.length; i++) 
            {
               self.gridOptions.graph.allValues += self.values[i];
            }

            for (var i = 0; i < self.values.length; i++) 
            {
               self.gridOptions.graph.color = self.changeColor();
               self.gridOptions.graph.value = self.values[i];
               self.gridOptions.graph.x += self.gridOptions.graph.separation + self.gridOptions.graph.width;
               self.gridOptions.graph.y = self.iHeight - 60 - self.gridOptions.graph.value;
               self.drawBarChart(self.gridOptions.graph);
            }
            
            return;
        }

        self.drawGridLines = function (lineOptions) 
        {

            self.ctx.strokeStyle = lineOptions.color;
            self.ctx.strokeWidth = 1;

            self.ctx.beginPath();

            var iCount = null;
            var i = null;
            var x = null;
            var y = null;

            iCount = Math.floor(self.iWidth / lineOptions.separation);
            for (i = 1; i <= iCount; i++) 
            {
                x = (i * lineOptions.separation);
                self.xArray.push(x);
                self.ctx.moveTo(x, 0);
                self.ctx.lineTo(x, self.iWidth);
                self.ctx.stroke();
            }


            iCount = Math.floor(self.iHeight / lineOptions.separation);
            var yCount = 1;
            for (i = 1; i <= iCount; i++) 
            {
                y = (i * lineOptions.separation);  
                self.yArray.push(y);
                self.ctx.moveTo(0, y);
                self.ctx.lineTo(self.iWidth, y);
                self.ctx.stroke();
            }

            self.ctx.closePath();

            return;
        }

        self.addLabelsToAxis = function(lineOptions)
        {
        	self.ctx.strokeStyle = lineOptions.color;
            self.ctx.strokeWidth = 1;
            self.ctx.beginPath();
            self.ctx.font = lineOptions.font;
            for (var i = self.xArray.length - 1; i >= 0; i--) 
       		{
       			if(self.xArray[i] % 30 === 0 || self.xArray[i] === 0)
       			{
     				self.ctx.textAlign = 'right';
       				self.ctx.strokeText(self.xArray[i], self.xArray[i], this.iHeight - 20);
       			}
            }
            self.yArray = self.yArray.reverse();
            for (var i = self.yArray.length - 1; i >= 0; i--) 
       		{
       			if(self.yArray[i] % 30 === 0 || self.yArray[i] === 0)
       			{
       				var length = (self.iHeight-self.yArray[i]);
       				self.ctx.textAlign = 'left';
       				self.ctx.strokeText(length, 0, self.yArray[i]);
            	}
            }
            
            self.ctx.closePath();

            return;
        }

        self.getRandomInt = function(min, max) 
        {
            return Math.floor(Math.random() * Math.abs(max - min));
        }

        self.changeColor = function()
        {
            var colorString = "0123456789ABCDEF";
            var color = "#";    

            for (var i = 1; i <= 6; i++) 
            {
                 color += colorString[self.getRandomInt(0,colorString.length)];      
            }
            return color;
        }    

        self.drawBarChart = function(lineOptions)
        {
            self.ctx.strokeStyle = "#FFFFFF";
            self.ctx.fillStyle = lineOptions.color;
            self.ctx.strokeWidth = 2;
            self.ctx.beginPath();
        	var x = lineOptions.x;
        	var y = lineOptions.y;
            var counter = lineOptions.allValues;
            var height = lineOptions.value;
            var width = lineOptions.width;
            lineOptions.coordinates.push({'X' : x, 'Y' : y, 'H': height, 'W': width, "Color":lineOptions.color});
            self.ctx.fillRect(x, y, width, height); 
            self.ctx.closePath();  
            return;
        }

        self.cnv.onmousemove = function (event)
        {
            var rects = self.gridOptions.graph.coordinates;
             for (var i = 0, len = rects.length; i < len; i++) 
             {
                var x = event.offsetX; 
                var y = event.offsetY;  
                var left = rects[i].X; 
                var right = rects[i].X+rects[i].W;
                var top = rects[i].Y;
                var bottom = rects[i].Y+rects[i].H;
                if (right >= x && left <= x && bottom >= y && top <= y) 
                {
                    var my_gradient = self.ctx.createLinearGradient(0, 0, 170, 170);
                    my_gradient.addColorStop(0,rects[i].Color);
                    my_gradient.addColorStop(1,"#FFFFFF");
                    self.ctx.fillStyle = my_gradient;rects[i].Color;
                    self.ctx.fillRect(rects[i].X, rects[i].Y, rects[i].W, rects[i].H);
                    console.log("I'm in :)");
                }
                else
                {
                    console.log("I'm out :(")
                }
            }

            }
 }
