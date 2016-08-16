module Simple2DEngine {

    export class RenderManager {
        
        private mainCanvas : HTMLCanvasElement; 
        private gl : WebGLRenderingContext;

        private _screenWidth : number;
        private _screenHeight : number;

        public get screenWidth() : number {
            return this._screenWidth;
        } 

        public get screenHeight() : number {
            return this._screenHeight;
        } 

        constructor() {
            this.mainCanvas = <HTMLCanvasElement> document.getElementById("mainCanvas");

            if (this.mainCanvas) {
                window.addEventListener("resize", () => this.onWindowResize(), false);
                this.initWebGL();
            }
        }

        private onWindowResize() {
            this._screenWidth = window.innerWidth;
            this._screenHeight = window.innerHeight;

            this.mainCanvas.width = this._screenWidth;
            this.mainCanvas.height = this._screenHeight;
            this.gl.viewport(0, 0, this._screenWidth, this._screenHeight);
        }

        private initWebGL() : void {

            this.gl = <WebGLRenderingContext> this.mainCanvas.getContext("webgl");

            if (!this.gl)
                this.gl = <WebGLRenderingContext> this.mainCanvas.getContext("experimental-webgl");

            this.gl.clearColor(1, 0, 0, 1); //red

            this.onWindowResize();
        }

        
        /**
         * Enters full screen mode. This function can only be called when triggered from a user initiated action (ex: click event handler)
         */
        public enterFullscreen() {
            //Taken from phaser source code!!
            //https://github.com/photonstorm/phaser/blob/master/src/system/Device.js

            var fs = [
                'requestFullscreen',
                'requestFullScreen',
                'webkitRequestFullscreen',
                'webkitRequestFullScreen',
                'msRequestFullscreen',
                'msRequestFullScreen',
                'mozRequestFullScreen',
                'mozRequestFullscreen'
            ];

            var element : any = this.mainCanvas;

            for (var i = 0; i < fs.length; i++)
            {
                if (element[fs[i]])
                {
                    element[fs[i]]();
                    break;
                }
            }
        }

        public exitFullscreen() {
            //Taken from phaser source code!!
            //https://github.com/photonstorm/phaser/blob/master/src/system/Device.js
            
            var cfs = [
                'cancelFullScreen',
                'exitFullscreen',
                'webkitCancelFullScreen',
                'webkitExitFullscreen',
                'msCancelFullScreen',
                'msExitFullscreen',
                'mozCancelFullScreen',
                'mozExitFullscreen'
            ];

            var doc : any = document;

            for (var i = 0; i < cfs.length; i++)
            {
                if (doc[cfs[i]])
                {
                    doc[cfs[i]]();
                    break;
                }
            }
        }

        private tmpMatrix : Matrix3 = Matrix3.create();
        private tmpVector : Vector2 = Vector2.create();

        public draw() : void {

            if (engine.input.pointerDown)
                this.gl.clearColor(1, 0, 0, 1); //red
            else
                this.gl.clearColor(0, 1, 0, 1); //green

            this.gl.clear(this.gl.COLOR_BUFFER_BIT);

            var allEntities = engine.entities.entities;
            var tmpMatrix = this.tmpMatrix;
            var tmpVector = this.tmpVector;

            for (var i = 0; i < allEntities.length; i++) {
                var entity = allEntities[i];

                entity.transform.getLocalToGlobalMatrix(tmpMatrix);

                //Get 0,0 position
                Vector2.set(tmpVector, 0, 0);
                Vector2.transformMat3(tmpVector, tmpVector, tmpMatrix);

                console.log("entity " + i + " is at: " + Vector2.toString(tmpVector));

                //console.log(mat3.toString(this.tmpMatrix));
            }


        }
    }
}