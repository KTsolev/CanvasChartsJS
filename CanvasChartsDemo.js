var Init = function(id,array)
{
	var self = this;
	self.values = array;
	self.xArray = [];	
	self.yArray = [];
	self.cnv = document.getElementById(id);       
    self.cnv.width += array.length * 50;
    var maxELement = array[0];
    for (var i = 0; i < array.length; i++) 
    {
       if(array[i] > maxELement)
       {
            maxELement = array[i];
       }
       else
       {
         continue;   
       }
    }
    self.cnv.height = maxELement + 30; 
	self.iWidth = self.cnv.width;
    self.iHeight = self.cnv.height + array.length / 2 * 10;
    self.ctx = self.cnv.getContext('2d');
    self.ctx.font = "100 15px Verdana";
    self.drawGrid = function () 
    {
            self.gridOptions = 
            {
                minorLines: 
                {
                    separation: 5,
                    color: '#DEDEDE'
                },
                majorLines: 
                {
                    separation: 35,
                    color: '#BABABA'
                },
                text:
                {
                	separation: 30,
                	color: '#BABABA',
                	font: "10pt Verdana"	
                },
                graph:
                {
                	type: 'bar',
                	separation: 20,
                    width: 35,
                	color: '#0E0054',
                    xAxisTitle: "Sells in MK [lvl]",
                    yAxisTitle: "",
                    title: "",
                    value: 0,
                    x: 0,
                    y: 0,
                    allValues : 0,
                    coordinates: [],
                    data: [],
                    xAxis: ['banicki','bozi','ekleri','vodka','akaciq','dunki','jenski','mujki','skakauec','lenovo','poro','poropotato'],
                    yAxis: []
                }
            };

            self.drawGridLines(self.gridOptions.minorLines);
            self.drawGridLines(self.gridOptions.majorLines);
                      
            for (var i = 0; i < self.values.length; i++) 
            {
               self.gridOptions.graph.allValues += self.values[i];
            }

            for (var i = 0; i < self.values.length; i++) 
            {
               self.gridOptions.graph.color = self.changeColor();
               self.gridOptions.graph.value = Math.floor((self.values[i]/self.gridOptions.graph.allValues) * 1000);
               self.gridOptions.graph.x += self.gridOptions.graph.separation + self.gridOptions.graph.width + 25;
               self.gridOptions.graph.y = self.iHeight - self.gridOptions.graph.value - 50;
               self.drawBarChart(self.gridOptions.graph);        
           }
           
           self.addLabelsToAxis(self.gridOptions.graph);

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
        	self.ctx.fillStyle = lineOptions.color;
            self.ctx.strokeWidth = 1;
            self.ctx.beginPath();
            self.ctx.font = lineOptions.font;
            self.ctx.textAlign = 'right';
            lineOptions.title="Bar Charts";
            self.ctx.fillText(lineOptions.title, self.iWidth / 2, 20);  
            self.ctx.save();
            self.ctx.translate(100,300);
            self.ctx.rotate(-0.5*Math.PI);
            self.ctx.fillText(lineOptions.xAxisTitle, self.iHeight/2 - array.length*10, - 85);
            self.ctx.restore();    
            var distance = 50;
            var cnv1 = document.createElement('canvas');
            cnv1.width = self.cnv.width;
            cnv1.height = 250;
            var ctx1 = cnv1.getContext('2d');
            ctx1.font  = self.gridOptions.text.font;
            ctx1.color = self.gridOptions.text.color;
            var ctx1 = cnv1.getContext('2d'); 
            //----------X_Axis--------------//
            for (var i = 0 ; i < lineOptions.xAxis.length; i++) 
            {
                if(i == lineOptions.coordinates.length) break;
                
                ctx1.beginPath();
                ctx1.textAlign = 'right';
                distance += lineOptions.separation + lineOptions.xAxis[i].length + 50;
       //         ctx1.rotate(-0.5*Math.PI);   
                console.log(lineOptions);
                ctx1.fillText(lineOptions.xAxis[i], lineOptions.coordinates[i].X + lineOptions.width , 20);
                console.log(i);
                ctx1.closePath();
            }
            var container = document.getElementsByTagName('body')[0];
            container.appendChild(cnv1);
            //-------Y_Axis----------//
            for (var i = 0; i <= self.cnv.height; i++) 
       		{
       			if(i % 30 == 0 )
       			{
       				var length = i;
       				self.ctx.textAlign = 'left';
       				self.ctx.fillText(length, 35, self.cnv.height - i);
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
            self.ctx.save();
            self.ctx.fillStyle = '#0E0054';
            self.ctx.fillText(height, x , y - 10);
            self.ctx.restore();
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
                    var my_gradient = self.ctx.createLinearGradient(0, 0, top-top/2, bottom+bottom/2);
                    my_gradient.addColorStop(0,rects[i].Color);
                    my_gradient.addColorStop(1,"#FFFFFF");
                    self.ctx.fillStyle = my_gradient;rects[i].Color;
                    self.ctx.fillRect(rects[i].X, rects[i].Y, rects[i].W, rects[i].H);
                }
                else
                {
                    self.ctx.fillStyle = rects[i].Color;
                    self.ctx.fillRect(rects[i].X, rects[i].Y, rects[i].W, rects[i].H);
                }
            }
        }
 }
