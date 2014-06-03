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
                	separation: 20,
                	color: '#FF2491'
                }
            };

            self.drawGridLines(self.gridOptions.minorLines);
            self.drawGridLines(self.gridOptions.majorLines);
            self.addLabelsToAxis(self.gridOptions.text);
            self.drawLine(self.gridOptions.graph);

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
            console.log("first array:");
            for (var i = self.xArray.length - 1; i >= 0; i--) 
       		{
       			if(self.xArray[i] % 30 === 0 || self.xArray[i] === 0)
       			{
       				console.log(self.xArray[i]);
       				self.ctx.textAlign = 'right';
       				self.ctx.strokeText(self.xArray[i], self.xArray[i], this.iHeight - 20);
       			}
            }
            self.yArray = self.yArray.reverse();
            console.log("second array:");
            for (var i = self.yArray.length - 1; i >= 0; i--) 
       		{
       			if(self.yArray[i] % 30 === 0 || self.yArray[i] === 0)
       			{
       				var length = (self.iHeight-self.yArray[i]);
       				console.log(length);
       				console.log(self.yArray[i]);
       				self.ctx.textAlign = 'left';
       				self.ctx.strokeText(length, 0, self.yArray[i]);
            	}
            }
            
            self.ctx.closePath();

            return;
        }

        self.drawLine = function(lineOptions)
        {
        	
            self.ctx.strokeStyle = lineOptions.color;
            self.ctx.strokeWidth = 1;
            self.ctx.beginPath();
        	var x = 1;
        	var y = 1;
        	for (var i = self.values.length - 1; i >= 0; i--)
        	{
        		x += lineOptions.separation;
        		y = self.iHeight - 50;
        		var val = self.values[i]/self.iHeight;
        		self.ctx.moveTo(x,y);
        		self.ctx.fillRect(x, val, 10, self.values[i]*100);
	        }

	        self.ctx.closePath();
            return;
        }
 }
